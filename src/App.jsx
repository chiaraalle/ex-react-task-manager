import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";
import GlobalContext from "./components/context/GlobalContext";
import GlobalContextProvider from "./components/context/GlobalContext";


function App() {

  return (
    <GlobalContextProvider>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/TaskList" element={<TaskList />}/>
          <Route path="AddTask" element={<AddTask />}/>
        </Routes>
      </BrowserRouter>
    </GlobalContextProvider>
    
  )
}

export default App
