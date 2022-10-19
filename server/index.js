const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'password',
    database:'portfolioform'
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/get", (req,res) =>{
    const sqlGet = "select * from form";
    db.query(sqlGet,(err,result) =>{
        console.log(result);
        res.send(result);
    });
});

app.post('/api/insert', (req,res) => {

    const name = req.body.name;
    const email = req.body.email;
    const subject = req.body.subject;
    const message = req.body.message;

    //delete from form where name='';
    
    const sqlQuery = "insert into form(name,email,subject,message) values (?,?,?,?);";
    db.query(sqlQuery, [name,email,subject,message] , (err,result,field) => {
        if(err){
            res.send("ERROR!!....check console!!");
            return console.log(err);
        }
        res.send("data inserted successfully");
        return console.log(result);
    });

});

app.get("/", (req,res) => {
    res.send("Working!!!");
});



app.listen(3001, () => {
    console.log("running on port 3001");
});