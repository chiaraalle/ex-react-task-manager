import { useRef, useState, useMemo } from "react";

 const symbols = "!@#$%^£&/*()-_=+[]{}|;:',.<>?/`~";


function AddTask(){

    //input non controllato
    const [title, setTitle] = useState('');
    //input controllato
    const descriptionRef = useRef();
    const statusRef = useRef();

    //validazione nome non può essere vuoto. No simboli speciali.
    const isTitleValid= useMemo(() => {
        if (!title.trim()) return 'Il campo Nome della task non può essere vuoto!';

        if([...title].some(char => symbols.includes(char))) return 'Il nome della task non può contenere simboli'
        return '';

    }, [title])

    const handleSubmit= (e) => {
        e.preventDefault();

        const description = descriptionRef.current.value;
        const status = statusRef.current.value;

        if ( !description || !status  || isTitleValid) {
            alert('Per favore compila tutti i campi correttamente');
            return;
        }

        console.log({
            title,
            description,
            status
        });

        // Reset del campo controllato
        setTitle('');

        // Reset dei campi non controllati
        descriptionRef.current.value = '';
        statusRef.current.value = 'Todo'; 
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
            <select name="stato" ref={statusRef} defaultValue="Todo">
                <option value="Todo">To Do</option>
                <option value="Doing">Doing</option>
                <option value="Done">Done</option>
            </select>
            <button type="submit">Aggiungi Task</button>
        </form>
    </>
   )
}

export default AddTask;

/*

Aggiornare la pagina AddTask.jsx per contenere un form con i seguenti campi:

Nome del task (title) → Input controllato (useState).
Descrizione (description) → Textarea non controllata (useRef).
Stato (status) → Select non controllata (useRef), 
con opzioni "To do", "Doing", "Done", e valore predefinito "To do".

Validare il campo Nome (title):

Il campo non può essere vuoto.
Non può contenere simboli speciali.
Se il valore è errato, mostrare un messaggio di errore.
Utilizzare una costante con i caratteri vietati:
const symbols = "!@#$%^&*()-_=+[]{}|;:'\\",.<>?/`~";
Gestione del Submit del Form:

Al click del bottone "Aggiungi Task",
 il form deve SOLO stampare in console l’oggetto task con i valori inseriti 
 (NON deve ancora essere inviata la richiesta all’API).
*/