const result = require('dotenv').config()
var jwt = require('jsonwebtoken');

if (!result.parsed.JWT_SECRET) {
    let error_dotenv_JWT = 'No se ha encontrado la variable de entorno: "JWT_SECRET". \n';
    throw error_dotenv_JWT //Error al leer variable JWT_SECRET en .env
}

function checkLevel(rolToken) {
    if (rolToken == 'director') {
        console.log('Es director');
    } else if (rolToken == 'profesor'){
        console.log('Es profesor');
    }else{
        console.log("Es root")
    }
}

function check(token) {
    token = token.replace('Bearer ', '');
    //console.log('TOKEN',token);
    try {
        var decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        if (decoded.rol) checkLevel(decoded.rol);
        return { valLogin: true, Utoken: decoded };
    } catch (err) {
        return { valLogin: err };
    }
}

function checkLogin(req, res, next) {
    let reqToken = req.headers.authorization;
    if (reqToken == undefined) return res.status(401).send('Debe ingresar un Token');

    const { valLogin } = check(reqToken);
    if (valLogin !== true) return res.status(401).send('Token inválido:  \n' + valLogin);
    next();
}

function checkLoginProfesor(req, res, next) {
    //console.log(req.headers.authorization);
    let reqToken = req.headers.authorization;
    if (reqToken == undefined) return res.status(401).send('Debe ingresar un Token');

    const { valLogin, Utoken } = check(reqToken);
    if (valLogin !== true) return res.status(401).send('Token inválido:  \n' + valLogin);

    if (Utoken.rol !== 'profesor') {
        return res.status(403).send(['Usted no posee permisos de profesor', Utoken]);
    };

    next();
}

function checkLoginDirector(req, res, next) {
    //console.log(req.headers.authorization);
    let reqToken = req.headers.authorization;
    if (reqToken == undefined) return res.status(401).send('Debe ingresar un Token');

    const { valLogin, Utoken } = check(reqToken);
    if (valLogin !== true) return res.status(401).send('Token inválido:  \n' + valLogin);
    
    if (Utoken.rol !== 'director') {
        return res.status(403).send(['Usted no posee permisos de director', Utoken]);
    };

    next();
}


function checkRoot(req, res, next) {
    //console.log(req.headers.authorization);
    let reqToken = req.headers.authorization;
    if (reqToken == undefined) return res.status(401).send('Debe ingresar un Token');

    const { valLogin, Utoken } = check(reqToken);
    if (valLogin !== true) return res.status(401).send('Token inválido:  \n' + valLogin);
    
    if (Utoken.rol !== 'root') {
        return res.status(403).send(['Usted no posee permisos de usuario root', Utoken]);
    };

    if (Utoken.id == req.body.cedula_usuario) return res.status(403).send(['No puede cambiarse a sí mismo de rol', Utoken]);

    next();
}

// INVALIDAR TOKENS POR DATETIME

function checkDatetime(req, res, next){
    let reqToken = req.headers.authorization;
    if (reqToken == undefined) return res.status(401).send('Debe ingresar un Token');
    let token  = check(reqToken)
    console.log("Fue creado en (iat):")
    console.log(token.Utoken.iat)
    console.log("Caduca en (exp):")
    console.log(token.Utoken.exp)
    let fecha_expiracion =  new Date(token.Utoken.exp * 1000)
    let fecha_actual = new Date();
    if(fecha_actual < fecha_expiracion){
        console.log("Token todavia válido")
        next();  
    }else{
        res.status(500).send("Token expirado")
    }
}

function decodificar(token) {
    token = token.replace('Bearer ', '');
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = { checkLogin, checkLoginProfesor, checkLoginDirector, checkRoot, checkDatetime, decodificar };