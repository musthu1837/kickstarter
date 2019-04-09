import web3 from './web3';
import Campaign from './build/Campaign.json';
export default address => { return new web3.eth.Contract(JSON.parse(Campaign.interface),address);}
//'0x6F286Bfe55E62180840719f47Ff55378109c46e5'
