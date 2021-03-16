const express = require('express');

const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/api', (req, res) => {
    res.json({
        'message': 'success'
    });
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});