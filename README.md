# MERN Stack Invoicing Application
Built with the MERN stack (MongoDB, Express, React and NodeJS).

----

* [Introduction](#introduction)
* [Key Features](#key-features)
* [Technologies used](#technologies-used)
    - [Client](#client)
    - [Server](#server)
    - [Database](#database)
* [Configuration and Setup](#configuration-and-setup)
* [Author](#author)

## Introduction
This is a side project I've been working on. At the moment, I am integrating an online store option into it, in the future I will write an admin. part and maybe there will be some other ideas. This project is something I've been working on in my free time so I cannot be sure that everything will work out correctly. But I'll appreciate you if can report any issue or any recommendations.

## Key Features

- User registration.
- Authentication using jsonwebtoken (jwt)
- Creating a shopping cart with user products
- Adding and removing items from the shopping cart
- Home, About Us, Registration, About Product Pages


## Technologies used
This project was created using the following technologies.

#### Client

- React JS
- MobX (for managing and centralizing application state)
- React-router-dom (To handle routing)
- Axios (for making api calls)
- Ant Design (for User Interface)

#### Server

- Express
- Mongoose
- JWT (For authentication)
- bcrypt (for data encryption)
- Nodemailer (for sending invoice via email)

#### Database
MongoDB

## Configuration and Setup
In order to run this project locally, simply fork and clone the repository or download as zip and unzip on your machine.
- Open the project in your prefered code editor.
- Go to terminal

In the terminal
- Create a .env file in the root directory.
- Supply the following credentials

```
PORT=5000
DOMAIN_URL=localhost
DB_URL=
JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
API_URL=http://localhost:5000
CLIENT_URL=http://localhost:8080
VITE_API_URL=http://localhost:5000/api

```
```

$ yarn install (to install server and front-end side dependencies)
& yarn start (to start the monorepository)

```


## Comment
I am currently actively developing and intend to continue to actively develop this application


## Author

- Github: [PasichnykTetiana](https://github.com/PasichnykTetiana)
- Linkedin: [PasichnykTetiana](https://www.linkedin.com/in/pasichnyk-tetiana/)
- Email: [PasichnykTetiana](mailto:tetiana.pasichnyk.91@gmail.com)