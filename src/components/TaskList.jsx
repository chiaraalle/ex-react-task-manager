import { useContext } from "react";
import { GlobalContext } from "./context/GlobalContext";

function TaskList(){

    const {tasks} = useContext(GlobalContext);
    console.log('Tasks:', tasks);

    return(
        <>
            <h1>Le tue task</h1>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Stato</th>
                        <th>Data di Creazione</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task, i) => {
                        const {title, status, createdAt} = task;
                        return(
                            <tr key={i}>
                                <td>{title}</td>
                                <td>{status}</td>
                                <td>{createdAt}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
    
}

export default TaskList;

/*
Strutturare TaskList.jsx come una tabella, con le intestazioni Nome, Stato, Data di Creazione.

Creare un componente TaskRow.jsx, che rappresenta una singola riga della tabella e mostra solo le proprietà title, 
status e createdAt (escludendo description).

Applicare uno stile differente alla colonna status, assegnando i seguenti colori di sfondo alle celle in base 
al valore dello stato:
"To do" → rosso
"Doing" → giallo
"Done" → verde

Utilizzare React.memo() su TaskRow.jsx per ottimizzare le prestazioni ed evitare render inutili.
 */