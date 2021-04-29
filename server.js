const express = require("express");
const pgp = require("pg-promise")();
const db = pgp("postgres://azhfhwpn:5VPylMsT0XOBlEO8RxxKXAOjumxSDY6u@queenie.db.elephantsql.com:5432/azhfhwpn");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded());

//get all classes
app.get('/classes', async (req, res) => {
  const classes = await db.any("SELECT * FROM classes").then((classes) => {
    return classes;
  });
  res.send(classes);
});

//get all students
app.get('/students', async (req, res) => {
  const students = await db.any('SELECT * FROM students').then((students) => {
    return students;
  });
  res.send(students);
});

//get student by class id
app.get('/students/:id', async (req, res) => {
  const id = req.params.id;
  const students = await db.any('SELECT * FROM students WHERE class_id = $1', [id]).then((students) => {
    return students;
  }); 
  res.send(students);
});

//get all teachers
app.get('/teachers', async (req, res) => {
  const teachers = await db.any('SELECT * FROM teachers').then((teachers) => {
    return teachers;
  });
  res.send(teachers);
});

app.listen(PORT, () => {
  console.log(`LikeyPix API is running on port ${PORT}`);
});
