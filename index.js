import axios from "axios";
import bodyParser from "body-parser";
// import cheerio from "cheerio";
import express from "express";
import open from "open";
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const apiKey = "603fcd734af94d2dbe0304a0f3ec841c";
app.get('/', async(req,res) =>{
    // res.render("index.ejs");
    try {
        const result = await axios.get(`https://newsapi.org/v2/everything?q=apple&from=2024-02-09&to=2024-02-09&sortBy=popularity&apiKey=${apiKey}`);
        res.render("index.ejs", {
            json:result.data
        });
        // console.log(result.data);
        // console.log(result.data.articles[0].title);
      } catch (error) {
        if(error.response){
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);}
        else if(error.requiest){
            console.log(err.requiest);
        }else{
            console.log("Error", err.mesaage);
        }

        res.status(500);
      }
});
  app.get('/articles/:id', async (req, res) => {
    try {
      // Fetch the HTML content from the external URL
      const index  = req.params; 
      console.log(index.id);
      const result = await axios.get(`https://newsapi.org/v2/everything?q=apple&from=2024-02-09&to=2024-02-09&sortBy=popularity&apiKey=${apiKey}`);
      const article = result.data.articles[index.id];
    //   const response = await axios.get(article.url);
  
    //  Parse the HTML content into a DOM object using jsdom
    //   const dom = new JSDOM(response.data, {
    //     url: article.url,
    //   });
    //   console.log(dom);
    await open(article.url);
    console.log(`Opened ${article.url} in the default web browser.`);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  app.post('/', async(req,res) =>{
    // res.render("index.ejs");
    let search = req.body.search;
    try {
        const result = await axios.get(`https://newsapi.org/v2/everything?q=${search}&sortBy=popularity&apiKey=${apiKey}`);
        res.render("newsSearch.ejs", {
            json:result.data
        });
        // console.log(result.data);
        // console.log(result.data.articles[0].title);
      } catch (error) {
        if(error.response){
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);}
        else if(error.requiest){
            console.log(err.requiest);
        }else{
            console.log("Error", err.mesaage);
        }

        res.status(500);
      }
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });