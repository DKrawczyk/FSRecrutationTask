import React from "react";
import ReactDom from "react-dom";

import RecrutationTask from "./components/RecrutationTask"

import './styles/style.css'

const App = () => <RecrutationTask/>

ReactDom.render(
    <App/>,
    document.querySelector('#root')
)