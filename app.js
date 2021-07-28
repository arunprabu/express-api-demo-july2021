const express = require('express'); // importing express js module 
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cors());

// handling /api over GET method
app.get('/api', (req, res) => {
  console.log('hitting http://localhost:3000/api');
  // req - will give you req obj 
  res.send(`
    <html>
      <head>
        <title>Welcome to my API List</title>
      </head>
      
      <body>
        <h1>Welcome to my Express js Based api's!</h1>
        <a href="http://localhost:3000/api/users">Users - GET -- Will return Array of User object</a> <br><br>
        <a href="http://localhost:3000/api/users">Users - POST -- Expects: fullName, email, phone</a> <br><br>
        <a href="http://localhost:3000/api/users/1">Users/:id - GET -- Will return User Object</a> <br><br>
        <a href="http://localhost:3000/api/users/1">Users/:id - PUT -- Expects fullName, email, phone -- returns Status Object</a> <br><br>
        <a href="http://localhost:3000/api/users/1">Users/:id - DELETE -- returns Status Object</a>
      </body> 

    </html>
  `);
});

// handling api/users over GET method 
app.get('/api/users', (req, res) => {

  console.log(req);

  // connect with db and exec query
  let usersList = [
    {
      id: 1,
      fullName: 'Arun vj',
      phone: 2343453453,
      email: 'a@b.com'
    },
    {
      id: 2,
      fullName: 'John',
      phone: 34234,
      email: 'b@c.com'
    },
    {
      id: 3,
      fullName: 'Peter',
      phone: 324243532,
      email: 'c@d.com'
    }
  ];
  res.json(usersList);
});

// create user - api/users over POST method 
app.post('/api/users', (req, res) => {
  console.log(req.body); // form data
  res.status(201)
    .json({
      data: req.body,
      status: 'Saved Successfully!'
    });
});

// read -- api/users/:id over GET method
app.get('/api/users/:id', (req, res) => { // id-- is URL Param
  console.log(req.params);
  res.json({
    id: req.params.id,
    fullName: 'Arun vj',
    phone: 2343453453,
    email: 'a@b.com'
  });
});

// update -- api/users/:id over PUT method
// TODO: learn about patch method
app.put('/api/users/:id', (req, res) => {
  // you need URL param -- req.params.id 
  // updatable data -- req.body
  console.log(req.params.id);
  console.log(req.body);

  res.json({
    data: {
      id: req.params.id,
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone
    },
    status: 'Updated Successfully!'
  });
});

// delete 
app.delete('/api/users/:id', (req, res) => {
  console.log(req.params.id);
  res.json({
    status: 'Deleted Successfully!'
  });
});





const PORT = 3000;
app.listen(PORT, () => {  // creating server to listen on port 3000
  console.log('ExpressJS Based REST API is running on http://localhost:3000');
});