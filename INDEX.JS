const express = require('express') //Frameword
const mysql = require('mysql2') //acceso db
const bodyparser = require('body-parser')

const app = express()
app.use(bodyparser.json())

//configuracion de acceso
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bdmascotas'
})

//Apertura de conexion
db.connect((err) => {
    if (err) throw err;
    console.log("Conectado a la DB mascotas...")
})

// Inciaro el sevidor
const PORT = 3000

// ***  SERVICIOS WEB ***//
//VERBO = ACCIÓN = INTENCIÓN
//GET   : LEER
//POST  : CREAR
//PUT   : ACTUALIZAR
//DELETE : ELIMINAR

//req (requiere , requerimiento)
//res (response, respuesta)

app.post('/mascotas',(req, res) => {
    //¿Y los datos que queremos guardar? - DESERIALIZACION
    const { tipo, nombre, color, pesokg} = req.body

    //? = comodin evita los atques de por SQLinjection
    const sql = "INSERT INTO mascotas (tipo,nombre, color, pesokg) VALUES (?,?,?,?)"
    db.query(sql,[tipo, nombre, color , pesokg ], (err, results) => {
        if (err) {
            return res.status(500).send({
                success: false, 
                message: 'No se concreto el registro'})
            }
        //¿que hacemos cuando logramos registrar?
        res.send({
            success: true,
            message: 'Nueva mascota registrada',
            id: results.insertId
        })
    })
})


app.get('/mascotas',(req, res) => {
    const sql = "SELECT * FROM mascotas LIMIT 10"
    db.query(sql, (err, results) => {
        if(err)return res.status(500).send({message : 'Error acceso a datos'})
        res.json(results)
    })
})

//Se enviara el id por la url (endpoint)
///se enviaran los datos por json
app.put('/mascotas/:id',(req, res) => {
    const {id} = req.params
    const {tipo, nombre, color, pesokg} = req.body

    //Podemos escribir multilinea utilizando
    //CONDICONES VAN EN UN INDICE
    const sql = `
    UPDATE mascotas SET tipo = ? , 
    nombre = ?, 
    color = ?, 
    pesokg =? 
    WHERE id = ?`

    db.query(sql, [tipo, nombre, color, pesokg, id], (err, results) => {
        if(err){
            res.status(500).send({
                success: false,
                message: 'Nose concreto la actualizacion'
            })
        }

        return res.send({
            success: true,
            message: 'Registro actualizado'
        })
    })
})

//EN UN WS PARA ELIMINAR UN REGISTRO , PASAMOS LA PK COMO PARTE DE LA RUTA
//EJEMPLO : DELETE - miwebservice.com/clientes/1
app.delete('/mascotas/:id',(req, res) => {
    //¿Dedonde obtenemos el id a borrar? => ENDPOINT (URL)
    const { id } = req.params
    const sql = "DELETE FROM mascotas WHERE id = ?"
    db.query(sql, [id], (err, results) => {
        //Clausula de GUARDAR / retorno temprano
        if(err){
            res.status(500).send({
                success: false,
                message: 'No se puede eliminar el registro'
            })
        }

        if(results.affectedRows == 0){
            return res.status(404).send({
                success: false,
                message: 'No existe mascota'
            })
        }
        
        return res.send({
            success: true,
            message: 'Eliminado Correctamente'
        })
    })
})


app.listen(PORT, () => {
    console.log("Servidor iniciado correctamente en http://localhost:3000")
})