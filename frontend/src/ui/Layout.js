import React from 'react';
import "../styles.css"





const Layout=  ({title="Title",description="Description",className,children}) => {


    return (
        <div >
        {/*<div className="img-fluid mb-5">*/}
        {/*    <Slider/>*/}
        {/*</div>*/}
        <div className="jumbotron mt-5" style={{paddingTop:20, paddingBottom:2}}>
            <h2>{title}</h2>
            <p className="lead">{description}</p>
        </div>
            <div className={className}>{children}</div>
        </div>
    );
}

export default Layout;
