require('dotenv').config('/../../.env');

function getAPIPath(){
  if(process.env.NODE_ENV === "production"){
    return "https://us.moleskine.com/en/"
  } else{
    return "http://localhost:8000"
  }
}

module.exports = {
  getAPIPath:getAPIPath()
};