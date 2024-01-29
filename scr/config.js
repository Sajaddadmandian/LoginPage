const mongoose = require("mongoose");
const connect = mongoose.connect(
  "mongodb+srv://sjddadmandian:Sjdmmd7876@nodecurse.yrelwzs.mongodb.net/"
);
connect
  .then(() => {
    console.log("DataBase connected Successfully");
  })
  .catch(() => {
    console.log("Database cannot be coonected");
  });

const LoginSchena = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const collection = new mongoose.model("users", LoginSchena);

module.exports = collection;
