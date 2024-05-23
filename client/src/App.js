import { useEffect, useState } from 'react';
import './App.css';
import { Register } from './Component/Register';
import axios from 'axios';

function App() {
 const[students, setStudents]=useState([]);

 useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3004/students/all');
      const students = await response.json();
      setStudents(students);
      // console.log(students);
    } catch (err) {
      console.error('Error fetching student data:', err);
    }
  };
  fetchData();
}, []); 

const handleDelete = (id) => {
  axios.delete(`http://localhost:3004/students/delete/${id}`);
  console.log('Student deleted successfully');
}

console.log(students);
const[click, setClick]= useState(false);
  return (
    <div className="App">
     {click && <Register/>}
      <h1>All Registered Students</h1>
      <button onClick={()=>setClick(!click)}>Add New Student</button>
      <div className="students">
          <table border={1}>
            <tr>
              <th>Student ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Date Of Birth</th>
              <th>Gender</th>
              <th>Action</th>
            </tr>

            {
              students.map((student)=>{
                return (<tr>
                  <td>{student.student_id}</td>
                  <td>{student.first_name}</td>
                  <td>{student.last_name}</td>
                  <td>{student.date_of_birth}</td>
                  <td>{student.gender}</td>
                  <td><button onClick={()=>handleDelete(student.student_id)}>Delete</button></td>
                </tr>);
              })
            }
          </table>
      </div>
    </div>
  );
}

export default App;