require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./Models/person");
const { error } = require("qrcode-terminal");
app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).json({ error: "Mal formatted id" });
  }

  if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  return response.status(500).json({ error: "Internal server error" });
};

app.use(
  morgan((tokens, request, response) => {
    const method = tokens.method(request, response);
    const url = tokens.url(request, response);
    const status = tokens.status(request, response);
    const contentLength = tokens.res(request, response, "content-length");
    const responseTime = tokens["response-time"](request, response);
    const body = JSON.stringify(request.body);

    return [
      method,
      url,
      status,
      contentLength,
      "-",
      responseTime,
      "ms",
      body,
    ].join(" ");
  })
);

app.get("/", (request, response) => {
  response.send("<h1>BACKEND PHONEBOOK</h1>");
});

app.get("/api/persons", (request, response, next) => {
  Person.find({})
    .then((persons) => {
      response.json(persons);
    })
    .catch((error) => next(error));
});

app.get("/info", (request, response) => {
  response.send(
    ` <p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date()}</p>`
  );
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        return response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((person) => {
      if (person) {
        response.status(204).end();
      } else {
        response
          .status(404)
          .json({ error: `Person with id ${request.params.id} not found` });
      }
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "Name and number are required",
    });
  }

  if (body.name.length < 3) {
    return response.status(400).json({
      error: `Person validation failed: Path 'name' (${body.name}) is shorter than the minimum allowed length (3).`,
    });
  }

  if (body.number.length < 8) {
    return response.status(400).json({
      error: `Person validation failed: Path 'number' (${body.number}) is shorter than the minimum allowed length (3).`,
    });
  }

  Person.findOne({ name: body.name })
    .then((existingPerson) => {
      if (existingPerson) {
        return Person.findOneAndUpdate(
          { name: body.name },
          { number: body.number },
          { new: true }
        );
      } else {
        const person = new Person({
          name: body.name,
          number: body.number,
        });
        return person.save();
      }
    })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`El servidor está activo en el puerto: ${PORT}`);
});
