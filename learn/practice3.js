const { application } = require("express")

//Objeto
const lenguajes = {
    compilados: ["Java", "C", "C++"],
    interpretados: ["Python", "PHP", "Javascrip"]
}

const body = {
    apellidos: "Pineda Yataco",
    nombres: "Junior",
    edad: 19,
    estaCasado: false,
    direccion: "Chincha",
    especialidad: "Ingeneria Software"
}

//Deserializacion (Descomposicion)
const{apellidos, nombres, edad, estaCasado, direccion, especialidad} = body

/*
const apellidos = body.apellidos
const nombres = body.nombres
const edad = body.edad
const estaCasado = body.estaCasado
*/

console.log(apellidos, nombres, edad, estaCasado, direccion, especialidad)
//console.log(lenguajes.compilados[0])