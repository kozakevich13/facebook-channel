import { useEffect, useState } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { Button } from 'react-bootstrap';
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {

    const [data, setData] = useState(JSON.parse(sessionStorage.getItem('data')))
    const [isLoggedin, setIsLoggedin] = useState(false)

    useEffect(()=>{
        if(data != null) {
            setIsLoggedin(true)
        }
    },[data])
  

    function responseFacebook(response) {
        setIsLoggedin(true)
        setData(response)
        sessionStorage.setItem('data', JSON.stringify(response));
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
                <Button className='m-2' variant="outline-warning" onClick={renderProps.onClick}>Connect to your Facebook account</Button>
            )}
            />
        </div>
        )
    
    );
}

export default Login;
