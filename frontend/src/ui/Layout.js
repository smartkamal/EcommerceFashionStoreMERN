import React from 'react';
import "../styles.css"
import Sliders from "./Sliders";




const Layout=  ({title="Title",description="Description",className,children}) => {


    return (
        <div>
        <div className="jumbotron">
            <Sliders/>
        </div>
            <div className={className}>{children}</div>
        </div>
    );
}

export default Layout;
