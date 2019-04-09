import React,{Component} from 'react';
import Layout from '../../components/Layout';
import CampaignForm from '../../components/CampaignForm';
import Campaign from '../../ethereum/campaign'
import {Card,Grid,Button} from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import {Link} from '../../routes';
class CampaignShow extends Component{
  static async getInitialProps(props){
  const campaign = Campaign(props.query.address);

  const summary = await campaign.methods.getSummarry().call();
  return {
    minumumContribution:summary[0],
    balance:summary[1],
    requestsCount:summary[2],
    approversCount:summary[2],
    manager:summary[4],
    address:props.query.address
  };
  }
  renderCards(){
    const {
      balance,
      manager,
      minimumContribution,
      requestsCount,
      approversCount
    } = this.props;
    const items = [
      {
        header: manager,
        meta: 'Address of Manager',
        description:
        ' The manager created this campaign and can create request to withdraw money.',
        style: {overflowWrap: 'break-word'}
      },
      {
        header: minimumContribution,
        meta: 'Minimum Contribution (Wei)',
        description:
        ' You must contribute at least this wei to become an approver.',
        style: {overflowWrap: 'break-word'}
      },
      {
        header: requestsCount,
        meta: 'Number of Requests',
        description:
        ' A request tries to withdraw money from the contract.',
        style: {overflowWrap: 'break-word'}
      },
      {
        header: approversCount,
        meta: 'Number of Approvers',
        description:
        'Number of people who have already donated.',
        style: {overflowWrap: 'break-word'}
      },
      {
        header: web3.utils.fromWei(balance,'ether'),
        meta: 'Campaign balance (ether)',
        description:
        'The balance is how much money this campaign has left to spend.',
        style: {overflowWrap: 'break-word'}
      }
    ];
      return <Card.Group items={items}/>;
  }
  render(){
    return(
      <Layout>
      <h3>  CampaignShow</h3>
      <Grid>
        <Grid.Column width={11}>
          {this.renderCards()}
        </Grid.Column>
        <Grid.Column width={3}>
          <CampaignForm address={this.props.address}/>
        </Grid.Column>
      </Grid><br/>
      <Link route={`/campaigns/${this.props.address}/requests`}><Button content='View Requests'  primary /></Link>
      </Layout>
    );
  }
}
export default CampaignShow;
