const express = require('express');
const app = express();
const path = require('path'); // path 

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

//========== Configuracion ==========
app.set('port', 8000);


// ========== Middleware - Funciones ==========
const indexCtrl = async(req, res, next) => {
  try {
      res.sendFile(path.join(__dirname, 'views/login.html'));
  } catch (error) {
      next(error);
  }  
};

const showCtrl = async(req, res, next) => {
    try {
        let idUser = Number(req.body['idUser']);
        let pwdUser = Number(req.body['pwdUser']);

        console.log(idUser, pwdUser);
        res.sendFile(path.join(__dirname, 'views/user.html'));
    } catch (error) {
        next(error);
    }  
  };


//========== Rutas ==========
app.get('/', indexCtrl);
app.post('/user', showCtrl);

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