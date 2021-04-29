const express = require("express");
const pgp = require("pg-promise")();
const db = pgp("postgres://qomyoved:ZhyvOedvW_8knyyEzPqIhqORWtuxZ_ER@drona.db.elephantsql.com:5432/qomyoved");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded());

//CRUD Endpoints

//create
app.post('/foods', async (req, res) => {
  const ndb_no = req.body.ndb_no;
  const fdgrp_cd = req.body.fdgrp_cd;
  const long_desc = req.body.long_desc;
  const shrt_desc = req.body.shrt_desc;
  const survey = req.body.survey;
  const refuse = req.body.refuse;
  const n_factor = req.body.n_factor;
  const pro_factor = req.body.pro_factor;
  const fat_factor = req.body.fat_factor;
  const cho_factor = req.body.cho_factor;
  const comname = req.body.comname;
  const manufacname = req.body.manufacname;
  const ref_desc = req.body.ref_desc;
  const sciname = req.body.sciname;

  await db.none("insert into food_des (ndb_no, fdgrp_cd, long_desc, shrt_desc, survey, refuse, n_factor, pro_factor, fat_factor, cho_factor, comname, manufacname, ref_desc, sciname) Values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)",
    [
      ndb_no, fdgrp_cd, long_desc, shrt_desc, survey, refuse, n_factor, pro_factor, fat_factor, cho_factor, comname, manufacname, ref_desc, sciname
    ]);
  res.send('Food Description Created!');
});

//read
app.get('/foods', async (req, res) => {
  const ndb_no = req.body.ndb_no;
  const description = await db.one("SELECT * FROM food_des WHERE ndb_no = $1", [ndb_no])
    .then((description) => {
      return description;
    });
  res.send(description);
});

//update
app.put('/foods', async (req, res) => {
  const ndb_no = req.body.ndb_no;
  const fdgrp_cd = req.body.fdgrp_cd;
  const long_desc = req.body.long_desc;
  const shrt_desc = req.body.shrt_desc;
  const survey = req.body.survey;
  const refuse = req.body.refuse;
  const n_factor = req.body.n_factor;
  const pro_factor = req.body.pro_factor;
  const fat_factor = req.body.fat_factor;
  const cho_factor = req.body.cho_factor;
  const comname = req.body.comname;
  const manufacname = req.body.manufacname;
  const ref_desc = req.body.ref_desc;
  const sciname = req.body.sciname;

  await db.none("UPDATE food_des SET fdgrp_cd = $2, long_desc = $3, shrt_desc = $4, survey = $5, refuse = $6, n_factor = $7, pro_factor = $8, fat_factor = $9, cho_factor = $10, comname = $11, manufacname = $12, ref_desc = $13, sciname = $14 WHERE ndb_no = $1",
    [
      ndb_no, fdgrp_cd, long_desc, shrt_desc, survey, refuse, n_factor, pro_factor, fat_factor, cho_factor, comname, manufacname, ref_desc, sciname
    ]);
  res.send('Food Description Updated!');
});

//delete
app.delete('/foods', async (req, res) => {
  const ndb_no = req.body.ndb_no;

  await db.none('DELETE FROM food_des WHERE ndb_no = $1', [ndb_no]);
  res.send('Food Description Deleted!');
});




app.listen(PORT, () => {
  console.log(`LikeyPix API is running on port ${PORT}`);
});
