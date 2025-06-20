import { useRef, useState, useMemo, useContext } from "react";
import { GlobalContext } from "./context/GlobalContext"

 const symbols = "!@#$%^£&/*()-_=+[]{}|;:',.<>?/`~";


function AddTask(){

    const { addTask } = useContext(GlobalContext);

    //input non controllato
    const [title, setTitle] = useState("");
    //input controllato
    const descriptionRef = useRef();
    const statusRef = useRef();

    //validazione nome non può essere vuoto. No simboli speciali.
    const isTitleValid= useMemo(() => {
        if (!title.trim()) return 'Il campo Nome della task non può essere vuoto!';

        if([...title].some(char => symbols.includes(char))) return 'Il nome della task non può contenere simboli'
        
        return "";

    }, [title])

    const handleSubmit= async (e) => {
        e.preventDefault();

        const description = descriptionRef.current.value;
        const status = statusRef.current.value;

        console.log("Status value:", status)

        if ( !description  || isTitleValid !== "" || !status) {
            alert('Per favore compila tutti i campi correttamente');
            return;
        }
    
          const taskData = {
            title,
            description,
            status
        };
       
        console.log(taskData)

        try{
            await addTask(taskData);
            alert("task creata con successo!")
            // Reset del campo controllato
            setTitle('');

            // Reset dei campi non controllati
            descriptionRef.current.value = "";
            statusRef.current.value = "To do"; 
        } catch(error){
            alert(error.message);
        }

        
    };


   return(
    <>
        <form onSubmit={handleSubmit}>
            <input
            type="text" 
            name="title" 
            value={title}
            onChange={(e) => {setTitle(e.target.value)}}
            placeholder="Nome task"  
            />
            {title && isTitleValid &&  (
                <p className="errorMess">
                {isTitleValid}
                </p>
            )}
            <textarea name="description" ref={descriptionRef} placeholder="Descrizione"></textarea>
            <select name="stato" ref={statusRef} defaultValue="To do">
                <option value="To do">To Do</option>
                <option value="Doing">Doing</option>
                <option value="Done">Done</option>
            </select>
            <button type="submit">Aggiungi Task</button>
        </form>
    </>
   )
}

export default AddTask;

