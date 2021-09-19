import express from "express";
import morgan from "morgan";

const app = express();
app.use(morgan("combined"));

app.get("/", (req, res)=>{
    res.send("Hello World!");
});

app.get("/error", (req, res)=>{
    throw new Error("This page errored intentionally.");
});

app.use((req, res)=>{
    res.status(404).send("404 - File not found");
})

app.use((error, req, res, next)=>{
    console.log(`Error at: ${req.url}`);
    console.log(error);
    res.status(500).send("500 - Internal server error");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Service listening on port: ${PORT}`));
