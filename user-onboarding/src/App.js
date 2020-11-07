import React from "react";
import InputForm from "./components/InputForm.js";
import "./App.css";

function App() {
  return (
    <div className="appPage">
      <h1>New User Onboarding</h1>
      <InputForm />
      <a href="./components/Users.js">Users</a>
    </div>
  );
}

export default App;
