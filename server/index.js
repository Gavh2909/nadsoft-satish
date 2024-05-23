const express = require('express');
const mysql = require('mysql');
const cors = require('cors')

const body_parser = require('body-parser');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(cors({
    origin: 'http://localhost:3000'
}));
  
const database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'studentdb'
});


database.connect((error) => {
    if (error) {
        console.log("Connection failed please check the conf once")
    }
    console.log('Connected to MySQL database successfully');
});

// New Student registration -> POST API
app.use(body_parser.json())
app.post('/students/register',(req,res) =>{
    const {firstName, lastName, dateOfBirth, gender} = req.body;
    let sql_query = 'INSERT INTO Students (first_name, last_name, date_of_birth, gender) Values (?,?,?,?)';

    database.query(sql_query,[firstName, lastName, dateOfBirth, gender], (error, result)=>{
        if(error){
            console.log("Failed to register a student!!",error);
            return;
        }
        // console.log("Student Registered succesfully!!")
        res.status(201).json({message: "Student registered successfully!!"});
    })
})


// Retriving all the existing stidentys

app.get('/students/all',(req,res)=>{
    let sql_query = "SELECT * FROM Students";
    database.query(sql_query, (error, result)=>{
        if(error){
            res.json({message:"Failed to get students try after some minuted"});
        }
        res.json(result);
    })
})


// 3. Getting single student by id

app.get('/students/get/:id', (req,res)=>{
    let studentId = req.params.id;

    let sql_query="SELECT * FROM students where student_id=?"

    database.query(sql_query,[studentId], (error,result)=>{
        if(error){
            res.status(500).json({message:"No student present with this id!!"})
            return;
        }
        res.json(result);
    });
})



// edit the student
app.put('/students/edit/:id', (req, res) => {
    const studentId = req.params.id;
    const { firstName, lastName, dateOfBirth, gender="Male" } = req.body;
    const sql = 'UPDATE students SET first_name = ?,last_name=?,  date_of_birth = ?, gender = ? WHERE student_id = ?';
    
    database.query(sql, [studentId, firstName, lastName, dateOfBirth, gender], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Student updated successfully!!' });
    });
});

// delete the exsting student
app.delete('/students/delete/:id', (req, res) => {
    const studentId = req.params.id;
    const sql = 'DELETE from students where student_id = ?';
    database.query(sql, [studentId], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Student deleted successfully!!' });
    });
});

const PORT = 3004;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));