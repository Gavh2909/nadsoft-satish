import React, { useState } from "react";
import "../Component/Register.css";
import axios from 'axios';

export const Register = () => {
  const [student, setStudent] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
  });

  const[message, setMessage] = useState('');

  const handleSubmit = () => {
    return new Promise((resolve, reject) => {
        axios.post("http://localhost:3004/students/register", student)
            .then(response => {
                setMessage(response.data.message);
            })
            .catch(error => {
                console.error(error);
            });
    });
};

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  // console.log(student);
  return (
    <div className="register-student">
      <h2>Register Student</h2>
      <input type="text" name="firstName" onChange={handleChange} placeholder="First Nane" />
      <input type="text" name="lastName" onChange={handleChange}  placeholder="Last Name"/>
      <input type="date" name="dateOfBirth" onChange={handleChange} />
      <select name="gender" onChange={handleChange}>
        <option value="#">--select gender--</option>
        <option value="Female">Female</option>
        <option value="Male">Male</option>
        <option value="Others">Others</option>
      </select>
      <button onClick={handleSubmit}>Register</button>
      <p>{message}</p>
    </div>
  );
};
