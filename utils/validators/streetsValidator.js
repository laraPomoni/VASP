const root = require('app-root-path');
const { body } = require('express-validator');
const {MSG_MANDATORY_PARAM} = require(root+'/utils/validators/errors');

const validatorsSchema = [
	body('name').exists({ checkFalsy: true }).withMessage(MSG_MANDATORY_PARAM).trim(),
	body('class').exists({ checkFalsy: true }).withMessage(MSG_MANDATORY_PARAM).trim(),
	body('departure.*').exists({ checkFalsy: true }).withMessage(MSG_MANDATORY_PARAM).trim(),
	body('arrival.*').exists({ checkFalsy: true }).withMessage(MSG_MANDATORY_PARAM).trim(),
	body('year').exists({ checkFalsy: true }).withMessage(MSG_MANDATORY_PARAM).trim(),
	body('lengthMeters').exists({ checkFalsy: true }).withMessage(MSG_MANDATORY_PARAM).trim(),
	body('description').exists({ checkFalsy: true }).withMessage(MSG_MANDATORY_PARAM).trim(),
	body('status').exists({ checkFalsy: true }).withMessage(MSG_MANDATORY_PARAM).trim(),
	body('dateOpening').exists({ checkFalsy: true }).withMessage(MSG_MANDATORY_PARAM).trim(),
	body('dateClosure').exists({ checkFalsy: true }).withMessage(MSG_MANDATORY_PARAM).trim(),
];

module.exports = {
	validatorsSchema
};