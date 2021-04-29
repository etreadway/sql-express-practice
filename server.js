const express = require("express");
const pgp = require("pg-promise")();
const db = pgp("postgres://azhfhwpn:5VPylMsT0XOBlEO8RxxKXAOjumxSDY6u@queenie.db.elephantsql.com:5432/azhfhwpn");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded());



app.listen(PORT, () => {
  console.log(`LikeyPix API is running on port ${PORT}`);
});
