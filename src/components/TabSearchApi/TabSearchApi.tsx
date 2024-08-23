import React from "react";


const TabSearchAPI = ({tabSwitch}: {tabSwitch:string} ): React.JSX.Element => {
    console.log('tabSwitch:', tabSwitch); // Check the value of tabSwitch
    return (
        <div className={tabSwitch === 'searchApi' ? 'pageContent searchApi active' : 'pageContent searchApi'}>  
            <div >Search from API</div>
        </div>
    )

}

export default TabSearchAPI