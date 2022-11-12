//MWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMW
// RUTAS DEL BACKEND
//MWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMW
const { Router } = require('express');
const RoutFunc = require('../Function/Function');
const router = Router();

//LISTA DE TODOS LOS PERROS & PERROS FILTRADOS POR NOMBRE -----------------------------
router.get('/dogs',async(req,res)=>{
    let { name }=req.query;
    if (name) {
        try {//FILTRO POR NOMBRE 
            return res.status(200).json(await RoutFunc.getdogbyname(name))
        } catch (error) {
            return res.status(400).send("Sorry there isn't information to show by this race")
        }        
    } else {
        try {//TODOS LOS PERROS
            return res.status(200).json(await RoutFunc.getdoglist())
        } catch (error) {
            return res.status(400).send("Sorry there isn't information to show")
        }        
    }
})
//DETALLE DE PERROS -------------------------------------------------------------------
router.get('/dogs/id/:id',async(req,res)=>{
    let {id}=req.params
    try {
        return res.status(200).json(await RoutFunc.getdogbyid(id))
    } catch (error) {
        return res.status(400).send("Sorry there isn't information to show")
    }
})

//GUARDA PERROS -------------------------------------------------------------------
router.post('/dogs/new',async(req,res)=>{
    let {image,name,weight,height,life_span,temperament}=req.body
    try {
        return res.status(200).json(await RoutFunc.savedogs(image,name,weight,height,life_span,temperament))
    } catch (error) {
        return res.status(400).send("Sorry the information couldn't be save")
    }
})

//ACTUALIZA PERROS -------------------------------------------------------------------
router.put('/dogs/updt',async(req,res)=>{
    let {id,image,name,weight,height,life_span,temperament}=req.body
    try {
        return res.status(200).json(await RoutFunc.updatedogs(id,image,name,weight,height,life_span,temperament))
    } catch (error) {
        return res.status(400).send("Sorry the information couldn't be update")
    }
})

//BORRA PERROS -------------------------------------------------------------------
router.delete('/dogs/del/:id',async(req,res)=>{
    let {id}=req.params
    console.log(id)
    try {
        return res.status(200).json(await RoutFunc.delldog(id))
    } catch (error) {
        return error
    }
})

//CARGA TEMPERAMENTO A LA DB -----------------------------------------------------------
router.get('/tempe',async(req,res)=>{
    try {
        return res.status(200).json(await RoutFunc.listemp())
    } catch (error) {
        return res.status(400).send("There Was a Failure to Exporting List of Temperament to the Data Base")
    }
})

//LISTA TEMPERAMENTO -------------------------------------------------------------------
router.get('/listempe',async(req,res)=>{
    try {
        return res.status(200).json(await RoutFunc.temperlist())
    } catch (error) {
        return res.status(400).send("There Was a Failure to Import List of Temperament")
    }
})

module.exports = router;
