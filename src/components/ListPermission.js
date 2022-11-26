import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from "react-i18next";



export default function Listermission(props) {
  const { t } = useTranslation();
  const { name } = props.perm;
  return (
    <li className="list-group-item">
      {name}
      <div className="d-flex">
        <button className="btn btn-outline-danger me-5" onClick={props.remove}>{t("remove")}</button>
      </div>
    </li>
  );
}
