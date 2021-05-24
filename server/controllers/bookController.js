'use strict';

const firebase = require('../db');
const Book = require('../models/book');
const firestore = firebase.firestore();

const addBook = async (req, res, next) => {
  try {
    const data = req.body;
    await firestore.collection('books').doc().set(data);
    res.send('Record saved successfully.');
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const getAllBooks = async (req, res, next) => {
  try {
    const books = await firestore.collection('books');
    const data = await books.get();
    const booksArray = [];

    data.forEach(doc => {
      const book = new Book(
        doc.id,
        doc.data().title,
        doc.data().author,
        doc.data().description
      );
      booksArray.push(book);
    });
    res.send(booksArray);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const getBook = async (req, res, next) => {
  try {
    const id = req.params.id;
    const book = await firestore.collection('books').doc(id);
    const data = await book.get();
    if (!data.exists) {
      res.status(404).send('Book with the given ID not found');
    } else {
      res.send(data.data());
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const updateBook = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const book = await firestore.collection('books').doc(id);
    await book.update(data);
    res.send('Book record updated successfuly');
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const deleteBook = async (req, res, next) => {
  try {
    const id = req.params.id;
    await firestore.collection('books').doc(id).delete();
    res.send('Record deleted successfuly');
  } catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports = {
  addBook,
  getAllBooks,
  getBook,
  updateBook,
  deleteBook
}