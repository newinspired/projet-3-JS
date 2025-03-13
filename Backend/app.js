const express = require('express');
const path = require('path');
const cors = require('cors')
require('dotenv').config();
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express')
const yaml = require('yamljs')
const swaggerDocs = yaml.load('swagger.yaml')
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet({
      crossOriginResourcePolicy: false,
    }));
app.use('/images', express.static(path.join(__dirname, 'images')))

const db = require("./models");
const userRoutes = require('./routes/user.routes');
const categoriesRoutes = require('./routes/categories.routes');
const worksRoutes = require('./routes/works.routes');
db.sequelize.sync().then(()=> console.log('db is ready'));
app.use('/api/users', userRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/works', worksRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
module.exports = app;

//-----------------------------------------------------

function addWorksToGallery(works) {
  const gallery = document.getElementById("gallery");

  works.forEach(work => {
    const workElement = document.createElement("div");
    workElement.classList.add("work-item");

    const workImage = document.createElement("img");
    workImage.src = work.imageUrl;
    workImage.alt = work.title;  

    const workTitle = document.createElement("h3");
    workTitle.textContent = work.title;

    workElement.appendChild(workImage);
    workElement.appendChild(workTitle);

    gallery.appendChild(workElement);
  });
}

fetch("http://localhost:5678/api/works")
  .then(res => {
    if (!res.ok) {
      throw new Error('Erreur réseau : ' + res.status);
    }
    return res.json();
  })
  .then(json => {
    addWorksToGallery(json);
  })
  .catch(error => {
    console.error('Erreur:', error);
  });

  // const result = fetch ("http://localhost:5678/api-docs/#/default/get_works")

  // result 

  // fetch ("http://localhost:5678/api-docs/#/default/get_works") 
  // .then(res => console.log(res))
  
  // fetch("http://localhost:5678/api/works") 
  // .then(res => {
    // if (!res.ok) { 
      // ::throw new Error('Erreur réseau : ' + res.status); 
      // }
    // return res.json();
  // })
  // .then(json => console.log(json))
  // .catch(error => console.error('Erreur:', error));

  //

