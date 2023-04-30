const PORT = 8000;
const express = require ('express');
const cors = require ('cors');
const app = express(); 
app.use(express.json()); //send from front end to back end with POST cmds. V
app.use(cors());

require("dotenv").config();
const { Configuration, OpenAIApi } = require ("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// the below will map to localhost:8000/completions. This is our "route"
app.post('/completions', async (req, res) => {
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${openai.configuration.apiKey}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model : "gpt-3.5-turbo",
            messages: [{ role: "user", content: req.body.message}], //send user input over to openAI
            max_tokens: 100, 
        })
    }
    try{
        const response = await fetch('https://api.openai.com/v1/chat/completions', options); //fetch requires certain version of node.js...
        const data = await response.json();
        res.send(data); //send to localhost:8000/completions
    }
    catch{
        console.error(error);
    }
})

app.listen(PORT, () => console.log('Your server is running on PORT ' + PORT)); //callback function
  