import React from 'react';
import Style from "./Loading.module.css";

const Loading = () => {
    return (
        <div className={`${Style.container}`}>
            <div className={`${Style.loading} `} />
        </div>
    )
}

export default Loading