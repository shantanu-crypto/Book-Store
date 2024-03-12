import express from "express";
import mysql from "mysql";
import cors from "cors"
import dotenve from "dotenv"

const app =express();
dotenve.config();

const PASSWORD=process.env.DB_PASSWORD;
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:PASSWORD,
    database:"test"
});

app.use(cors());
app.use(express.json());

//If there is a auth problem
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_current_password';

app.get("/",(req,res)=>{
    res.json("hello this is backend");
})

app.get("/books",(req,res)=>{
    const q="SELECT * FROM books";
    db.query(q,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    });
})

app.post("/books",(req,res)=>{
    const q="INSERT INTO books (`title`,`desc`,`cover`,`price`) VALUES (?)";
    const values=[req.body.title,req.body.desc,req.body.cover,req.body.price];

    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err);
        return res.json("Book has been created successfully");
    })
})

app.delete("/books:id",(req,res)=>{
    const bookId=req.params.id;
    const q="DELETE FROM books WHERE id=?"

    db.query(q,[bookId],(err,data)=>{
        if(err) return res.json(err);
        return res.json("Book has been deleted successfully");
    })
})

app.put("/books/:id",(req,res)=>{
    const bookId=req.params.id;
    const q="UPDATE books SET `title`=?, `desc`=?, `cover`=?, `price`=? WHERE id=?";

    const values=[
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.price
    ];


    db.query(q,[...values,bookId],(err,data)=>{
        if(err) return res.json(err);
        return res.json("Book has been updated successfully");
    })
})

app.listen(8800,()=>{
    console.log("Connected to backend!!");
})