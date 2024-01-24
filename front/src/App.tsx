import 'bootstrap/dist/css/bootstrap.min.css';
import { useMemo } from 'react';
import { Container } from 'react-bootstrap';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useLocalStorage } from './hooks/useLocalStorage';
import EditNote from './pages/EditNote';
import NewNote from './pages/NewNote';

export type Note = {
  id : string
} & NoteData

export type NoteData = {
  title : string,
  markdown : string,
  tags : Tag[]
}


export type Tag = {
  id : string,
  label : string 
}

// Store ID of the Tag
export type RawNote = {
  id : string 
} & RawNoteData

export type RawNoteData = {
  title : string,
  markdown : string,
  tagIds : string[]
}


function App() {

  const [notes, setNotes] = useLocalStorage<RawNote[]>('NOTES', []);
  const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', [])

  // The useMemo hook takes two arguments:
  // The first argument is a function that computes the memoized value.
  // The second argument is an array of dependencies. The memoized value will only be recalculated if any of these dependencies change.

  const noteWithTags = useMemo(() => {
    return notes.map(note => {
      // it maps over each note in the notes array and creates a new object for each note. The new object includes all properties of the original note (...note) and adds a tags property.
      return {...note, tags : tags.filter(tag => note.tagIds.includes(tag.id))}
      // it maps over each note in the notes array and creates a new object for each note. The new object includes all properties of the original note (...note) and adds a tags property.
    })
  }, [tags, notes])

  return (
    <Container className='my-4'>
      <Routes>
      <Route path='/' element={<h1>Hello</h1>}/>
      <Route path='/new' element={ <NewNote/> }/>

      <Route path='/:id'>
        <Route index element={<h1>Show</h1>}/>
        <Route path='edit' element={ <EditNote/> }/>
      </Route>

      <Route path='*' element={ <Navigate to='/'/> }/>
    </Routes>
    </Container>
    
    
  )
}

export default App
