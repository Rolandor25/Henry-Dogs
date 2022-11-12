//MWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMW
// FUNCIONES DEL BACKEND
//MWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMW

const axios = require("axios");
const { Dog, Temperamento } = require("../db");
const { API_KEY } = process.env;
const { Op } = require("sequelize");

module.exports = {
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //LISTA DE TODOS LOS PERROS ===================================================================
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    getdoglist: async function () {
        //Data de la API -------------------------------------------------------------------
        // const apidata = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
        // const apidogs = apidata.data.map(d=>{
        //     return{
        //         id:d.id,
        //         image:d.image.url,
        //         name:d.name,
        //         temperament:d.temperament,
        //         weight:d.weight.metric,
        //     }
        // })
        apidogs=[]
        //Data de la DB -------------------------------------------------------------------
        const dbdogs_raw= await Dog.findAll({
            attributes:['id','image','name','weight'],
            include: {
                model: Temperamento,
                attributes: ['name'],
                through: {
                    attributes:[],
                }
              }            
        })
        var dbdogs=[]
        for (let d = 0; d < dbdogs_raw.length; d++) {
            var lisTempe=[]
            for (let t = 0; t < dbdogs_raw[d].temperamentos.length; t++) {
                lisTempe.push(dbdogs_raw[d].temperamentos[t].name.toString());
            }
            dbdogs.push({id:dbdogs_raw[d].id, image:dbdogs_raw[d].image, name:dbdogs_raw[d].name, weight:dbdogs_raw[d].weight, temperament:lisTempe.join()})
        }

        //validacon de info disponible para mostrar ---------------------------------------  
        var doglist=[]
        if (apidogs && dbdogs) {
            doglist=apidogs.concat(dbdogs)
        } else if(apidogs && !dbdogs) {
            doglist=apidogs
        }else{
            doglist=dbdogs
        }
        return doglist
    },

    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //LISTA DE PERROS (X RAZA)===================================================================
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    getdogbyname: async function(raza_perro){
        //Data de la API -------------------------------------------------------------------
        const apidata_img = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
        const apidogs_img = apidata_img.data.map(d=>{
            return{
                id:d.id,
                image:d.image.url,
            }
        })   
    
        const apidata=await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${raza_perro}`)
        const apidogs = apidata.data.map(d=>{
            return{
                id:d.id,
                name:d.name,
                temperament:d.temperament,
                weight:d.weight.metric,
            }
        })

        var apidogs_byname=[] 
       for (let j = 0; j < apidogs_img.length; j++) {
            for (let k= 0; k < apidogs.length; k++) {
                if (apidogs_img[j].id==apidogs[k].id) {
                    apidogs_byname.push({id:apidogs[k].id,name:apidogs[k].name,temperament:apidogs[k].temperament,weight:apidogs[k].weight,image:apidogs_img[j].image})
                    break
                }                
            }
       }

        //Data de la DB -------------------------------------------------------------------
        const dbdogs_raw=await Dog.findAll({
            attributes:['id','image','name','weight'],
            where:{
                name:{
                    [Op.iLike]:'%' + raza_perro +'%'
                }
            },
            include: {
                model: Temperamento,
                attributes: ['name'],
                through: {
                  attributes:[],
                }
            }            
        })
        var dbdogs=[]
        for (let d = 0; d < dbdogs_raw.length; d++) {
            var lisTempe=[]
            for (let t = 0; t < dbdogs_raw[d].temperamentos.length; t++) {
                lisTempe.push(dbdogs_raw[d].temperamentos[t].name.toString());
            }
            dbdogs.push({id:dbdogs_raw[d].id, image:dbdogs_raw[d].image, name:dbdogs_raw[d].name, weight:dbdogs_raw[d].weight, temperament:lisTempe.join()})
        }
        //validacon de info disponible para mostrar ---------------------------------------  
        var dogbyname=[]
        if (apidogs_byname && dbdogs) {
            dogbyname=apidogs_byname.concat(dbdogs)
        } else if(apidogs_byname && !dbdogs) {
            dogbyname=apidogs_byname
        }else{
            dogbyname=dbdogs
        }
        return dogbyname
    },

    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //DETALLE DE PERROS (X ID)===================================================================
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    getdogbyid: async function(idog){  
        if (idog.search('-')>0) {
            //Data de la DB -------------------------------------------------------------------
            const dbdogs_raw=await Dog.findByPk(idog,{
                include: {
                    model: Temperamento,
                    attributes: ['name'],
                    through: {attributes:[]}
                }            
            })  
            var dbdogs=[]
            var lisTempe=[]
            for (let t = 0; t < dbdogs_raw.temperamentos.length; t++) {
                lisTempe.push(dbdogs_raw.temperamentos[t].name.toString());
            }
            dbdogs.push({id:dbdogs_raw.id, image:dbdogs_raw.image, name:dbdogs_raw.name, weight:dbdogs_raw.weight,height:dbdogs_raw.height,life_span:dbdogs_raw.life_span, temperament:lisTempe.join()})          
            return dbdogs        
        } else {
            //Data de la API -------------------------------------------------------------------
            const apidata = await axios.get(`https://api.thedogapi.com/v1/breeds`)
            const apidata_filter=apidata.data.filter((d)=>{
                if(d.id==idog){
                    return d
                }
            })
            const apidog_byid= apidata_filter.map(dogx=>{
                return{
                    id:dogx.id,
                    image:dogx.image.url,
                    name:dogx.name,
                    temperament:dogx.temperament,
                    weight:dogx.weight.metric,
                    height:dogx.height.metric,
                    life_span:dogx.life_span
                }
            }) 
            return apidog_byid        
        }
    },

    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //GUARDAR NUEVO PERRO EN LA DB ================================================================
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    savedogs: async function(image,name,weight,height,life_span,temperament){
        const newdog= await Dog.create({
            name:name,
            weight:weight,
            height:height,
            life_span:life_span,
            image:image,
        })
        if (temperament.length) {
            for (let i = 0; i < temperament.length; i++) {
                var newtemp = await Temperamento.findOne({
                    where: {
                        name: temperament[i]
                    }
                })
                newdog.addTemperamento(newtemp.id)
            }            
        } 
        return (newdog)
    },

    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //ACTUALIZO REGISTRO DE PERRO EN LA DB ========================================================
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    updatedogs: async function(id,image,name,weight,height,life_span,temperament){
        const toupdtdog= await Dog.findByPk(id,{
            include: {
                model: Temperamento,
                attributes: ['name'],
                through: {
                  attributes:[],
                }
            } 
        })
        await toupdtdog.update({image,name,weight,height,life_span})
        console.log(temperament.length)
        await toupdtdog.setTemperamentos([])
        if (temperament.length) {
            for (let i = 0; i < tempe.length; i++) {
                var newtempe = await Temperamento.findOne({
                    where: {
                        name: temperament[i]
                    }
                })
                await toupdtdog.addTempermentos(newtempe.id)
            }            
        } 
        return ({message: "The Information was successfully Updated"})
    },

    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //ELIMINO REGISTRO DE PERRO EN LA DB =========================================================
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    delldog: async function(id){
        const todelldog= await Dog.destroy({
            where:{
                id: id
            } 
        })
        return ({message:'The Information was successfully Deleted'})
    },

    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //GUARDA LA LISTA DE TEMPERAMENTOS DE LA API A LA DB ==========================================
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    listemp: async function(){
        const lista = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
        const listatemp_api = lista.data.map(l=>{
            return{
                temperament:l.temperament
            }
        })
        let listatemp=[]
        for (let j = 0; j < listatemp_api.length; j++) {
            if (listatemp_api[j].temperament!=="") {
                listatemp.push(listatemp_api[j].temperament);
            }
        }
        listatemp=listatemp.toString()
        listatemp=listatemp.split(",")
        listatemp=listatemp.map(t => { return t.trim() })
        listatemp=[...new Set(listatemp)]
        for (let i = 0; i < listatemp.length; i++) {
            var newtemper = await Temperamento.create({
                name:listatemp[i].trim()
            })
        }
        return (listatemp)
    },

    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //MUESTRA LA LISTA DE TEMPERAMENTO SDE LA DB ==================================================
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    temperlist: async function(){
        const Tempers= await Temperamento.findAll({
            where:{
                name:{
                    [Op.not]:""
                }
            },
            order:[['name', 'ASC']],
        })
        return Tempers
    }

}