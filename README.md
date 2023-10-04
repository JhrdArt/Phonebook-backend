# Phonebook-backend
FULLSTACKOPEN PART-3 PHONEBOOK BACKEND

Este es el backend para una aplicación de agenda telefónica. Está construido con Node.js y Express, y utiliza una base de datos MongoDB a través de Mongoose para almacenar información sobre personas en la agenda telefónica.

Requisitos previos
Asegúrate de tener instalados los siguientes elementos en tu entorno de desarrollo:

Node.js
npm (administrador de paquetes de Node.js)
MongoDB

Configuración
Clona este repositorio en tu máquina local:

git clone https://github.com/tu_usuario/phonebook-backend.git
cd phonebook-backend

Instala las dependencias necesarias utilizando pnpm:
pnpm install

Crea un archivo .env en la raíz del proyecto y configura las variables de entorno necesarias. Puedes basarte en el archivo .env.example.
Uso
Para ejecutar el servidor, utiliza el siguiente comando:


pnpm dev
El servidor estará disponible en http://localhost:3001 (o el puerto que hayas configurado).

Endpoints de la API
GET /api/persons: Obtiene la lista de personas en la agenda telefónica.
GET /api/persons/:id: Obtiene información de una persona específica por su ID.
POST /api/persons: Crea una nueva entrada en la agenda telefónica.
DELETE /api/persons/:id: Elimina una persona de la agenda telefónica.

Contribuciones

Si deseas contribuir a este proyecto, ¡eres bienvenido! Si tienes sugerencias o encuentras problemas, crea un issue o envía un pull request.
