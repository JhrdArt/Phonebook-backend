require("dotenv").config();
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const password = process.env.PASSWORD;
const URL = `mongodb+srv://jhordart:${password}@cluster0.5tpgdom.mongodb.net/Phonebook?retryWrites=true&w=majority&appName=AtlasApp`;

const connectToDB = async () => {
  try {
    await mongoose.connect(URL);
    console.log(`Connected to MongoDB`);
  } catch (error) {
    console.log(`Error connecting to MongoDB: ${error.message}`);
  }
};

connectToDB();

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: [3, "Name is shorter than the minimum allowed length (3)."],
  },
  number: {
    type: String,
    required: true,
    minlength: [9, "Number is shorter than the minimum allowed length (9)."],
  },
});

// Apply the uniqueValidator plugin to the schema
personSchema.plugin(uniqueValidator);

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Persons", personSchema);
