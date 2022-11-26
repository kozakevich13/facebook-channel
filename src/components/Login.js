import { useEffect, useState } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { Button } from 'react-bootstrap';
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from "react-i18next";


function Login() {
    const { t } = useTranslation();
    const [data, setData] = useState(JSON.parse(sessionStorage.getItem('data')) || null)
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
        isLoggedin ? <Home data={data} /> : (
        <div className="App mx-auto mt-5 w-50 p-3 border rounded">
            <h2>{t("facebook")}</h2> 
            <p>{t("conect")}</p>
            <hr/>
            <h4>{t("add_account")}</h4>
            <FacebookLogin
            appId="843134683665169"
            autoLoad={false}
            fields="name,email,picture"
            scope="public_profile, pages_show_list"
            callback={responseFacebook}
            render={renderProps => (
                <Button className='m-2' variant="outline-warning" onClick={renderProps.onClick}>{t("connect_fb_account")}</Button>
            )}
            />
        </div>
        )
    
    );
}

export default Login;
