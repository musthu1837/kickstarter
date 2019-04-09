import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
'0x97422627EA5b67a2ee0FB7f18D5B18892a76B1af'
);
export default instance;

//'0x6F286Bfe55E62180840719f47Ff55378109c46e5'
