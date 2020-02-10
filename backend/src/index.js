// Mttodos HTTP - get,post,put,delete
//consulta, criar, editar, deletar

//tipos de paramtros
//Usar no metodo GET - 
//     Query Parms: request.query (Filtros, ordenação, paginação)

//Usar nos metodos PUT E DELETE  -  
//    Route Parms: request.parms (Identificar um recusso na alteração ou criação) 

//Post e Put - 
//    Body Parms: request.body  - parametros para envio ao backend
//    
//Mongo DB (Não Relacional)

const  express = require('express');
const mongoose = require('mongoose');
const cors= require('cors');
const http = require('http');
const routes = require('./routes');
const {setupWebsocket} = require('./websocket');

const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect('mongodb+srv://danielle:desliga2015@cluster0-yauww.mongodb.net/week10?retryWrites=true&w=majority',
{
   useNewUrlParser: true,
   useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use(routes);
server.listen(3333);