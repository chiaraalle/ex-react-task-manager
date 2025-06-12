import { createContext, useEffect, useState } from "react";


export const GlobalContext = createContext();

function GlobalProvider( {children} ){


    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        /*
        fetch(import.meta.env.VITE_API_URL)
            .then(res => res.json())
            .then(data => {
                console.log('Dati ricevuti:', data);
                setTasks(data)})
            .catch(err => console.error(err))*/
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

    return (
        <GlobalContext.Provider value={{ tasks, setTasks }}>
            {children}
        </GlobalContext.Provider>
    )
}


export default GlobalProvider;

