//!used npm i dotenv , to use the .env file and store the file 
require("dotenv").config();
const {json} = require("body-parser");
const express = require("express");
const { get } = require("http");
const mongoose = require("mongoose");
const { stringify } = require("querystring");
//db import
const data = require("./database")
//? initilize express --> npm init , npm -i express .
//? body-parser is used to post request.
var body_parser = require("body-parser");
const booky = express();
booky.use(body_parser.urlencoded({ extended: true }));
booky.use(body_parser.json());
//? establishing the configuration
mongoose.connect(//*"mongodb+srv://kirito:kiritomongo1@shapeai.88mzu.mongodb.net/Booky?retryWrites=true&w=majority",
    process.env.Mongo_url 
    //process.env. gets all the files
//?this is the oldy way maam did and now it's updated + the link is now in the env files which is now safe . 
// {
    //     useNewUrlParser: true,
    //     useFindAndModify: false,
    //     usecreateIndex: true,
    //     useUnifiedTopology: true
    // }
).then(() => console.log("connection is established at mongoose "));

////////////////////////////////////////////////////////////////////////////////////////////////////
//TODO:GET ALL BOOKS
/*
*Route --> / 
*description : gets all the books . 
*access : public .
*parameter : None
*method : get 
*/
booky.get("/", (req, res) => {
    return res.json({books:data.books})
});
///////////////////////////////////////////////////////////////////////////
//TODO:get specific book
/*
*Route --> /isbn for eg ---> /12345book
*description : gets all the books . 
*access : private.
*parameter : isbn no
*method : get 
*/
booky.get("/book/:isbn", (req, res) => {
    const get_the_specific_book = data.books.filter((book) => book.ISBN === req.params.isbn);
    if (get_the_specific_book.length === 0) {
        return res.json({ error: `no books for ISBN of ${req.params.isbn}` })
    }
    return res.json({ book: get_the_specific_book })
});
///////////////////////////////////////////////////////////////////////////////////////
//? npx nodemon index.js ,, since we introduces nodemon self update is now possible , 
// !changed  the isbn route to books/isbn , and now the author is the new child route.
//TODO:get specific Author
/*
*Route --> /authors/author for.eg --> /authors/1
*description : gets specific author
*access : private.
*parameter : isbn no
*method : get 
*/
booky.get("/authors/:author", (req, res) => {
    const get_the_specific_author = data.authors.filter((author) => parseInt(author.id) === parseInt(req.params.author));
    if (get_the_specific_author.length === 0) { return res.json({ error: `could not find the author with the name ${req.params.author}` }) }
    return res.json({author : get_the_specific_author})
});
///////////////////////////////////////////////////////////////////////////////////////
//TODO:get book based on category
/*
*Route --> /c/:category      for.eg --> /c/tech
*description : gets specific author
*access : private. authorised
*parameter : category
*method : get , inbuilt function --> includes 
*/
//? includes checks 
booky.get("/c/:category", (req, res) => {
    const Get_specific_book = data.books.filter((book) =>
        book.category.includes(req.params.category)//checks inside the array in O[1]
    );
    if (Get_specific_book.length === 0) { return res.json({ error: `the book of ${req.params.category} genre is not present` })}
    return res.json({book: Get_specific_book})
});
///////////////////////////////////////////////////////////////////////////////////////
//TODO:get book based on language
/*
*Route --> /languages/:langueage     for.eg --> /language/en
*description : gets specific author
*access : private. authorised
*parameter : language
*method : get 
*/
booky.get("/languages/:lang", (req, res) => {
    const Get_specific_book = data.books.filter((book) =>
    book.language===req.params.lang
    );
    if (Get_specific_book.length === 0) { return res.json({ error: `the book of ${req.params.lang} language is not present` }) }
    return res.json({book: Get_specific_book})
});
///////////////////////////////////////////////////////////////////////////////////////
//TODO:get book based on book based on the isbn no .  
/*
*Route --> /book/isbn   |||  for.eg --> /book/mybook
*description : gets specific author
*access : private. authorised
*parameter : language
*method : get 
*/
booky.get("/book/:isbn", (req, res) => {
    const get_the_specific_book = data.books.filter((book) => book.ISBN === req.params.isbn);
    if (get_the_specific_book.length === 0) { return res.json({ error: `there is no book with the isbn no of ---> ${req.params.isbn}` }) }
    return res.json({ book: get_the_specific_book })
});

