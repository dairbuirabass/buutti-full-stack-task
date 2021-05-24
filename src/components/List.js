import React from 'react';
import axios from 'axios';

const List = (props) => {
  
  const handleDelete = (id) => {	
    console.log(id)
    axios.delete(`api/book/${id}`)
      .then(res => {
        onDelete()
        console.log('Deleted')
      })
      .catch(console.log)
  }

  const { onEdit, onDelete, books } = props;
  if (!books || books.length === 0) return <p>No books in the database, sorry</p>;
  return (
    <div>
      {books.map((book) => {
        return (
          <div key={book.id} className="card mb-2">
            <div onClick={() => onEdit(book.id)} className="card-body">
              <h5 className="card-title">{book.title}</h5>
              <h6 className="card-subtitle mb-2 text-muted">by {book.author}</h6>
              <p className="card-text">{book.description}</p>
            </div>
            <div className="btn-group" role="group" aria-label="Basic example">
              <button onClick={() => onEdit(book.id)} className="btn btn-outline-primary">Edit</button>
              <button onClick={() => handleDelete(book.id)} className="btn btn-outline-primary">Delete</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default List;