import { useContext, useState} from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from './context/GlobalContext';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import EditTaskModal from "./EditTaskModal";

function TaskDetail() {
    const { id } = useParams();
    const { tasks, removeTask, updateTask } = useContext(GlobalContext);
    const navigate = useNavigate();

    const [show, setShow] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false);

    const currentTask = tasks.find(task => task.id === parseInt(id));

    if(!currentTask){
        return (
           <div className="task-not-found">
                <h2>Nessuna task trovata</h2>
                <p>La task che stai cercando non esiste o è stata rimossa</p>
            </div>
        )
    }

    const handleDelete = async () => {
        console.log('questa task è stata eliminata: ', currentTask.id)
        try{
            await removeTask(currentTask.id);
            alert("task eliminata con successo!")
            navigate('/');
        
        } catch(error){
            alert(error.message);
        }
    }

    const handleUpdate = async (updatedTask) => {
        console.log('questa task è stata Modificata: ', updatedTask)
        try{
            await updateTask(updatedTask);
            alert("task modificata con successo!")
            setShowEditModal(false); 
        } catch(error){
            alert(error.message);
        }

    }

  return (
    <>
      <div className="task-detail">
        <h1>Dettagli Task</h1>
        <div className="task-info">
          <p><strong>Nome:</strong> {currentTask.title}</p>
          <p><strong>Descrizione:</strong> {currentTask.description}</p>
          <p><strong>Stato:</strong> {currentTask.status}</p>
          <p><strong>Data di creazione:</strong> {new Date(currentTask.createdAt).toLocaleDateString()}</p>
        </div>
        <div className="actionBtn">
          <button className="deleteBtn" onClick={() => setShow(true)}>Elimina Task</button>
          <button className="modifyBtn" onClick={() => setShowEditModal(true)}>Modifica Task</button>
        </div>
        
      </div>
      <Modal
        show={show}
        title="Conferma eliminazione"
        content="Sei sicuro di voler eliminare questa task?"
        onClose={() => setShow(false)}
        onConfirm={() => {
          handleDelete();
        }}
        confirmText="Elimina"
      />

      <EditTaskModal 
        task = {currentTask}
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleUpdate}
      />
    </>
    
  );
};

export default TaskDetail;