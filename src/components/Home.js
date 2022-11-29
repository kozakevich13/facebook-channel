import { useState, useEffect, useCallback } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import Modal from 'react-modal';
import ListPermission from "./ListPermission";
import Form from "./Form";
import { useTranslation } from "react-i18next";



function Home(data, load) {
    const { t } = useTranslation();
    const arrayPermission = [
        { name: "public_profile"},
        { name: "pages_show_list"},
      ];

    const [picture, setPicture] = useState('https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png')
    const [userId, setUserId] = useState(0)
    const [access_token, setAccses_token] = useState('')
    const [pages, setPages] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const openModal = useCallback(() => setIsOpen(true), []);
    const closeModal = useCallback(() => setIsOpen(false), []);
    const [permission, setPermission] = useState(arrayPermission);
    const [inputValue, setInputValue] = useState("");
   
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
        sessionStorage.setItem('data', JSON.stringify(response));
    }

    const disconnect = () => {
        sessionStorage.setItem('data', JSON.stringify(''));
        window.location.reload()
    }
   
    useEffect(() => {
      let count = 0;
      permission.map(permission => (!permission.done ? count++ : null));
      document.title = `${count} Permission${count > 1 ? "s" : ""}`;
    });
  
    const _handleSubmit = e => {
      e.preventDefault();
      if (inputValue === "") return alert("Permission name is required");
  
      const newArr = permission.slice();
      newArr.splice(0, 0, { name: inputValue, done: false });
      setPermission(newArr);
      setInputValue("");
    };
  
    const _handleBntClick = ({ type, index }) => {
      const newArr = permission.slice();
      if (type === "remove") newArr.splice(index, 1);
      else if (type === "completed") newArr[index].done = true;
  
      return setPermission(newArr);
    };
  return (
    <>
        <h2 className="ms-3">{t("facebook")}</h2> 
        <p className="ms-3">{t("conect")}</p>
        <hr/>
        <p className="fw-bold ms-3">{t("edit")}</p>
        <div className="d-flex">
            <div className="w-75 p-3 ">
                <div className="border-bottom bg-light bg-gradient p-3">
                    {t("conect_facebook")}
                </div>
                <ul className="list-group">{pages.data?.map((d) => <li className="list-group-item list-group-item-action d-flex " key={d.id}>{d.name}
                <div className="form-check form-switch position-absolute top-0 end-0 mt-2">
                <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" />
                </div>
                </li>)}</ul>

                <FacebookLogin
                    appId="843134683665169"
                    autoLoad={true}
                    fields="name,email,picture"
                    scope={permission}
                    callback={responseFacebook}
                    render={renderProps => (
                    <Button className='m-2 btn btn-warning'  onClick={renderProps.onClick}>{t("add_fb_pages")}</Button>
                )}
                />
                 <input className="btn btn-warning" type="button" value="Permission" onClick={openModal} />
                 <Modal isOpen={isOpen} onRequestClose={closeModal}>
                    <p className="fw-bold ms-3">{t("all_permision")}</p>
                    <input className="btn btn-warning" type="button" value="Back" onClick={closeModal} />
                    <div>
                        <p>{t("new_permison")}</p>
                    </div>

                    <div>
                        <Form
                            onSubmit={_handleSubmit}
                            value={inputValue}
                            onChange={e => setInputValue(e.target.value)}
                        />
                        <ul className="list-group">
                            {permission.map((perm, index) => (
                            <ListPermission
                                key={index}
                                perm={perm}
                                remove={() => _handleBntClick({ type: "remove", index })}
                                completed={() => _handleBntClick({ type: "completed", index })}
                            />
                            ))}
                        </ul>
                        </div>
                </Modal>
            </div>
            <div className="col-md-4 m-2 h-5 border rounded">
                {picture ? <img className="img-thumbnail d-block me-auto ms-auto mt-5" alt="logo" src={picture} /> : null}
                <p className="text-center">{data.data.name}</p>
                <p className="text-center text-secondary">{t("connected_accounts")}</p>
                <Button className='m-2 d-block me-auto ms-auto' variant="outline-warning" onClick={disconnect}>{t("disconnect")}</Button>
            </div>
        
        </div>
        
    </>
  );
}

export default Home;
