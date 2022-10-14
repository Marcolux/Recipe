import { useContext, useState } from "react";
import { Context } from "../context/Context";
import axios from "axios";
import env from "react-dotenv";

import { IoCloseCircleOutline } from "react-icons/io5";


const AddCategory = (props) => {
  const { userState } = useContext(Context);
  const [user, setUser] = userState;

  const { alertState } = useContext(Context);
  const [alert, setAlert] = alertState

  const [categoryName, setCategoryName] = useState("");

  // console.log(user.id)

  const createTheCategory = () => {
    const input = document.querySelector('#inputForm')

    if(input.value !== '') {
        axios.post(`${env.BACKEND_URL}/category/${user.id}`, { categoryName })
        props.setCreateCategory(false);
        setAlert(false)
    } else {
        setAlert(true)
        props.setCreateCategory(true)
    }
   
  };
  return (
    <div className="Addcategory align-center">
      <form onSubmit={
          (e) => {
            // console.log(e.target.value) 
            createTheCategory()
          }
      } className='flex-column width-100 align-center justifyBetween'>
      <div className=''> 
        <label htmlFor="name"> Enter Category name </label>{" "}
        <IoCloseCircleOutline 
          onClick={() => {
                props.setCreateCategory(false)
                setAlert(false)
          }} className='hover-darker'/>
      </div>
        <input
          id="inputForm"
          className='mt-5 width-90'
          type="text"
          value={categoryName}
          onChange={
            (e) => setCategoryName(e.target.value)
          }
        />
      </form>
      <button className='mt-10 button-orange' onClick={createTheCategory}>Add</button>
    </div>
  );
};

export default AddCategory;
