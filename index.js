const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

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

const persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Sahir Arteaga García",
    number: "+54 9 3543 64-1966",
    id: 5,
  },
];

//INICIO
app.get("/", (request, response) => {
  response.send("<h1>BACKEND PHONEBOOK</h1>");
});
//BASE DE DATOS API
app.get("/api/persons", (request, response) => {
  response.json(persons);
});
//INFORMACIÓN DE LA BASE DE DATOS
app.get("/info", (request, response) => {
  response.send(
    ` <p>Phonebook has info for ${persons.length} people</p>
      <p>${new Date()}</p>`
  );
});
//IMPLEMENTAR: BUSQUEDA POR ID
app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.filter((p) => p.id === id);
  if (person.length === 0) {
    return response.status(404).end();
  }
  response.json(person);
});
//IMPLEMENTAR: ELIMINAR POR ID
app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.filter((p) => p.id !== id);
  response.status(204).end();
});
//IMPLEMENTAR: GENERADOR DE NUEVO ID
const idGenerator = () => {
  const maxID = persons.length > 0 ? Math.max(...persons.map((p) => p.id)) : 0;
  return maxID + 100000;
};
//IMPLEMENTAR: POSTEAR NUEVO USUARIO
app.post("/api/persons", (request, response) => {
  const body = request.body;
  console.log(request.body);
  const name = persons.find((p) => body.name === p.name);

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "Name and number are required    ",
    });
  }
  if (name) {
    response.status(400).json({
      error: "Name must be unique",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: idGenerator(),
  };

  response.json([...persons, person]);
});

const PORT = 3001;
app.listen(PORT, () => {
  `El servidor está activo en el puerto: ${PORT}`;
});
