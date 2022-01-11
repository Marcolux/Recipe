import { useState, createContext } from "react";

const Context = createContext();

const Provider = ({children}) => {
    
    const [ user, setUser ] = useState({});

    const state = {
        userState: [ user, setUser ]
    }

    return (
        <Context.Provider value={state} >
            {children}
        </Context.Provider>
    )
}

export { Context, Provider }