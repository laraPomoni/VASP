const config = require('config');
const couchbase = require('couchbase');
const BUCKET_NAME = config.get('couchbase_vasp.bucket_name');

var bucket = _openBucket();

function reconnect(){
	console.log('[Couchbase VASP] reconnect');
	try { bucket.disconnect(); } // disconnetto il vecchio bucket
	catch(err) { console.error(err); }
	finally { bucket = _openBucket(true); } // in ogni caso lo riapro
}

function get(...args){
	return new Promise((resolve, reject) => {
		bucket.get(...args, (err, res) => {
			if(err) reject(err);
			else resolve(res);
		});
	});
};
function getAndLock(...args){
	return new Promise((resolve, reject) => {
		bucket.getAndLock(...args, (err, res) => {
			if(err) reject(err);
			else resolve(res);
		});
	});
};
function getMulti(...args){
	return new Promise((resolve, reject) => {
		bucket.getMulti(...args, (err, res) => {
			if(err) reject(err);
			else resolve(res);
		});
	});
};
function insert(...args){
	return new Promise((resolve, reject) => {
		bucket.insert(...args, (err, res) => {
			if(err) reject(err);
			else resolve(res);
		});
	});
};
function upsert(...args){
	return new Promise((resolve, reject) => {
		bucket.upsert(...args, (err, res) => {
			if(err) reject(err);
			else resolve(res);
		});
	});
};
function remove(...args){
	return new Promise((resolve, reject) => {
		bucket.remove(...args, (err, res) => {
			if(err) reject(err);
			else resolve(res);
		});
	});
};
function query(...args){
	return new Promise((resolve, reject) => {
		// args[0] = args[0].consistency(couchbase.N1qlQuery.Consistency.REQUEST_PLUS);
		bucket.query(...args, (err, res) => {
			if(err) reject(err);
			else resolve(res);
		});
	});
};
function execute(chain){
	return new Promise((resolve, reject) => {
		chain.execute((err, frag) => {
			if(!err || err.code == couchbase.errors.checkResults) return resolve(frag);
			else return reject(err);
		});
	});
};
function touch(...args){
	return new Promise((resolve, reject) => {
		bucket.touch(...args, (err, res) => {
			if(err) reject(err);
			else resolve(res);
		});
	});
};
function counter(...args){
	return new Promise((resolve, reject) => {
		bucket.counter(...args, (err, res) => {
			if(err) reject(err);
			else resolve(res);
		});
	});
};

module.exports = {
	bucket,
	BUCKET_NAME,
	reconnect,
	errors: couchbase.errors,
	get,
	getAndLock,
	getMulti,
	insert,
	upsert,
	remove,
	query,
	execute,
	touch,
	counter,
};

function _openBucket(fromReconnect) {
	const cluster = new couchbase.Cluster("http://127.0.0.1:8091");
	cluster.authenticate(
		config.get('couchbase_vasp.username'),
		config.get('couchbase_vasp.password')
	)
	return cluster.openBucket(BUCKET_NAME, function(err){
		if(err) {
			console.error('[Couchbase VASP] error open bucket:');
			console.error(err);
		} else {
			bucket.operationTimeout = 20000;
			if(!fromReconnect) {
				process.emit('couchbase_vasp_connected'); // Segnalo al process che la connessione al bucket è avvenuta, solo se è il primo collegamento
			}//_checkIndexes();
		}
	});
}

async function _checkIndexes() {
	let indexesToBuild = [];

	try {

		console.log('[CouchbaseHistory] check indexes...')
		const actualIndexes = await query(couchbase.N1qlQuery.fromString('SELECT RAW i FROM system:indexes AS i')) // recupero gli indici su couchbase

		if(!Array.isArray(actualIndexes)) {
			console.error('[CouchbaseHistory] Cannot retrieve indexes from couchbase.');
			return;
		}

		const neededIndexes = require('@assets/couchbase-history-indexes.js'); // recupero gli indici necessari censiti

		for(const indexName in neededIndexes) {
			let actualIndex = actualIndexes.find(el => el.name == indexName);
			if(actualIndex) { // indice presente su couchbase
				console.log(`[CouchbaseHistory] index ${indexName} found with state "${actualIndex.state}".`)
				if(actualIndex.state === 'deferred') indexesToBuild.push(indexName) // indice presente ma non buildato
			} else { // indice mancante su couchbase
				console.log(`[CouchbaseHistory] index ${indexName} MISSING.`)
				let indexQuery = neededIndexes[indexName].replace('{bucketName}', BUCKET_NAME);
				await query(couchbase.N1qlQuery.fromString(indexQuery))
				console.log(`[CouchbaseHistory] index ${indexName} created.`)
				indexesToBuild.push(indexName)
			}
		}

		if(indexesToBuild.length > 0) {
			console.log(`[CouchbaseHistory] build indexes: ${indexesToBuild}.`)
			await query(couchbase.N1qlQuery.fromString("BUILD INDEX ON `"+BUCKET_NAME+"` ("+indexesToBuild.join(',')+")"));
		}

		console.log(`[CouchbaseHistory] check indexes done.`)

	}catch(err) {
		console.error('[CouchbaseHistory] error in _checkIndexes.')
		console.error(err)
	}
}