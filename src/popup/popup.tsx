import React from "react";
import ReactDOM from "react-dom";
import "../styles/global.css";
import "./popup.css";
import { Form } from "./form";

export const App: React.FC = () => (
  <>
    <Form />
  </>
);
const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<App />, root);
