const express = require('express');
const app = express();

const path = require('path');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

//========== Configuracion ==========
app.set('port', 8000);


// ========== Middleware - Funciones ==========
const indexCtrl = async(req, res, next) =>{
  try {
      res.send("Hola mundo");
  } catch (error) {
      next(error);
  }  
};

//========== Rutas ==========
app.get('/', indexCtrl);

app.all('*', (req, res) =>
    res.status(404).send("Error: resource not found or method not supported.")
);
// MW to manage errors:
app.use((error, req, res, next) => {
    console.log("Error:", error.message || error);
    res.redirect("/");
});

//========== Server started at port 8000 ==========
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
});