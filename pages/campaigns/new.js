import React,{Component} from 'react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import {Form,Button,Input,Message} from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import {Router,Link} from '../../routes';
class CreateCampaign extends Component{
  state={
    minimumContribution:'',
    errorMessage:'',
    loading:false
  }
  onSubmit=async (event)=>{
    event.preventDefault();
    this.setState({loading:true});
        this.setState({loading:true});
         await web3.eth.getAccounts(async (err, accounts) => {
             if(err) throw err;
             try{
               await factory.methods.createCampaign(this.state.minimumContribution).send({
                 from:accounts[0]
              });
              Router.pushRoute('/');
            }
            catch(err){
              this.setState({errorMessage:err.message+' OR No address Specified in the metamask'});
                    this.setState({loading:false});
            }
        });
  }

  render(){
    return (
      <Layout>
        <h1>Create a New Campaign</h1>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage} >
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input value={this.state.minimumContribution}
              onChange={event=>this.setState({minimumContribution:event.target.value})}
              label='Wei'
              labelPosition='right'
              placeholder='Enter. . .'
            />
          </Form.Field>
        <Message error header="Oops!" content={this.state.errorMessage}/>
        <Button loading={this.state.loading} type='submit' content='Create' primary />
        </Form>
      </Layout>
    );
  }
};
export default CreateCampaign;
