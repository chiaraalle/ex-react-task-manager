import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";
import GlobalProvider from "./components/context/GlobalContext";


function App() {

  return (
    <GlobalProvider>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<TaskList />}/>
          <Route path="AddTask" element={<AddTask />}/>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
    
  )
}

export default App
