const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./db');
const mainRouter = require('./routes/routes');

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/', mainRouter);

sequelize.sync({ force: true });

app.listen(port, () => {
  console.log(`App port ${port}`);
});