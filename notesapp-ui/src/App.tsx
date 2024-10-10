import { useState } from "react";
import "./App.css";

// give notes a type 
type Note = {
  id: number;
  title: string;
  content: string;
}

const App = () => {
  //
  // set states
  //
  // store all notes inside a state
  // and give note the Note type
  const [notes, setNotes] = useState<Note[]>([
    // initialize by adding dummy notes
    {
      id: 1,
      title: "note title 1",
      content: "content 1",
    },
    {
      id: 2,
      title: "note title 2",
      content: "content 2",
    }
  ]);

  // use state variables for form inputs - enables React to control those inputs
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // state variable for a selected note
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  //
  // set handlers
  //
  // handle a click on a note - accepts a note that the user clicked on
  // to actually know what the selected note (potentially up for a change) is
  const handleNoteClick = (note: Note) => {
    // no need to create a new note, just get the selected one
    // update title and content accordingly
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  // handle adding a note
  const handleAddNote = (
    // take in event as param, need to say this is of type FormEvent, otherwise TS will complain
    event: React.FormEvent
  ) => {
    // prevent from reloading the page upon submitting!
    event.preventDefault();
    // console.log("title is ", title)

    // create a new note
    const newNote: Note = {
      id: notes.length + 1,
      title: title,
      content: content
    }
    // update the state with this note,
    // pass new array - the (1st) one we just created and the rest of the notes
    setNotes([newNote, ...notes]);
    // clean up the submission forms for a nice UI
    setTitle("");
    setContent("");
  };


  // update a selected note
  const handleUpdateNote = (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    if(!selectedNote){
      return;
    }

    // actually update the note
    const updatedNote: Note = {
      id: selectedNote.id,
      title: title,
      content: content,
    }

    // map function runs thru an array and now we check if we need to update the note (if the id matched selected id)
    const updatedNotesList = notes.map((note)=>
      note.id === selectedNote.id // if matches
      ? updatedNote // update the note
      : note
    )
    // update the notes' state
    setNotes(updatedNotesList)
    // upfate the submission form's title and content
    setTitle("")
    setContent("")
    setSelectedNote(null)
  };

  // reset form
  const handleCancel = () =>{
    setTitle("")
    setContent("")
    setSelectedNote(null);
  }

  // delete a note
  const deleteNote = (
    event: React.MouseEvent,
    noteId: number
  ) => {
    event.stopPropagation();

    const updateNotes = notes.filter(
      (note) => note.id != noteId
    )
    setNotes(updateNotes)

  }

  return (
    <div className="app-container">
      {/* 
      // set up a form for notes 
      */}
      <form 
        className="note-form"
        // wire up the submit function to the form
        onSubmit={(event) => 
          selectedNote
          ? handleUpdateNote(event)
          : handleAddNote(event)
        }
      >
        {/* 
        // set up form inputs and text area
        */}
        <input 
          // title input - binded to the title state variable = whatever title state variable is
          // placeholder="title" required
          value={title}
          onChange={(event)=>
            setTitle(event.target.value)
          }
          placeholder="Title" required
        ></input>
        <textarea 
        // text area - binded to the content state variable
        // placeholder="Content" rows={10} required
          value={content}
          onChange={(event)=>
            setContent(event.target.value)
          }
        placeholder="Content" rows={10} required
        ></textarea>

        {selectedNote ? (
          // handle button logic depending if a note was selected or not 
          <div className="edit-buttons">
            <button type="submit">Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        ):(
          <button type="submit">Add Note</button>)}

        
      </form>

      {/* 
      Notes grid
      */}
      <div className="notes-grid">
        {notes.map((note)=>(
            //Display all notes using the markup below by means of the map function
            // Will run e.g. 4 times for 4 notes
            <div className="note-item"
              // add an existing note on a click
              onClick={() => handleNoteClick(note)}
            >
              <div className="notes-header">
                <button
                  // delete button
                  onClick={(event) => 
                    deleteNote(event, note.id)
                  }>x</button>
              </div>
              <h2>{note.title}</h2>
              <p>{note.content}</p>
            </div>
        ))}
      </div>
    </div>
  );
};

export default App;