const express = require('express');
const mysql = require('mysql');

const body_parser = require('body-parser');

const app = express();


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
        res.status(201).json({message: "Student registered success!!"});
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
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));