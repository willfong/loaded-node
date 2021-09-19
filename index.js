import express from "express";
import morgan from "morgan";

const app = express();
app.use(morgan("combined"));

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

app.get("/", (req, res)=>{
    res.send("Hello World!");
});

app.get("/sleep", async (req, res)=>{
    // Not useful for load testing.
    // It doesn't add any CPU load, just returns slower
    await sleep(1000)
    res.send("OK");
});

app.get("/count", (req, res)=>{
    // TODO: Find a better way to add CPU load
    let count = 0;
    for (let i = 0; i < 20000000; i++) {
        count += 1;
    }
    res.send(`Counted to: ${count}`);
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
