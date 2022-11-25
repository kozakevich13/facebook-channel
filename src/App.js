import './App.css';
import { useState } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { Button } from 'react-bootstrap';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [isLoggedin, setIsLoggedin] = useState(false)
  const [data, setData] = useState()

  function responseFacebook(response) {
    setIsLoggedin(true)
    setData(response)
  }

  return (
    isLoggedin ? <Home data={data}/> : (
      <div className="App mx-auto mt-5 w-50 p-3 border rounded">
        <h2>Facebook messenger</h2> 
        <p>Conect</p>
        <hr/>
        <h4>Add account</h4>
        <FacebookLogin
          appId="843134683665169"
          autoLoad={true}
          fields="name,email,picture"
          scope="public_profile, pages_show_list"
          callback={responseFacebook}
          render={renderProps => (
            <Button className='m-2' variant="outline-warning" onClick={renderProps.onClick}>This is my custom FB button</Button>
          )}
        />
      </div>
    )
   
  );
}

export default App;
