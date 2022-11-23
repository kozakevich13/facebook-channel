import './App.css';
import { useState } from 'react';
// import FacebookLogin from 'react-facebook-login';
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
  console.log(data)
  return (
    isLoggedin ? <Home res={data}/> : (
      <div className="App mx-auto mt-5 w-50 p-3 border rounded">
        <h2>Facebook messenger</h2> 
        <p>Conect</p>
        <hr/>
        <h4>Add account</h4>
        <FacebookLogin
          appId="651276283406761"
          autoLoad
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
