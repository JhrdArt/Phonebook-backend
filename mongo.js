const mongoose = require("mongoose");

if (process.argv.length === 2) {
  console.log(
    "PLEASE PROVIDE A PASSWORD AS AN ARGUMENT, EXAMPLE: node mongo.js <password>"
  );
  process.exit();
}

const password = process.argv[2];
const url = `mongodb+srv://jhordart:${password}@cluster0.5tpgdom.mongodb.net/Phonebook?retryWrites=true&w=majority&appName=AtlasApp`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Persons", personSchema);

//LOGIC FOR FIND AND POST PERSON
if (process.argv.length === 5) {
  const person = new Person({ name: process.argv[3], number: process.argv[4] });

  person
    .save()
    .then((res) => {
      console.log(`Person ${res.name} saved whit number ${res.number}`);
      mongoose.connection.close();
    })
    .catch((error) => {
      console.error(`Error saving person: ${error}`);
      mongoose.connection.close();
    });
} else if (process.argv.length === 4) {
  console.log("Please provide both a name and a number.");
  mongoose.connection.close();
} else {
  Person.find({})
    .then((res) => {
      console.log("Phonebook:");
      res.forEach((person) => {
        console.log(`${person.name} ${person.number}`);
      });
      mongoose.connection.close();
    })
    .catch((error) => {
      console.error("Error fetching phonebook:", error);
      mongoose.connection.close();
    });
}

// mongoose
//   .connect(url)
//   .then(() => {
//     console.log(`Database connected...`);

//     if (process.argv.length === 3) {
//       Person.find({}).then((persons) => {
//         console.log(`Phonebook:`)
//         persons.forEach((person) => console.log(person));
//       });
//       return new Promise.resolve();
//     } else if (process.argv.length === 5) {
//       const name = process.argv[3];
//       const number = process.argv[4];

//       const newPerson = new Person({
//         name,
//         number,
//       });
//       return newPerson.save();
//     }
//   })
//   .then((newPerson) => {
//     if (newPerson) {
//       console.log(
//         `Added ${newPerson.name} number ${newPerson.number} phonebook`
//       );
//     }
//     mongoose.connection.close();
//   });
// else {
//     console.log(`Please provide both a name and a number`);
//     mongoose.connection.close();
//   }

// const person = new Person({
//   name: "Jhord Arteaga",
//   number: "91727247",
// });

// person.save().then((result) => {
//   console.log(`Person saved`);
//   mongoose.connection.close();
// });
