import TaskRow from "./TaskRow";
import { useContext, useMemo, useState } from "react";
import { GlobalContext } from "./context/GlobalContext";
import { FaArrowUp, FaArrowDown} from "react-icons/fa";

function TaskList(){
    const { tasks } = useContext(GlobalContext);

    const [sortBy, setSortBy] = useState('createdAt')
    const [sortOrder, setSortOrder] = useState(1)

    const handleSort = (field) => {
        if(sortBy === field){
            setSortOrder(prev => prev * -1);
        } else{
            setSortBy(field);
            setSortOrder(1);
        }
    }

    const sortIcon = (field) => {
        if (sortBy !== field) return null;
        return sortOrder === 1 ? <FaArrowUp className="sort-icon sort-icon-up" /> 
        : <FaArrowDown className="sort-icon sort-icon-down" />;
    };

    const sortedTask = useMemo(() => {
      return [...tasks].sort((a, b) => {
        let comparison = 0;

        if(sortBy === 'title'){
            comparison = a.title.localeCompare(b.title);
        } else if(sortBy === 'status'){
            const statusOption = ["To do", "Doing", "Done"];
            const indexA = statusOption.indexOf(a.status);
            const indexB = statusOption.indexOf(b.status);
            comparison = indexA - indexB;
        } else if(sortBy === 'createdAt'){
            const dateA= new Date(a.createdAt).getTime();
            const dateB= new Date(b.createdAt).getTime();
            comparison = dateA - dateB;
        }

        return comparison * sortOrder
      })
    }, [tasks, sortBy, sortOrder])

    return(
        <>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => handleSort('title')}>
                            Nome {sortIcon('title')}
    
                        </th>
                        <th onClick={() => handleSort('status')}>
                            Stato {sortIcon('status')}
                        </th>
                        <th onClick={() => handleSort('createdAt')}>
                            Data di Creazione {sortIcon('createdAt')}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedTask.map(task => (
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
Aggiungere due state in TaskList.jsx:
sortBy: rappresenta il criterio di ordinamento (title, status, createdAt).
sortOrder: rappresenta la direzione (1 per crescente, -1 per decrescente).
Il default di sortBy è createdAt, il default di sortOrder, è 1.

Modificare la tabella per rendere cliccabili le intestazioni (th), in modo che al click:
Se la colonna è già selezionata (sortBy uguale alla colonna cliccata), invertire sortOrder.
Se la colonna è diversa, impostare sortBy sulla nuova colonna e sortOrder su 1.

Implementare la logica di ordinamento con useMemo(), in modo che l’array ordinato venga ricalcolato solo quando cambiano tasks, sortBy o sortOrder:
Ordinamento per title → alfabetico (localeCompare).
Ordinamento per status → ordine predefinito: "To do" < "Doing" < "Done".
Ordinamento per createdAt → confrontando il valore numerico della data (.getTime()).
Applicare sortOrder per definire se l’ordine è crescente o decrescente.

*/