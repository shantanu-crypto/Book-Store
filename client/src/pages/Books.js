import React from 'react'
import { useState,useEffect } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom';

const Books = () => {
    const [books,setBooks]=useState([]);

    useEffect(()=>{
        const FetchAllBooks=async()=>{
            try{
                const res=await axios.get("http://localhost:8800/books");
                setBooks(res.data);
            }catch(err){
                console.log(err);
            }
        }
        FetchAllBooks();
    },[]);

    const handleDelete=async(id)=>{
        try {
            await axios.delete("http://localhost:8800/books"+id)
            window.location.reload()
        } catch (error) {
            
        }
    }
  return (
    <div>
        <h1>Shan Book Shop</h1>
        <div className="books">
            {books.map((book)=>(
                <div className="book" key={book.id}>
                    {book.cover && <img src={"https://edit.org/images/cat/book-covers-big-2019101610.jpg"} alt="Book Cover" />}
                    <h2>{book.title}</h2>
                    <p>{book.desc}</p>
                    <span>{book.price}</span>
                    <button className="delete" onClick={()=>handleDelete(book.id)}>Delete</button>
                    <button className="update"><Link to={`/update/${book.id}`}>Update</Link></button>
                </div>
            ))}
        </div>
        <button className="addBook"><Link to="/add"> Add new book</Link></button>
    </div>
  );
};

export default Books