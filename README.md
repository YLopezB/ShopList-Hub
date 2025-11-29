🛒 Plataforma Web para Pedidos en Negocios de Barrio
React + TypeScript + Express + MongoDB

📘 Descripción del Proyecto

Esta aplicación web busca mejorar la gestión de pedidos en negocios de barrio como tiendas, panaderías o minimercados.
Los clientes pueden crear listas de compras desde casa y enviarlas al comercio para que sus pedidos estén listos para recoger.

La solución contribuye a la digitalización de pequeños comercios, optimiza tiempos y mejora la experiencia tanto de clientes como de comerciantes.

📌 Estado Actual (Entrega Parcial)

🚨 En esta fase solo se entrega el módulo de Login totalmente funcional.

Incluye:

Inicio de sesión conectado al backend

Validación de usuario

Generación y verificación de tokens JWT

Estructura base del proyecto para seguir desarrollando

🧰 Tecnologías Utilizadas
Frontend

Next

TypeScript

Vite

TailwindCSS (si aplica)

Backend

Node.js

Express

TypeScript

JWT

Mongoose

Base de datos

MongoDB

MongoDB Atlas (cloud)

o MongoDB Community (local)

📦 Requisitos Previos

Debe tener instalado:

✔ Node.js + npm

https://nodejs.org/

✔ Git

https://git-scm.com/downloads

✔ MongoDB

MongoDB Atlas (recomendado):
https://www.mongodb.com/atlas/database

MongoDB Community Server (local):
https://www.mongodb.com/try/download/community

📁 Estructura del Proyecto
/backend        → API en Express + TypeScript
/frontend       → Aplicación web en React + TypeScript
README.md

🚀 Instalación y Ejecución

Clonar el repositorio:

git clone <url-del-repositorio>
cd <nombre-del-proyecto>

🖥️ Backend (Express + TypeScript)

Entrar en la carpeta:

cd backend


Instalar dependencias:

npm install


Crear archivo .env:

PORT=4000
MONGO_URI=<cadena-de-conexion-a-mongodb>
JWT_SECRET=<tu-secreto>


Ejecutar en modo desarrollo:

npm run dev


Ejecutar en producción:

npm run build
npm start

💻 Frontend (React + TypeScript)

Entrar en la carpeta del frontend:

cd ../frontend


Instalar dependencias:

npm install


Ejecutar el proyecto:

npm run dev


Por defecto estará en:

http://localhost:5173

🌐 Objetivo del Proyecto

Desarrollar una aplicación web que permita a los clientes enviar pedidos anticipados a negocios de barrio, mejorando la gestión y la atención al cliente.

🎯 Objetivos Específicos

Crear una interfaz web intuitiva para los clientes.

Diseñar un módulo administrativo para comerciantes.

Reducir los tiempos de espera y mejorar la eficiencia.

Garantizar la seguridad y privacidad de la información.

Evaluar la usabilidad del sistema en entornos reales.

🏗️ Arquitectura General
React + TS (frontend)
        ↓
Express + TS (API REST)
        ↓
MongoDB (Atlas o local)


Autenticación mediante JWT.

👨‍💻 Equipo de Desarrollo

Yeison Andrés López Burbano

Cristian Alfonso Maiguel Orozco

Yeison Berbesi Chapeta

Proyecto académico para:
Electiva Disciplinar II – Desarrollo de Aplicaciones Web
Corporación Universitaria Iberoamericana
Docente: Joaquín Sánchez
