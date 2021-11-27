const fs = require('fs');
const SmartBet = artifacts.require("SmartBet");



module.exports = function (deployer) {
  deployer.deploy(SmartBet)
    .then( ()=> console.log(SmartBet.address)  );
};




