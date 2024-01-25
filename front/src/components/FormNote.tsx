import { FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable"
import { NoteData, Tag } from "../App";
import {v4 as uuidV4 } from 'uuid'

type NoteFormProps = {
  onSubmit : (data : NoteData) => void
  onAddTag : (tag : Tag) => void
  availableTags : Tag[]
}


const FormNote = ({ onSubmit, onAddTag, availableTags} : NoteFormProps) => {

  const titleRef = useRef<HTMLInputElement>(null)
  const markdownRef = useRef<HTMLTextAreaElement>(null)
  const [selectedTags, setSelecetedTags] = useState<Tag[]>([])
  const navigate = useNavigate()

  function handleSubmit (e : FormEvent){
    e.preventDefault()
    onSubmit({
      title : titleRef.current!.value,
      markdown : markdownRef.current!.value,
      tags : selectedTags
    })

    navigate('..')
  }

    return (
       <Form onSubmit={handleSubmit}>
        <Stack gap={4}>
          <Row>
            {/* TITLE INPUT */}
              <Col>
                <Form.Group controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control required ref={titleRef} name="title"/>
                </Form.Group>
              </Col>

              {/* TAGS INPUT */}
              <Col>
                <Form.Group controlId="tags"> 
                  <Form.Label>Tags</Form.Label>
                  <CreatableReactSelect 
                  onCreateOption={label => {
                    const newTags = {id : uuidV4(), label}
                    onAddTag(newTags)
                    setSelecetedTags(prev => [...prev, newTags])
                  }}
                  options={availableTags.map(tag => {
                    return {label : tag.label , value : tag.id}})
                  }
                  isMulti
                  value={selectedTags.map(tag => 
                    { return {label : tag.label, value : tag.id} }
                  )}
                  onChange={tags => setSelecetedTags(tags.map(tag =>
                    {return{label : tag.label, id : tag.value}})
                    )}
                  />
                </Form.Group>
              </Col>
          </Row>

            {/* TEXTAREA */}
            <Row>
              <Form.Group controlId="markdown"> 
                <Form.Label>Body</Form.Label>
                <Form.Control required as="textarea"  ref={markdownRef} rows={15}/>
              </Form.Group>
            </Row>

            <Stack direction="horizontal" gap={2} className="justify-content-end">
                <Button type="submit" > Save</Button>
                <Link to="..">
                  <Button type="button" variant="outline-secondary">Cancel</Button>
                </Link>
                
            </Stack>
          
          </Stack>
       </Form>  
    );
};

export default FormNote;