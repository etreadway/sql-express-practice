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

//get all classes by teacher id
app.get('/teachers/classes/:id', async (req, res) => {
  const teacherID = req.params.id
  const theClass = await db.any('SELECT * FROM classes ' 
                                + 'JOIN class_teacher ON classes.id = class_teacher.class_id ' 
                                + 'WHERE class_teacher.teacher_id = $1;', [teacherID])
                                .then((theClass) => {
                                  return theClass
                                });
  res.send(theClass);
});


//get all students
app.get('/students', async (req, res) => {
  const students = await db.any('SELECT * FROM students').then((students) => {
    return students;
  });
  res.send(students);
});

//get student by class id
app.get('/students/classes/:id', async (req, res) => {
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

//get class by id
app.get('/classes/:id', async (req, res) => {
  const id = req.params.id;
  const theClass = await db.one('SELECT * FROM classes where id = $1', [id])
    .then((theClass) => {
      return theClass;
    });
    res.send(theClass);
});






app.listen(PORT, () => {
  console.log(`Classroom API is running on port ${PORT}`);
});
