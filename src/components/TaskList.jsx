import { useContext } from "react";
import { GlobalContext } from "./context/GlobalContext";

function TaskList(){

    const {tasks} = useContext(GlobalContext);
    console.log('Tasks:', tasks);

    return(
        <div>
            <h1>Qui ci andranno le task</h1>
        </div>
    )
    
}

export default TaskList;