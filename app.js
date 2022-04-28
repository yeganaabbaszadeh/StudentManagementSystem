const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const dotenv = require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// To serve static files
app.use('/public', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');


// Database connection
const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});


conn.connect((err, connection) => {
    if (err) throw err;
    console.log('Connected to database')
});


var message = "";
var row = [];


// Creating routes
// Get all students list
app.get('/', (req, res) => {
    conn.query('SELECT * FROM students;', (err, rows) => {
        if (!err) {
            let removedUserMessage = req.query.removed;
            res.render('index', { rows, message: removedUserMessage });
        } else {
            console.log(err);
        }
        console.log('Data from students table: \n', rows);
    });
});

// Search students by firstname or lastname
app.post('/', (req, res) => {
    var searchTerm = req.body.search;
    conn.query('SELECT * FROM students WHERE firstname LIKE ? or lastname LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
        if (!err) {
            res.render('index', { rows });
        } else {
            console.log(err);
        }
        console.log('Data from students table: \n', rows);
    });
});

// Create new student
app.get('/add', (req, res) => {
    res.render('add', { row, message: message });
});

// Add new student
app.post('/add', (req, res) => {
    const { firstname, lastname, dateOfBirth, email, phoneNumber, department, status } = req.body;
    var searchTerm = req.body.search;
    conn.query('INSERT INTO students(firstname, lastname, dateOfBirth, email, phoneNumber, department, status) VALUES (?, ?, ?, ?, ?, ?, ?)', [firstname, lastname, dateOfBirth, email, phoneNumber, department, status], (err, rows) => {
        if (!err) {
            res.render('add', { row, message: 'New student record has been added successfully!' });
        } else {
            console.log(err);
        }
        console.log('Data from students table: \n', rows);
    });
});

// Edit student info
app.get('/edit/:id', (req, res) => {
    conn.query('SELECT * FROM students WHERE id = ? ;', [req.params.id], (err, rows) => {
        if (!err) {
            res.render('edit', { rows, message: message });
        } else {
            console.log(err);
        }
        console.log('Data from students table: \n', rows);
    });
});

// Update student info
app.post('/edit/:id', (req, res) => {
    const { firstname, lastname, dateOfBirth, email, phoneNumber, department, status } = req.body;
    var searchTerm = req.body.search;
    conn.query('UPDATE students SET firstname = ?, lastname = ?, email = ?, phoneNumber = ?, department = ? , status = ? WHERE id = ?;', [firstname, lastname, email, phoneNumber, department, status, req.params.id], (err, rows) => {
        if (!err) {
            conn.query('SELECT * FROM students WHERE id = ? ;', [req.params.id], (err, rows) => {
                if (!err) {
                    res.render('edit', { rows, message: 'Student record has been updated successfully!' });
                } else {
                    console.log(err);
                }
                console.log('Data from students table: \n', rows);
            });
        } else {
            console.log(err);
        }
        console.log('Data from students table: \n', rows);
    });
});

// View details
app.get('/view/:id', (req, res) => {
    conn.query('SELECT firstname, lastname, DATE_FORMAT(dateOfBirth, "%d %M %Y") AS `dateOfBirth`, email, phoneNumber, department, status FROM students WHERE id = ?', [req.params.id], (err, rows) => {
        if (!err) {
            res.render('view', { rows });
        } else {
            console.log(err);
        }
        console.log('Data from students table: \n', rows);
    });
});

// Delete student info
app.get('/delete/:id', (req, res) => {
    conn.query('DELETE FROM students WHERE id = ?', [req.params.id], (err, rows) => {
        if (!err) {
            let removedUserMessage = encodeURIComponent('Student record has been removed!');
            res.redirect('/?removed=' + removedUserMessage);
        } else {
            console.log(err);
        }
        console.log('Data from students table: \n', rows);
    });
});


app.listen(port, () => console.log(`Server is listening on port ${port}...`));

