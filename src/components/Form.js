import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Form(props) {
  return (
    <form onSubmit={props.onSubmit} style={{ paddingLeft: 40, marginTop: 16 }}>
      <input
        type="text"
        value={props.value}
        onChange={props.onChange}
        placeholder="pernission"
        className="form-control p-0" 
        aria-label="Sizing example input"
      />
      <button className="btn btn-outline-success mt-1 mb-1" type="submit">Add Permission</button>
    </form>
  );
}
