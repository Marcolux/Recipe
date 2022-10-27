import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { useContext } from "react";
import { Context } from "../context/Context";

const UserInNavBar = () => {
  const { userState } = useContext(Context);
  const [user, setUser] = userState;

  const { categIdState } = useContext(Context);
  const [categId, setCategId] = categIdState;

  const { categoryNameState } = useContext(Context);
  const [categoryName, setCategoryName] = categoryNameState;



  return (
    <div className="menuBar">
      <p>{user.name}</p>
      <div className="menuLinks">
        
        <Link className="links" to="/user-page">
          Categories
        </Link>
        {!categId ? (
          <Link className="links" to="/all-the-recipes">
            Recipes
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default UserInNavBar;
