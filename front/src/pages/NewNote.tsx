import { NoteData, Tag } from "../App";
import FormNote from "../components/FormNote";

type NewNotePros = {
    onSubmit : (data : NoteData) => void
    onAddTag : (tag : Tag) => void
    availableTags : Tag[]
}

const NewNote = ({onSubmit, onAddTag, availableTags} : NewNotePros) => {
    return (
        <div>
            <h1 className="mb-4">New Notes</h1>

            <FormNote onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags}/>
        </div>
    );
};

export default NewNote;