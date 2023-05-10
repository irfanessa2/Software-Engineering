const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");

const app = express();
app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "PUT Your Password Here",
  database: "crabshell",
});
//Signup backend
app.post('/Signup', (req,res)=>{
  const sql = "INSERT INTO employee (`first_name`,`last_name`,`email`,`password`,`salary`,`type`) VALUES (?)";
  const values = [
    req.body.first_name,
    req.body.last_name,
    req.body.email,
    req.body.password,
    req.body.salary,
    req.body.type
  ]
  connection.query(sql,[values], (err, data)=>{
    if(err){
      return res.json("Error");
    }
    return res.json(data);
  })
})
//Login Backend
app.post('/Login', (req,res)=>{
  const sql = "SELECT * FROM employee WHERE `email` = ? AND `password` = ?";
  connection.query(sql,[req.body.email,req.body.password], (err, data)=>{
    if(err){
      return res.json("Error");
    }
    if (data.length > 0) {
      return res.json("Success")
    } else {
      return res.json("Invalid login credentials");
    }
  })
})
//Employee Backend
app.get('/Employee_Details', (req, res) => {
  const sql = 'SELECT * FROM employee';
  connection.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(res.result);
    res.send(result);
  });
});

//Record backend
app.get('/Records', (req, res) => {
  const sql = 'SELECT * FROM invoice';
  connection.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(res.result);
    res.send(result);
  });
});
app.post('/Records', (req,res)=>{
  const sql = "INSERT INTO invoice (`invoice_id`,`buy_price`,`sell_price`,`fisherman_id`,`employee_id`,`category`) VALUES (?)";
  const values = [
    req.body.invoice_id,
    req.body.buy_price,
    req.body.sell_price,
    req.body.fisherman_id,
    req.body.employee_id,
    req.body.category,
  ]
  connection.query(sql,[values], (err, data)=>{
    if(err){
      return res.json("Error");
    }
    return res.json(data);
  })
})

//Fisherman backend
app.get('/Fisherman', (req, res) => {
  const sql = 'SELECT * FROM fisherman_details';
  connection.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(res.result);
    res.send(result);
  });
});
//Revenue backend
app.get('/Revenue', (req, res) => {
  const sql = 'SELECT * FROM revenue';
  connection.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(res.result);
    res.send(result);
  });
});
app.post('/Revenue', (req,res)=>{
  const sql = "INSERT INTO revenue (`year`,`month`,`revenue`) VALUES (?)";
  const values = [
    req.body.year,
    req.body.month,
    req.body.revenue, 
  ]
  connection.query(sql,[values], (err, data)=>{
    if(err){
      return res.json("Error");
    }
    return res.json(data);
  })
})

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database");
});

app.listen(8081, () => {
  console.log("Server started on port 8081");
});
