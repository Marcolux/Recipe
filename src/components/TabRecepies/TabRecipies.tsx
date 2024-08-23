import React from "react";

const TabRecepies = ({tabSwitch}: {tabSwitch:string} ): React.JSX.Element => {

    return (
        <div className={tabSwitch === 'recepies' ? 'pageContent recepies active' : 'pageContent recepies'}>
            <div>Recepies</div>
        </div>
    )

}

export default TabRecepies