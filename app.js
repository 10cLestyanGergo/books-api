import express from "express";
import __dirname from "./util/rootpath.js"
import path from 'path'
import * as fileHandler from './util/filekezelo.js'

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))

app.get("/books", (req, res) => {
    const books = fileHandler.getData()
    res.json(books);
});

app.get("/books/:id", (req, res) => {
    const books = fileHandler.getData()
    const id = req.params.id;
    if (id < 0 || id >= books.length) {
        return res.json({})
    }
    res.json(books[id]);
});

app.post("/books", (req, res) => {
    const { author, title , year } = req.body;
    if (!author || !title||!year) {
        return res.json({message: 'Missimg some data'})
    }
    const newBook = { author,title, year }
    const books = fileHandler.getData()
    users.push(newBook);
    fileHandler.saveData(newBook)
    res.json(newBook)
});

app.put("/books/:id", (req, res) => {
    const id = req.params.id;
    const books = fileHandler.getData()
    if (id < 0 || id >= books.length) {
        return res.json({ message: "Book not found" })
    }
    const { author,title,year } = req.body;
    if (!author || !title || !year) {
        return res.json({message: 'Missimg some data'})
    }
    books[id] = { author,title, year }
    fileHandler.saveData(books)
    res.json(books[id])
});

app.patch("/books/:id", (req, res) => {
    const id = req.params.id;
    const books = fileHandler.getData()
    if (id < 0 || id >= books.length) {
        return res.json({ message: "Book not found" })
    }
    const { author, title,year } = req.body;
    books[id] = {
        author: author || books[id].author, 
        title: title || books[id].title,
        year: year || books[id].year
    }
    fileHandler.saveData(books)
    res.json(books[id])
});


app.delete("/books/:id", (req, res) => {
    const id = req.params.id;
    const books = fileHandler.getData()
    if (id < 0 || id >= books.length) {
        return res.json({ message: "Book not found" })
    }
    users.splice(id, 1)
    fileHandler.saveData(books)
    res.json({ message: "Delete successful" })
});

app.listen(3000, () => {
  console.log("Server runs on port 3000");
});