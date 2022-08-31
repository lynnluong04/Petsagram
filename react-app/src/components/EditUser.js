import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

const EditUserForm = () => {
    const dispatch = useDispatch

    const [errors, setErrors] = useState([]);
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const updateUsername = (e) => {
        setUsername(e.target.value);
      };
      const updateName = (e) => {
        setName(e.target.value);
      };

      const updateEmail = (e) => {
        setEmail(e.target.value);
      };


    return (
        <div>
            <form>

            </form>
        </div>
    )
}
