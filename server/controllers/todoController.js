const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../data/todos.json');


function getTodos(req, res) {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read todos' });
    res.status(200).json(JSON.parse(data));
  });
}

function getTodoById(req, res) {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read todos' });
    const todos = JSON.parse(data);
    const todo = todos.find((t) => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).send('Todo not found');
    res.status(200).json(todo);
  });
}

// Add a new todo
function createTodo(req, res) {
  const newData = req.body;
  newData.id = Math.floor(Math.random() * 1000000);
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read todos' });
    const todos = JSON.parse(data);
    todos.push(newData);
    fs.writeFile(dataPath, JSON.stringify(todos), (err) => {
      if (err) return res.status(500).json({ error: 'Failed to save todo' });
      res.status(201).json(newData);
    });
  });
}

// Update an existing todo
function updateTodoById(req, res) {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read todos' });
    const todos = JSON.parse(data);
    const todoIndex = todos.findIndex((t) => t.id === parseInt(req.params.id));
    if (todoIndex === -1) return res.status(404).json({ msg: 'Todo not found' });

    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ msg: 'Title and description are required to update.' });
    }

    todos[todoIndex].title = title;
    todos[todoIndex].description = description;
    fs.writeFile(dataPath, JSON.stringify(todos), (err) => {
      if (err) return res.status(500).json({ error: 'Failed to save updated todo' });
      res.status(200).json(todos[todoIndex]);
    });
  });
}

// Delete a todo by ID
function deleteTodoById(req, res) {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read todos' });
    const todos = JSON.parse(data);
    const todoIndex = todos.findIndex((t) => t.id === parseInt(req.params.id));
    if (todoIndex === -1) return res.status(404).send('Todo not found');
    todos.splice(todoIndex, 1);
    fs.writeFile(dataPath, JSON.stringify(todos), (err) => {
      if (err) return res.status(500).json({ error: 'Failed to delete todo' });
      res.status(200).send();
    });
  });
}

module.exports = {
  getTodos,
  getTodoById,
  createTodo,
  updateTodoById,
  deleteTodoById
};
