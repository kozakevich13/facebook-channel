import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';


function Home(data) {

    const [picture, setPicture] = useState('https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png')
    const [userId, setUserId] = useState(0)
    const [access_token, setAccses_token] = useState('')
    const [pages, setPages] = useState('')
   
    useEffect(() => {
      setPicture(data.data.picture.data.url)  
      setUserId(data.data.id)
      setAccses_token(data.data.accessToken)
    },[]);

    
    async function fetchData() {
        const url = `https://graph.facebook.com/${userId}/accounts?access_token=${access_token}`;

        fetch(url, {
            method: "GET",
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
            })
            .then(resp => resp.json())
            .then(function(data) {
                setPages(data)
            })
            .catch(function(error) {
            });
    }
 
    useEffect(() => {
        fetchData()
    }, [access_token]);

       
   

 
  return (
    <>
        <h2 className="ms-3">Facebook messenger</h2> 
        <p className="ms-3">Conect</p>
        <hr/>
        <p className="fw-bold ms-3">Edit</p>
        <div className="d-flex">
            <div className="w-75 p-3 ">
                <div className="border-bottom bg-light bg-gradient p-3">
                    CONNECTED FACEBOOK PAGE
                </div>
                <ul className="list-group">{pages.data?.map((d) => <button type="button" className="list-group-item list-group-item-action" key={d.id}>{d.name}</button>)}</ul>
                
            </div>
            <div className="col-md-4 m-2 h-5 border rounded">
                {picture ? <img className="img-thumbnail d-block me-auto ms-auto mt-5" alt="logo" src={picture} /> : null}
                <p className="text-center">{data.data.name}</p>
                <p className="text-center text-secondary">Connected account</p>
                <Button className='m-2 d-block me-auto ms-auto' variant="outline-warning">Disconnect</Button>
            </div>
        
        </div>
        
    </>
  );
}

export default Home;
