import React from "react";
import { Route, Routes } from "react-router";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ToDoList from "./pages/ToDo/ToDoList";
import 'antd/dist/reset.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/to-do-list" element={<ToDoList />}></Route>
    </Routes>
  );
}

export default App;
