import React from "react";

const TabRecipies = ({tabSwitch}: {tabSwitch:string} ): React.JSX.Element => {

    return (
        <div className={tabSwitch === 'recipies' ? 'pageContent recipies active' : 'pageContent recipies'}>
            <div>Recipies</div>
        </div>
    )
}

export default TabRecipies