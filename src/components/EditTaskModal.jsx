import { useState, useRef } from "react";
import Modal from "./Modal";

function EditTaskModal({ show, onClose, task, onSave }) {
    const [editedTask, setEditedTask] = useState(task);
    const editFormRef = useRef();

    const changeEditedTask = (key, event) => {
        setEditedTask(prev => ({ ...prev, [key]: event.target.value }));
    }

    const { title, description, status } = editedTask;

    const handleSubmit = e => {
        e.preventDefault();
        onSave(editedTask);
    }

    return (
        <Modal
            title="Modifica Task"
            content={
                <form ref={editFormRef} onSubmit={handleSubmit} className="edit-task-form">
                    <div className="form-group">
                        <strong>Nome</strong>
                        <input
                            type="text"
                            value={title}
                            onChange={e => changeEditedTask('title', e)}
                            placeholder="Nome task"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <strong>Descrizione</strong>
                        <textarea
                            value={description}
                            onChange={e => changeEditedTask('description', e)}
                            placeholder="Descrizione"
                        />
                    </div>
                    <div className="form-group">
                        <strong>Stato</strong>
                        <select value={status} onChange={e => changeEditedTask('status', e)}>
                            <option value="To do">To Do</option>
                            <option value="Doing">Doing</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>
                </form>
            }
            confirmText="Salva"
            show={show}
            onClose={onClose}
            onConfirm={() => editFormRef.current.requestSubmit()}
        />
    )
}

export default EditTaskModal;