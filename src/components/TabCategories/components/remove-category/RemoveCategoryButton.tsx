import React, {useState} from "react";
import './style/removeCategoryButton.css'

interface RemoveCategoryButtonProps {
    categoryName: string
    id: string
    onClick?: () => void
    className: string
}

const RemoveCategoryButton = ({categoryName, onClick, className, id}: RemoveCategoryButtonProps) => {

    return (
        <button 
            className={className} 
            id={id}
            onClick={onClick}
        >Remove {categoryName}</button>
    )
}

export default RemoveCategoryButton