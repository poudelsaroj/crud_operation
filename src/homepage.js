import React, { useEffect, useState } from 'react';
import { StudentData } from './data';
import './homepage.css';


function Homepage() {
   const[Data,setData] =useState([]);
   const [Name,setName] =useState('');
    const [Age,setAge] =useState('');
    const [id,setid] =useState('');
    const [ isUpdate ,setIsUpdate] =useState(false)

   useEffect(() => {
    setData(StudentData)},[]);
const handleEdit = (id) =>{
           const dt = Data.filter(item => item.id ===id);
           if (dt !== undefined) {
                setIsUpdate(true)
                setid(id);
                setName(dt[0].name);
                setAge(dt[0].age);
              
           }
    }

const handleDelete = (id) =>{
        if (id>0){
            if(window.confirm("Are you sure to delete")){
            const dt =Data.filter(item => item.id !==id);
            setData(dt);
        }}
    }
const handleSave =(e)=>{
    let error ='';
    if(Name === '')
        error = 'Name is required'
    if(Age === '' )
        error = 'Age is required'
    if(isNaN(Age) || Age <= 0)
        error = 'Age should be a number greater than 0';
    if (error == ''){
   e.preventDefault();
   const dt = [... Data];
   const newObject ={
         id: Data.length +1,
         name: Name,
         age: Age,
    
   }
   dt.push(newObject);
   setData(dt);
   setName('');
    setAge('');
}
else{
    alert(error);}

}
const handleClear =()=>{
    setid('');
    setName('');
    setAge('');
    setIsUpdate(false);
}
const handleUpdate =()=>{
    const index = Data.map((item)=>{
        return item.id
    }).indexOf(id);
    const dt =[... Data];
    dt[index].name = Name;
    dt[index].age = Age;
    setData(dt);
    handleClear();
    }

  return (
    <div className='home'>  
        <h1>CRUD Operation</h1>

        <div className='new'>
           
            <div>
                <label>Name:
                <input type="text" placeholder="Enter Name" onChange={(e)=> setName(e.target.value)} value={Name}/>
                </label>
            </div>
            <div>
                <label>Age:
                <input type="text" placeholder="Enter Age" onChange={(e)=> setAge(e.target.value)} value={Age}/>
                </label>
            </div>
            <div>
                {
                !isUpdate ? <button onClick={(e) =>handleSave(e)}>Save</button> : 
                <button onClick={() =>handleUpdate()}>Update</button>
                }
                    <button onClick={() =>handleClear()}>Clear</button>


            </div>
        </div>
      <table>
        <thead>
            <tr>
                <th>Sr. NO. </th>
                <th>id</th>
                <th>Name</th>
                <th>Age</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {Data.map((item,index) =>{ 
            return(
                <tr key={index}>
                <td>{index+1}</td>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>
                    <button onClick={() =>handleEdit(item.id)}>Edit</button>
                    <button onClick={() =>handleDelete(item.id)}>Delete</button>
                </td>
                </tr>
            )})}
        </tbody>
      </table>
    </div>
  )
}

export default Homepage

