const express = require('express');
const {
    addBook,
    getAllBooks,
    getBook,
    updateBook,
    deleteBook
} = require('../controllers/bookController');

const router = express.Router();

router.post('/book', addBook);
router.get('/books', getAllBooks);
router.get('/book/:id', getBook);
router.put('/book/:id', updateBook);
router.delete('/book/:id', deleteBook);

module.exports = {
    routes: router
}