///////////////////////////////////////////////////////////////////////////////////////
//TODO:get all authors 
/*
*Route --> /authors   
*description : gets specific author
*access : private. authorised
*parameter : language
*method : get 
*/
booky.get("/authors", (req, res) => {
    return res.json({all_authors : data.authors})
});
///////////////////////////////////////////////////////////////////////////////////////
//TODO:get book based on authors , books , 
/*
*Route --> /authors/book/isbn   |||  for.eg --> /author/book/Mybook
*description : gets specific author
*access : private. authorised
*parameter : language
*method : get 
*/
    booky.get("/author/book/:isbn", (req, res) => {
        const Get_specific_book_by_author = data.authors.filter((author) => author.books.includes(req.params.isbn))
        if (Get_specific_book_by_author.length === 0) { return res.json({ error: `the author with book ${req.params.isbn} does not exist` }) }
        return res.json({author : Get_specific_book_by_author})
    });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//TODO:get all publications 
/*
*Route --> /publications   
*description : gets all publications 
*access : private. authorised
*parameter : none
*method : get 
*/
booky.get("/publications", (req, res) => {
    return res.json({publications:data.publication})
});
//////////////////////////////////////////////////////////////////////////////////
//TODO:ADD new books 
/*
*Route --> /new/book   
*description : adds a new book  
*access : private. authorised
*parameter : none
*method : post
*/
booky.post("/new/book", (req, res) => {
    //we'll pass the request from postman . 
    const new_book = req.body;
    data.books.push(new_book);
    return res.json({updated_books:data.books})
});
////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//TODO:ADD new author 
/*
*Route --> /new/author   
*description : adds a new author 
*access : private. authorised
*parameter : none
*method : post
*/
booky.post("/new/author", (req, res) => {
    //we'll pass the request from postman . 
    const new_author = req.body;
    data.authors.push(new_author);
    return res.json({ updated_authors: data.authors})
});
////////////////////////////////////////////////////////////////////////
//TODO:ADD new publication 
/*
*Route --> /new/publication   
*description : adds a new publication 
*access : private. authorised
*parameter : none
*method : post
*/
booky.post("/new/publications", (req, res) => {
    //we'll pass the request from postman . 
    const new_author = req.body;
    data.publication.push(new_author);
    return res.json({ updated_publications: data.publication})
});
////////////////////////////////////////////////////////////////////////
//TODO:update  publication and book  
/*
*Route --> /publications/update/book  
*description : adds a new publication 
*access : private. authorised
*parameter : /:isbn
*method : post
*/
booky.put("/publications/update/book/:isbn", (req, res) => {
    //?updating the publication database , 
    data.publication.forEach((pub) => {
        if (pub.id === req.body.pubId) {return pub.books.push(req.params.isbn) }
    });
    //?updating the book database
    data.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            book.publications = [req.body.pubId];
            return;
        }
    });
    return res.json({
        books: data.books,
        publications: data.publication,
        message:"successfully updated"
    })
});
////////////////////////////////////////////////////////////////////////
//TODO:delete a book  
/*
*Route --> /delete/book/:isbn  
*description : adds a new publication 
*access : private. authorised
*parameter : /:isbn
*method : post
*/
booky.delete("/book/delete/:isbn", (req, res) => {
    const update_book_in_database = data.books.filter((book) => {book.ISBN !==req.params.isbn});
    data.books = update_book_in_database;
    return res.json({books:data.books})
});
////////////////////////////////////////////////////////////////////////
//TODO:delete an author from a book & vice-versa.
/*
*Route --> /delete/:book/:author
*description : adds a new publication 
*access : private. authorised
*parameter : /:isbn, /; authorId
*method : post
*/
booky.delete("/book/delete/:isbn/:authorId", (req, res) => {
    data.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            const new_author_list = book.author.filter((author) => author !== parseInt(req.params.authorId));
            book.author = new_author_list;
            return;
        }
    });
    data.authors.forEach((author) => {
        if (author.id === parseInt(req.params.authorId)) {
            const new_book_list = author.books.filter((book) =>book !== req.params.isbn);
                author.books = new_book_list;
                return; 
            }
    });
    return res.json({
        books: data.books,
        author: data.authors,
        message: "Author and books were deleted successfully"
    });
});
//!listening done at the port
const port = 3000;
booky.listen(port, () => console.log(`server is up at port ${port}`));