import { createContext} from "react";
import useTasks from "../../hook/useTasks";


export const GlobalContext = createContext();

function GlobalProvider( {children} ){

    const {tasks, addTask, removeTask, updateTask} = useTasks() //utilizzo custom Hook
   
    return (
        <GlobalContext.Provider value={{tasks, addTask, removeTask, updateTask}}> {/*si può fare le spread */}
            {children}
        </GlobalContext.Provider>
    )
}


export default GlobalProvider;

