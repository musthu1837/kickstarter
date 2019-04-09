const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');

const  buildPath= path.resolve(__dirname,'build');
console.log(buildPath);
fs.removeSync(buildPath);
const campaignPath = path.resolve(__dirname,'contracts','Campaign.sol');
console.log(campaignPath);
const source = fs.readFileSync(campaignPath,'utf8');
const output = solc.compile(source,1).contracts;

fs.ensureDirSync(buildPath);
for(let contract in output){
 fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(':','') + '.json' ),
    output[contract]
  );
}
