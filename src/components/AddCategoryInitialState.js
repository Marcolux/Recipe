import { FiPlus } from "react-icons/fi";

const AddCategoryInitialState = (props) => {

  return (
    <div className='Addcategory align-center'>
      <p>Add a New Category</p>
      {/* once we push add we switch state to createCategory and an addCategoryInitialState component is going to show */}
      <button
        className="addFromBackend button-orange"
        onClick={() => {
          props.setCreateCategory(true);
        }}
      style={{fontWeight: "Bold"}}>
        <FiPlus />
      </button>
    </div>
  )
}

export default AddCategoryInitialState