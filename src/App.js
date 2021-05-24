import React, { useState, useEffect } from 'react';
import axios from 'axios';
import List from './components/List';
import withListLoading from './components/withListLoading';
import BookForm from './components/BookForm';

function App() {
  const ListLoading = withListLoading(List);
  const [appState, setAppState] = useState({
    loading: false,
    books: [],
    currentBookId: ''
  });

  useEffect(() => {
    setAppState({ loading: true });
    updateBooks();
  }, [setAppState]);

  const updateBooks = () => {
    console.log('updateed')
    axios.get('/api/books')
      .then(res => {
        setAppState({ loading: false, books: res.data });
      })
      .catch(console.log)
  }

  const selectExistingBook = (id) => {
    console.log(id)
    setAppState({
      ...appState,
      currentBookId: id
    })
  }

  const resetForm = () => {
    setAppState({
      ...appState,
      currentBookId: ''
    })
  }

  return (
    <div className='App container'>
      <div className='container'>
        <center><h1>My Contacts {appState.test}</h1></center>
      </div>
      <div className="row">
        <div className='list-container col-sm-6 col-xs-12'>
          <center><h2>Book List</h2></center>
          <ListLoading
            onEdit={selectExistingBook}
            onDelete={updateBooks}
            isLoading={appState.loading}
            books={appState.books} />
        </div>
        <div className='form col-sm-6 col-xs-12'>
          <center><h2>Book Form</h2></center>
          <BookForm
            onReset={resetForm}
            onSubmit={updateBooks}
            currentBookId={appState.currentBookId} />
        </div>
      </div>
      <footer>
        <div className='footer'>
          Built with{' '}
          <span role='img' aria-label='love'>
            💚
          </span>{' '}
          by Dair Baidauletov
        </div>
      </footer>
    </div>
  );
}

export default App;
