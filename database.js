const books = [
    {
        ISBN: "12345book",
        title: "getting started with MERN",
        language: "en",
        pubdate:"2021-11-26",
        numPage:250,
        author:[1],
        publications:[1],
        category:["tech","programming","education"]
    },
    {
        ISBN: "1234",
        title: "doge coin",
        language: "en",
        pubdate:"2021-11-26",
        numPage:250,        
        author:[2],
        publications:[1],
        category:["tech","programming","education"]
    }
];
const authors = [
    {
        id: 1,
        name: "aradhna maam, cringe",
        books : ["12345book"]
    },
    {
        id: 2,
        name: "elon tusk",
        books:["1234"]
    }
];
const publication= [
    {
        id: 1,
        name: "Writex",
        books: ["12345book"]
    },
    {
        id: 2,
        name: "Writex2",
        books: []
    }
];
module.exports = {books,authors,publication};