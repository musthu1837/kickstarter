import React,{ Component } from 'react';
import factory from '../ethereum/factory';
import {Card,Button} from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Layout from '../components/Layout';
import {Link} from '../routes'
class CampaignIndex extends Component{
  static async getInitialProps(){
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return {campaigns};
  }
renderCampaigns(){
  const items = this.props.campaigns.map(address =>{
    return {
      header:address,
      description:
      <Link route={`/campaigns/${address}`}>
        <a>View campaign</a>
      </Link>,
      fluid:true
    }
  });
  return <Card.Group items = {items }/>
}
  render(){
    return (
    <Layout>
      <div>
        <h1>Open campaigns</h1>
        <Link route='/campaigns/new'><Button floated='right' content='Create campaign' icon='circle add' labelPosition='left' primary /></Link>
        {this.renderCampaigns()}
      </div>
    </Layout>
  );
  }
}
export default CampaignIndex;
