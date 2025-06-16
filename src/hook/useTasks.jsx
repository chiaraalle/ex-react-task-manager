import {useState, useEffect} from 'react';

function useTasks(){

 const [tasks, setTasks] = useState([]);

    useEffect(() => {
    
        const fetchTasks = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_API_URL);
                if (!response.ok) {
                    throw new Error(`Errore! status: ${response.status}`);
                }
                const data = await response.json();
                setTasks(data);
            } catch (error) {
                console.error('Errore nel recupero delle tasks:', error);
        }
        };

        fetchTasks();
    }, [])

    //funzione per aggiungere task. Deve gestire: 
    // una chiamata post, validare la risposta e aggiornare lo stato globale e gestire gli errori.
    const addTask = async (taskData) => {
        try {
            const response = await fetch(import.meta.env.VITE_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(taskData)
            });

            const data = await response.json();

            if (data.success) {
                setTasks(prevTasks => [...prevTasks, data.task]);
                return data; 
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            throw error; 
        }
    };


    //funzione per rimuovere task
    const removeTask = () => {

    }

    //funzione per modificare task
    const updateTask = () => {

    }

    return {tasks, addTask, removeTask, updateTask}
}

export default useTasks;
