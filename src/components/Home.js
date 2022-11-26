import { useState, useEffect, useCallback } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import Modal from 'react-modal';



function Home(data, load) {

    const [picture, setPicture] = useState('https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png')
    const [userId, setUserId] = useState(0)
    const [access_token, setAccses_token] = useState('')
    const [pages, setPages] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const openModal = useCallback(() => setIsOpen(true), []);
    const closeModal = useCallback(() => setIsOpen(false), []);
   
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

    function responseFacebook(response) {
        console.log(response)
        sessionStorage.setItem('data', JSON.stringify(response));

    }

    const disconnect = () => {
        sessionStorage.setItem('data', JSON.stringify(''));
        window.location.reload()
    }

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
                <ul className="list-group">{pages.data?.map((d) => <li onClick={openModal}  className="list-group-item list-group-item-action d-flex " key={d.id}>{d.name}
                {/* <Modal isOpen={isOpen} onRequestClose={closeModal}>
                    <p>This is the modal content</p>
                    <p>{d.name}</p>
                    <input type="button" value="Close modal" onClick={closeModal} />
                </Modal> */}
                <div className="form-check form-switch position-absolute top-0 end-0 mt-2">
                <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" />
                </div>
                </li>)}</ul>

                <FacebookLogin
                appId="843134683665169"
                autoLoad={true}
                fields="name,email,picture"
                scope="public_profile, pages_show_list"
                callback={responseFacebook}
                render={renderProps => (
                    <Button className='m-2 btn btn-warning'  onClick={renderProps.onClick}> + Add Facebook pages</Button>
                )}
                />
                 <input className="btn btn-warning" type="button" value="Permission" onClick={openModal} />
                 <Modal isOpen={isOpen} onRequestClose={closeModal}>
                    <p>This is the modal content</p>
                    <input className="btn btn-warning" type="button" value="Back" onClick={closeModal} />
                </Modal>
            </div>
            <div className="col-md-4 m-2 h-5 border rounded">
                {picture ? <img className="img-thumbnail d-block me-auto ms-auto mt-5" alt="logo" src={picture} /> : null}
                <p className="text-center">{data.data.name}</p>
                <p className="text-center text-secondary">Connected account</p>
                <Button className='m-2 d-block me-auto ms-auto' variant="outline-warning" onClick={disconnect}>Disconnect</Button>
            </div>
        
        </div>
        
    </>
  );
}

export default Home;
