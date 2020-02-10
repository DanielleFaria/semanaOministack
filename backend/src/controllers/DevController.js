//controller geralemnte tem 5 funcoes, 
// index ,      show,   store, update,    destoy
//listar, buscar unico, criar, atualizar, deletar


const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../Utils/parseStringAsArray');
const {findConnections, sendMessage} = require('../websocket');

module.exports = {
   async index(request,response){
      const devs = await Dev.find();
      return response.json(devs);
   },

   async store(request, response)  {
   const { github_username, techs, latitude, longitude } = request.body;

   let dev  = await Dev.findOne({github_username});

   if(!dev){ //se nao exixtir no banco um usuario om o github_username

      const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

      //continuar 
      const {name = login, avatar_url, bio} = apiResponse.data; //retornar os parametros desejados da API

      const techsArray = parseStringAsArray(techs);
      
      const location = {
         type:'Point',
         coordinates:[longitude,latitude],
      };

         dev =  await Dev.create({
         github_username,
         name,
         avatar_url,
         bio,
         techs: techsArray,
         location,
      })

      //filtras as conexoes 
      const sendSocketMessageTo = findConnections(
         {latitude, longitude },
         techsArray,
      )
      
      console.log(`> sendSocketMessageTo: ${sendSocketMessageTo.length}`);
      sendMessage(sendSocketMessageTo,'new-dev', dev);
   }
   return response.json(dev);

   }
};