// import { useContext, useEffect, useState } from 'react';
// import { Context } from '../context/Context';
// import { useNavigate} from "react-router-dom"

// import axios from 'axios';
// import Category from './Category';

// import env from 'react-dotenv';

// const CategoriesInPage=()=>{

//     // const [categoriesUser, setCategoriesUser] =useState([])

//     const { categIdState } = useContext(Context);
//     const [categId,setCategId] = categIdState

//     const { categoryNameState } = useContext(Context);
//     const [categoryName,setCategoryName] = categoryNameState

//     const { userState } = useContext(Context);
//     const [user, setUser] = userState

//     let history = useNavigate()

//     // const getCategories=()=>{
//     // const userId=localStorage.getItem('userId')

//     // axios.get(`${env.BACKEND_URL}/category/all/${userId}`)
//     // .then((response)=>{setCategoriesUser(response.data)})
//     // }

//     // useEffect(getCategories,[])

//     const deleteCategory= (i)=>{

//         categoriesUser.splice(i,1)
//         let array = categoriesUser
//         setCategoriesUser(array)
//       }

//     return(
//         <div className='allTheCategories'>
           
//             <div className='CategorySection' key={i}>
//                 <p className='categoryTitle'>{category.name}</p>
//                 <button className='deleteCat' onClick={()=>{
                  
//                     axios.delete(`${env.BACKEND_URL}/category/${category.id}`)
//                         categoriesUser.splice(i,1)
//                         let array = categoriesUser
//                         setCategoriesUser(array)
                      
//                     setCategoriesUser([...categoriesUser])
//                 }
//                 }>Remove</button>
//                 <Category className='categorySingle'  category={category} categoriesUser={categoriesUser} />
//             </div>
//             )
//         })
//         :
//         <p>...loading</p>
//         }
//         </div>
       
//     )
// }

// export default CategoriesInPage