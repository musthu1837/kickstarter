const routes = require('next-routes')();
routes
  .add('/campaigns/new','/campaigns/new')
  .add('/campaigns/:address','/campaigns/show')
  .add('/campaigns/:address/requests/new','/campaigns/requests/new')
  .add('/campaigns/:address/requests','/campaigns/requests');

module.exports = routes;
/*<!--<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css"></link>
  <div className='ui three column center aligned stackable grid'>
    <div className='column'>
    <form className='ui form'>
      <div className='ui header'>New Request</div>
      <input type='text' name='msg' placeholder='New Request' /><br/><br/>
      <input type='file' name='file' /><br/><br/>
      <button className='ui blue icon button'>Create Request</button>
    </form>
    </div>
  </div>-->*/
