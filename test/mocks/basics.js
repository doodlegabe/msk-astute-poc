const basicResponse = {
  unknown:{
    message: 'Unknown route.'
  }
};

exports.unknownRoute = function(){
  return basicResponse.unknown;
};