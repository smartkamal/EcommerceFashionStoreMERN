import React from 'react';
import "../styles.css"

const Layout=  ({title="Title",description="Description",className,children}) => {

    return (
        <div >
        <div className="jumbotron mt-5" style={{paddingTop:30, paddingBottom:5}}>
            <h2>{title}</h2>
            <p className="lead">{description}</p>
        </div>
            <div className={className}>{children}</div>
        </div>
    );
}

export default Layout;
