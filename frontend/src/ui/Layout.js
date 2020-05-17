import React from 'react';
import "../styles.css"
import Slider from "./Slider";




const Layout=  ({title="Title",description="Description",className,children}) => {


    return (
        <div>
        <div className="img-fluid mb-5">
            <Slider/>
        </div>
            <div className={className}>{children}</div>
        </div>
    );
}

export default Layout;
