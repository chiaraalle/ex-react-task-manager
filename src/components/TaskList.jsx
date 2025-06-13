import TaskRow from "./TaskRow";
import { useContext } from "react";
import { GlobalContext } from "./context/GlobalContext";

function TaskList(){
    const { tasks } = useContext(GlobalContext);

    return(
        <>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Stato</th>
                        <th>Data di Creazione</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <TaskRow 
                            key={task.id}
                            task={task}
                        />
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default TaskList;

/*
Applicare uno stile differente alla colonna status, assegnando i seguenti colori di sfondo alle celle in base al valore dello stato:
"To do" → rosso
"Doing" → giallo
"Done" → verde

*/