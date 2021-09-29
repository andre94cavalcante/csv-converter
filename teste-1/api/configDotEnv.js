const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  MONGO_URL_REMOTE: process.env.MONGO_URL_REMOTE,
  MONGO_URL_LOCAL: process.env.MONGO_URL_LOCAL,
};
