const express = require("express");
const app = express();
//console.dir(app);

// app.use((req, res) => {
//     console.log("We got a new request");
//     //res.send("Hello, we got your request! This is a response.");
//     res.send("<h1>This is my webpage</h1>");
// })

app.get("/", (req, res) => {
    res.send("Welcome to the Homepage");
})

app.get("/r/:subreddit", (req, res) => {
    const { subreddit } = req.params;
    res.send(`<h1>Browsing the ${subreddit} subreddit</h1>`);
})

app.get("/r/:subreddit/:postId", (req, res) => {
    const { subreddit, postId } = req.params;
    res.send(`<h1>Viewing Post ID: ${postId} on the ${subreddit} subreddit</h1>`);
})

app.post("/cats", (req, res) => {
    console.log("POST REQUEST TO /cats!!!!");
})

app.get("/cats", (req, res) => {
    res.send("MEOW!!");
})

app.get("/dogs", (req, res) => {
    res.send("WOOF!!");
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})

app.get("/search", (req, res) => {
    const { q } = req.query;
    if (!q) {
        res.send("Nothing found if nothing searched");
    }
    res.send(`<h1>Searched results for: ${q}</h1>`);
})

app.get("*", (req, res) => {
    res.send("I don't know that path!");
})

