import { useContext} from "react";
import { Context } from "../context/Context";

const AlertMessage = () => {
    const { alertState } = useContext(Context);
    const [alert, setAlert] = alertState
    
    const alertFalse = () => {
        setAlert(false)
    }

    return(
        alert ?
        <div className='alert'>
                <span className='closebtn' onClick={alertFalse}>&times;</span>
            <strong>Please Enter A Valid Name</strong>
        </div>
        :
        null

    )
}

export default AlertMessage