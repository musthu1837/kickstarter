import React,{Component} from 'react';
import {Form,Input,Button,Message,Grid} from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import {Router,Link} from '../../../routes'
import Layout from '../../../components/Layout'
class NewRequest extends Component{
  state={
    loading:false,
    errorMessage:'',
    description:'',
    value:'',
    recipient:'',
  }
  static getInitialProps(props){
    console.log(props.query.address)
    return {address:props.query.address};
  }
  onSubmit= async (event)=>{
    event.preventDefault();
      const campaign = Campaign(this.props.address);
      console.log(this.props.address);
    this.setState({loading:true});
         await web3.eth.getAccounts(async (err, accounts) => {
             if(err) throw err;
             try{
               await campaign.methods.createRequest(this.state.description,web3.utils.toWei(this.state.value,'ether'),this.state.recipient).send({
                 from:accounts[0]
              });
                this.setState({loading:false});
                Router.replaceRoute(`/campaigns/${this.props.address}/requests`);

            }
            catch(err){
              this.setState({errorMessage:err.message+' OR No address Specified in the metamask'});
                    this.setState({loading:false});
            }
        });
  }
  render(){
    return(
      <Layout>
            <h3>Create a Request</h3>
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
              <Form.Field>
                <label>Description</label>
                <Input value={this.state.description}
                  onChange={event=>this.setState({description:event.target.value})}
                  placeholder='Enter. . .'
                  icon='pencil'
                  iconPosition='right'
                />
              </Form.Field>
              <Form.Field>
                <label>Amount of ether</label>
                <Input value={this.state.value}
                  onChange={event=>this.setState({value:event.target.value})}
                  placeholder='Enter. . .'
                  label='Wei'
                  labelPosition='right'
                />
              </Form.Field>
              <Form.Field>
                <label>Recipient</label>
                <Input value={this.state.recipient}
                  onChange={event=>this.setState({recipient:event.target.value})}
                  placeholder='Enter. . .'
                  icon='user'
                  iconPosition='right'
                />
              </Form.Field>
            <Button loading={this.state.loading} type='submit' content='Create' primary />
            <Message error header="Oops!" content={this.state.errorMessage}/>
            </Form>

      </Layout>
    );
  }
}
export default NewRequest;
