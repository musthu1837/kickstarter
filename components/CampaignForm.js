import React,{Component} from 'react';
import {Form,Input,Button,Message} from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import {Router} from '../routes'
class CampaignForm extends Component{
  state={
    loading:false,
    errorMessage:'',
    contribution:'',
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
  render(){
    return(
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage} >
        <Form.Field>
          <label>Amount to contribute</label>
          <Input value={this.state.contribution}
            onChange={event=>this.setState({contribution:event.target.value})}
            label='Ether'
            labelPosition='right'
            placeholder='Enter. . .'
          />
        </Form.Field>
      <Button loading={this.state.loading} type='submit' content='Contribute' primary />
      <Message error header="Oops!" content={this.state.errorMessage}/>
      </Form>
    );
  }
}
export default CampaignForm;
