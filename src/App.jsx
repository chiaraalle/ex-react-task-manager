import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";


function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/TaskList" element={<TaskList />}/>
        <Route path="AddTask" element={<AddTask />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
