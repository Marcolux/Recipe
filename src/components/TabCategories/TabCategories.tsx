import React from "react";

const TabCategories = ({tabSwitch}: {tabSwitch:string} ): React.JSX.Element => {

    return (
        <div className={tabSwitch === 'categories' ? 'pageContent categories active' : 'pageContent categories'}>
            <div>Categories</div>
        </div>
    )

}

export default TabCategories