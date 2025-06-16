import { useContext} from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from './context/GlobalContext';

function TaskDetail() {
    const { id } = useParams();
    const { tasks } = useContext(GlobalContext);

    const currentTask = tasks.find(task => task.id === parseInt(id));

    if(!currentTask){
        return (
           <div className="task-not-found">
                <h2>Nessuna task trovata</h2>
                <p>La task che stai cercando non esiste o è stata rimossa</p>
            </div>
        )
    }

    const handleDelete = () => {
        console.log('questa task è stata eliminata: ', currentTask.id)
    }

  return (
    <div className="task-detail">
      <h1>Dettagli Task</h1>
      <div className="task-info">
        <p><strong>Nome:</strong> {currentTask.title}</p>
        <p><strong>Descrizione:</strong> {currentTask.description}</p>
        <p><strong>Stato:</strong> {currentTask.status}</p>
        <p><strong>Data di creazione:</strong> {new Date(currentTask.createdAt).toLocaleDateString()}</p>
      </div>
      <button className="deleteBtn" onClick={handleDelete}>Elimina Task</button>
    </div>
  );
};

export default TaskDetail;