const express = require('express')
var phantom = require('phantom');  
const { v4: uuidv4 } = require('uuid'); 

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/test', (req, res) => {
    try {
        phantom.create().then(function(ph) {
            ph.createPage().then(function(page) {
                page.open("http://www.google.com").then(function(status) {
                    page.render('pdf/'+uuidv4()+'test.pdf').then(function() {
                        console.log('Page Rendered');
                        ph.exit();
                    });
                });
            });
        });
        res.send('Done!')
    } catch (error) {
        res.send('Error!'+ error.toString())
    }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})