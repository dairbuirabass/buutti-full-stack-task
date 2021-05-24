import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BookForm(props) {
  const initialState = {
    title: '',
    author: '',
    description: ''
  }
  const { onReset, onSubmit, currentBookId } = props;

  const [item, setItem] = useState(initialState);

  useEffect(() => {
    if (currentBookId) {
      axios.get(`api/book/${currentBookId}`)
        .then(res => {
          setItem(res.data)
        })
        .catch(console.log)
    }
  }, [currentBookId]);

  const handleChange = (e) => {
    const value = e.target.value;
    setItem({
      ...item,
      [e.target.name]: value
    });
  }

  const handleCreate = (e) => {
    e.preventDefault();

    if (currentBookId) {
      setItem(initialState)
      onReset()
      return;
    }

    axios.post('api/book', item)
      .then(res => {
        updateBooks()
      })
      .catch(console.log)
  }

  const handleUpdate = (e) => {
    e.preventDefault();

    axios.put(`api/book/${currentBookId}`, item)
      .then(res => {
        updateBooks()
      })
      .catch(console.log)
  }

  const handleDelete = (e) => {
    e.preventDefault();

    axios.delete(`api/book/${currentBookId}`, item)
      .then(res => {
        updateBooks()
      })
      .catch(console.log)
  }

  const updateBooks = () => {
    setItem(initialState)
    onSubmit()
  }

  return (
    <div>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title:</label>
          <input id="title" onChange={handleChange} className="form-control" type="text" name="title" placeholder="For Whom the Bell Tolls" value={item.title} />
        </div>
        <div className="mb-3">
          <label htmlFor="author" className="form-label">Author:</label>
          <input id="author" onChange={handleChange} className="form-control" type="text" name="author" placeholder="Ernest Hemingway" value={item.author} />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Example textarea</label>
          <textarea onChange={handleChange} id="description" className="form-control" rows="3" name="description" placeholder="Set in 1937 during the Spanish Civil War, this book follows the struggles of an American college instructor..." value={item.description}></textarea>
        </div>
        <div className="btn-group" role="group" aria-label="Basic example">
          <input onClick={handleCreate} className="btn btn-outline-primary" type="button" value={!currentBookId ? 'Save new' : 'Start saving new book'} />
          <input onClick={handleUpdate} className="btn btn-outline-primary" disabled={!currentBookId} type="button" value="Save" />
          <input onClick={handleDelete} className="btn btn-outline-primary" disabled={!currentBookId} type="button" value="Delete" />
        </div>
      </form>
    </div>
  );
}

export default BookForm;