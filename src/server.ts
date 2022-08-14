import express from "express";
const app = express();

const port = 8080;

app.get('/', (request, response) => {
    return response.json({message: 'Application is ready!'});
})

app.listen(port, () => {
    console.log(`😎 Server is running at port: ${port}`);
})