import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Listermission(props) {
  const { name } = props.perm;
  return (
    <li className="list-group-item">
      {name}
      <div className="d-flex">
        <button className="btn btn-outline-danger me-5" onClick={props.remove}>Remove</button>
      </div>
    </li>
  );
}
