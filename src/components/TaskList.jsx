import TaskRow from "./TaskRow";
import { useCallback, useContext, useMemo, useState } from "react";
import { GlobalContext } from "./context/GlobalContext";
import { FaArrowUp, FaArrowDown} from "react-icons/fa";

//funzione di debounce
function debounce(callback, delay){
    let timer;
    return (value) => {
        clearTimeout(timer);
        timer= setTimeout(() => {
            callback(value)
        }, delay)
    }
}

function TaskList(){
    const { tasks } = useContext(GlobalContext);

    const [sortBy, setSortBy] = useState('createdAt')
    const [sortOrder, setSortOrder] = useState(1)

    const [searchQuery, setSearchQuery] = useState('')
    const debounceSetSearchQuery = useCallback(
        debounce(setSearchQuery, 500)
    , []);

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

    const sortedAndFilteredTask = useMemo(() => {
        const filteredTasks = tasks.filter(task => 
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        return [...filteredTasks].sort((a, b) => {
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
        });
    }, [tasks, sortBy, sortOrder, searchQuery])


    return(
        <>
        <div className="search-container">
            <input 
                type="text-filter" 
                name="filtertasks"
                onChange={(e) => debounceSetSearchQuery(e.target.value)}
                placeholder="Cerca task..." 
            />
        </div>
        

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
                {sortedAndFilteredTask.map(task => (
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

