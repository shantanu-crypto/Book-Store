import axios from 'axios';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';


const Update = () => {

    const [book,setBook]=useState({
        title:"",
        desc:"",
        cover:"",
        price:null
    });

    const navigate=useNavigate();
    const location=useLocation();

    const bookId=location.pathname.split("/")[2];
    console.log(location.pathname.split("/")[2]);
    const handleChange=(e)=>{
        setBook((prev)=>({...prev,[e.target.name]:e.target.value}));
        // console.log(e.target.name, e.target.value);
    }

    const handleClick=async(e)=>{
        e.preventDefault();

        try {
            await axios.put("http://localhost:8800/books/"+bookId,book);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className='form'>
        <h1>Update The Book</h1>
        <input 
            type="text"
            placeholder="title"
            onChange={handleChange}
            name="title"
        />
        <input 
            type="text"
            placeholder="desc"
            onChange={handleChange}
            name="desc"
        />
        <input 
            type="text"
            placeholder="cover"
            onChange={handleChange}
            name="cover"
        />
        <input 
            type="number"
            placeholder="price"
            onChange={handleChange}
            name="price"
        />
        <button className="formButton" onClick={handleClick}>Update</button>
    </div>
  )
}

export default Update