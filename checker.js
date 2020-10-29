exports.stringValidator = function(value) {

    if(typeof value === 'string')
      return value;
  };

exports.numberValidator = function(value) {

  if(typeof value === 'number')
    return value;

};