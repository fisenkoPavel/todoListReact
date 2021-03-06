import React from "react";
import './app-header.css';

const AppHeader = ({todo, done}) => {
    return(
        <div className="app-header d-flex">
            <h1>Todo List</h1>
            <h2>{todo} needs to be done, {done} done</h2>
        </div>
    );
};

export default AppHeader;