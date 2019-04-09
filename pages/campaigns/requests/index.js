import React,{Component} from 'react';
import {Form,Input,Button,Message,Table} from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import Layout from '../../../components/Layout'
import {Router,Link} from '../../../routes'
import RequestRow from '../../../components/RequestRow'
class CampaignForm extends Component{
  state={
    loading:false,
    errorMessage:'',
    contribution:'',
  }
  static async getInitialProps(props){
    const campaign = Campaign(props.query.address);
    const requestCount = await campaign.methods.getRequestsCount().call();
    const approversCount = await campaign.methods.approversCount().call();
    if(requestCount!='0'){
      console.log("hai");
      const requests = await Promise.all(
        Array(requestCount)
        .fill().map(async (element,index) => {
          return await campaign.methods.requests(index).call()
        })
      );
      console.log(requests);
      return {address:props.query.address,requests,approversCount,requestCount}
    }
    else{
      console.log("bye");
      return {requestCount,address:props.query.address}
    }
    }
  onSubmit= async (event)=>{
    event.preventDefault();
      const campaign = Campaign(this.props.address);
      console.log(this.props.address);
    this.setState({loading:true});
         await web3.eth.getAccounts(async (err, accounts) => {
             if(err) throw err;
             try{
               await campaign.methods.contribute().send({
                 from:accounts[0],
                 value:web3.utils.toWei(this.state.contribution,'ether')
              });
                this.setState({loading:false});
                Router.replaceRoute(`/campaigns/${this.props.address}`);

            }
            catch(err){
              this.setState({errorMessage:err.message+' OR No address Specified in the metamask'});
                    this.setState({loading:false});
            }
        });
  }
  renderRow(){
    return this.props.requests.map((request,index)=>{
      return <RequestRow
        key ={index}
        id ={index}
        request ={request}
        approversCount ={this.props.approversCount}
        address ={this.props.address}
      />;
    });
  }
  render(){
      const { Header,Row,HeaderCell,Body} =Table;
    return(
      <Layout>
      <h3 >Requests</h3>
      <Link route={`/campaigns/${this.props.address}/requests/new`}><Button floated="right" content='Create Request'  primary /></Link>
      <br/><br/>
      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval Count</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
        </Header>
        <Body>
          { this.props.requestCount != '0' ? this.renderRow() :<Row></Row>
          }
        </Body>
      </Table>
      <p>total {this.props.requestCount} requests found.</p>
      </Layout>
    );
  }
}
export default CampaignForm;
