const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const todoRoutes = require('./server/routes/todoRoutes');

const app = express();
const port = 1234;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use('/api', todoRoutes);


app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => console.log(`Server running on port ${port}`));
