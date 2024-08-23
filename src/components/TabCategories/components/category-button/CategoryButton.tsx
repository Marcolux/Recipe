import React, {useState} from "react";
import './style/categoryButton.css'

interface CategoryButtonProps {
    categoryName: string
    onClick?: () => void
    className: string
}

const CategoryButton = ({categoryName, onClick, className}: CategoryButtonProps) => {

    return (
        <button 
            className={className} 
            id={categoryName}
            onClick={onClick}
        >{categoryName}</button>
    )
}

export default CategoryButton