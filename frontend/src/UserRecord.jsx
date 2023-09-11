import "font-awesome/css/font-awesome.min.css";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import UserModalBs from "./UserModalBs";
import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

export default function UserRecord({ id, username, email, contact, city, openModal, handleDelete }) {

  return (
    <>
      <tr>
        <td>{username}</td>
        <td>{email}</td>
        <td>{contact}</td>
        <td>{city}</td>
        <td>
          <a
            href="#"
            onClick={e=>openModal(e, {_id:id, username, email, contact, city})}
          >
            <i className="fa fa-edit"></i>
          </a>
        </td>
        <td>
          <a href="#" onClick={(e) => handleDelete(e, id)}>
            <i className="fa fa-trash"></i>
          </a>
        </td>
      </tr>
    </>
  );
}
