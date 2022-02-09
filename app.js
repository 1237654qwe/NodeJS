const express = require('express');
const bodyParser = require('body-parser');
const mainRouter = require('./routes/routes');

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/', mainRouter);

app.listen(port, () => {
  console.log(`App port ${port}`);
});