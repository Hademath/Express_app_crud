import { error } from 'console';
import express, {Request, Response, NextFunction } from 'express';
// var express = require('express');
import fs, { writeFile } from "fs";
import path from 'path';
import{ Books } from './interface'
const router = express.Router();
const Joi = require('joi'); // this need to be install and require for editing purpose
let books = require("../../database.json")

let filePath = path.join(__dirname, '../../database.json');
//  import {interface } from "interface";
//const Writable = fs.appendFile(join.path(__dirname) 'database.json',  {encoding : 'utf8'})
const Readable = fs.readFileSync('database.json', {encoding : 'utf8'});

/* GET home page. */
router.get('/', function(req:Request, res:Response, next:NextFunction) {
  // res.render('index', { title: 'Express' });
    res.send(books)
});

  /* get specific book by id . */
  router.get('/:id', function(req:Request, res:Response, next:NextFunction) {
    
    const getabook = books.find(( getbook:Books)=> getbook.bookId === parseInt(req.params.id));
    if (!getabook) return res.status(404).send("The book with the id  was not found");    


    res.send(getabook)
 });


/* post books page. */
router.post('/', function(req:Request, res:Response, next:NextFunction) {
   
     const newBook :Books = {
        Title: req.body.Title,
        Author: req.body.Author,
        datePublished: req.body.datePublished,
        Description: req.body.Description,
        pageCount: req.body.pageCount,
        Genre: req.body.Genre,
        bookId: books.length + 1,
        Publisher: req.body.Publisher,

     }
     books.push(newBook);
     writeToDatabase(filePath, books)
     res.send(newBook);
  
  });


  /* Edit  book page. */
router.put('/:id', function(req:Request, res:Response, next:NextFunction) {
    const book = books.find((getabook: Books)=> getabook.bookId === parseInt(req.params.id));
    if (!book) return res.status(404).send('The book with the given ID was not found.');    
      let body = req.body;
      let output = updateBook(book, body);
      writeToDatabase(filePath, books)
     res.send(output);
 
 });



  /* Delete  book page. */
  router.delete('/:id', function(req:Request, res:Response, next:NextFunction) {
    const book = books.find((deleteabook: Books)=> deleteabook.bookId === parseInt(req.params.id));
    
    if (!book) return res.status(404).send('The book with the given ID was not found.');    
    const index = books.indexOf(book)
    books.splice(index, 1)
    //   let output = (book, body);
      writeToDatabase(filePath, books)
     res.send(books);
 
 });
/* Validation books home page. */
// router.post('/editbooks', function(req:Request, res:Response, next:NextFunction) {
//     const schema = {
//         title: Joi.string().min(3).require();
//     }
//     const result = Joi.validate(req.body, schema)
//   if(!req.body.title || req.body.name.length <3){
//       //404 bad error
//       res.status(400).send("the book you request to edit is not available")
//       return
//   }

//     res.send(path.join(database.json, 'utf8'));
  
//   });

function writeToDatabase(data:string, content:any){
    writeFile(data, JSON.stringify(content, null, 3), (err)=>{
        if(err) return error
    })
}

function updateBook(book: Books, updatedBook: Books) {
    book.Title = updatedBook.Title ? updatedBook.Title : book.Title
    book.Author = updatedBook.Author ? updatedBook.Author : book.Author
    book.datePublished = updatedBook.datePublished? updatedBook.datePublished: book.datePublished
    book.Description = updatedBook.Description? updatedBook.Description: book.Description
    book.pageCount = updatedBook.pageCount? updatedBook.pageCount   : book.pageCount
    book.Genre = updatedBook.Genre ? updatedBook.Genre : book.Genre
    book.Publisher = updatedBook.Publisher ? updatedBook.Publisher : book.Publisher
    book.dateEdited = Date.now().toString()
    return book
  }

//   function delete_Book(book:Books, deleteBook:Books ){
//     book.Title = deleteBook.Title ? deleteBook.Title : book.Title
//     book.Author = deleteBook.Author ? deleteBook.Author : book.Author
//     book.datePublished = deleteBook.datePublished? deleteBook.datePublished: book.datePublished
//     book.Description = deleteBook.Description? deleteBook.Description: book.Description
//     book.pageCount = deleteBook.pageCount? deleteBook.pageCount   : book.pageCount
//     book.Genre = deleteBook.Genre ? deleteBook.Genre : book.Genre
//     book.Publisher = deleteBook.Publisher ? deleteBook.Publisher : book.Publisher
//     return book
//   }
export default  router;
