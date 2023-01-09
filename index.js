const path = require("path");

const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require('./routes/index.js')
require('./config/db.config');
const response = require("./utils/response");
const indexController = require("./controllers/index");

dotenv.config();




const options = {
  retryWrites: true,
  w: 'majority'
}
const port = process.env.PORT || 80

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use('/api', routes)
app.use("/", indexController.index);
app.use((req, res) => {
  response(
    res,
    "error",
    "Endpoint does not exist",
    [],
    404
  );
})
app.listen(port, () => {
  console.log("Listening on port " + port)
  app.emit('APP_STARTED')
})

module.exports = app
