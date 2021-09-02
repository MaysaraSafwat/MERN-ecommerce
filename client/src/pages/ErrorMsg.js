import React from "react";

export default function ErrorMsg(props){

    return (
        <div className={`alert alert-${props.variant}`}>
         {props.children}   
        </div>
    )
}