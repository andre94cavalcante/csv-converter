const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const api = require("./api/api");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

api(app);

app.listen(port, () => console.log(`Server is listening on port ${port}!`));
