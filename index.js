//mongoose setup
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var db = "mongodb://localhost:27017/rishi";
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });

const express = require('express');       // load express module
const dataModel = require('./models/model')
const reserveModel = require('./models/reserveModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')                           


//importing modules for webRTC
// const server = require('http').Server(app)
// const io = require('socket.io')(server)
// const { v4: uuidV4 } = require('uuid')
// app.set('view engine','ejs')    //setup ejs framework
const http = require('http');
const socketio = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketio(server);


app.use(express.static('public'));        // enable static routing to "./public" folder

//TODO:
// automatically decode all requests from JSON and encode all responses into JSON
app.use(express.json());
//app.use(cors());


//TODO:
// create route to get user record (GET /users/:username)
//   use db.findOne to get user record
//     if record is found, send it
//     otherwise, send {error:'Username not found.'}
//   use .catch(error=>res.send({error})) to catch and send other errors

app.post('/users/auth' ,(req,res) => {
    var {username, password} = req.body;
      
    //dataModel.findOne({username}).select('username email name password authToken').exec()
   dataModel.findOne({username}).exec()
    .then(doc => {
        if (bcrypt.compareSync(password, doc.password)){
            doc.authToken = jwt.sign({ username },'random_secret_string');   //changing the authentication token everytime you login
            //console.log('authToken:', doc.authToken);
            res.send(doc);

        }
        else{
            console.log('User not found or incorrect password');
            res.send({error:'User not found'});
        }
    }
    ) 
    .catch(error => res.send({error:'try/catch error'}));
   // .catch(error => console.log(error));
});

//TODO:
//delete authentication token after logout
app.patch('/users/:username' , (req,res) =>{
    
    dataModel.findOneAndUpdate(
        { username: req.params.username },
        { authToken: null },
        { new: true })
    .then(doc => 
            res.send({doc})
             )
    .catch(error => res.send({error}))
});


//TODO:
// create route to register user (POST /users)
//   ensure all fields (username, password, email, name) are specified; if not, send {error:'Missing fields.'}
//   use findOne to check if username already exists in db  
//     if username exists, send {error:'Username already exists.'}
//     otherwise,
//       use insertOne to add document to dataModel
//       if all goes well, send returned document
//   use .catch(error=>res.send({error})) to catch and send other errors

app.post('/users', (req,res) => {
    
    var {username, password, email, name, authToken } = req.body;
    req.body.password = bcrypt.hashSync(password,10);

    req.body.authToken = jwt.sign(
        { username },
        'random_secret_string'
      );
      
    
    if (!username || !password || !email || !name) {
        console.error('Missing fields.');
        res.send({error:'Missing Fields'})
    }
    else{
        dataModel.findOne({username})
        .then(doc => {
            if(doc){
                console.error('User Already Exists')
                res.send({error:'User Already Exists'})
            }
            
            else{
                dataModel.create(req.body)
                .then(doc =>res.send(doc))
                .catch(error => res.send({error}))
            }
        })
        .catch(err => res.send({err}))
    }    
});

//    res.send({username:docs.username,
//    email:docs.email,
//    name:docs.name,
//    authToken:docs.authToken
//     }))

//TODO:
// create route to get all user records (GET /users)
//   use db.find to get the records, then send them
//   use .catch(error=>res.send({error})) to catch and send errors
app.get('/users' , (req,res) => {
     
    //dataModel.find({}).select('username email name authToken').exec()
    dataModel.find({}).exec()
    .then(doc =>  res.send(doc))
    .catch(error => res.send({error}));
});


//TODO:
// create route to update user doc (PATCH /users/:username)
//   use updateOne to update document in dataModel
//     updateOne resolves to 0 if no records were updated, or 1 if record was updated
//     if 0 records were updated, send {error:'Something went wrong.'}
//     otherwise, send {ok:true}
//   use .catch(error=>res.send({error})) to catch and send other errors
app.patch('/users/:username/:authToken', (req,res)=>{
    dataModel.findOneAndUpdate(req.params.authToken,req.body.username).exec()
    .then(doc => {
        console.log(doc);
        if (doc){
            res.send({ok:true})
        }
        else {
            res.send ({error:'Something went wrong.'})
        }
    })
    .catch(error=>res.send({error}))
    
});

//TODO:
// create route to delete user doc (DELETE /users/:username)
//   use deleteOne to update document in dataModel
//     deleteOne resolves to 0 if no records were deleted, or 1 if record was deleted
//     if 0 records were deleted, send {error:'Something went wrong.'}
//     otherwise, send {ok:true}
//   use .catch(error=>res.send({error})) to catch and send other errors
app.delete('/users/:username/:authToken',(req,res)=>{
    const username = req.params.username;
    const authToken = req.params.authToken;
    dataModel.findOneAndDelete(
        {username:username , 
        authToken: authToken}).exec()
    .then(doc => {
        console.log(doc);
        if (doc) {
            res.send({ok:true});
        }          
        else {
            res.send({error:'Something went wrong'});
        }
    }) 
    .catch(error=>res.send({error}))
});




//CRUD Operations on Reservation
//             <----------------        START          --------------->

//create a new reservation
app.post('/booktable', (req,res)=>{
    var {day, hour, name, phone} = req.body;
    
    if (!day || !hour || !name || !phone) {
        console.error('Missing fields.');
        res.send({error:'Missing Fields'})
    }
    else{
        reserveModel.findOne({name,day,hour})
        .then(doc => {
            if(doc){
                console.error('Reservation Already Exists')
                res.send({error:'Reservation Already Exists'})
            }
            
            else{
                reserveModel.create(req.body)
                .then(doc =>res.send(doc))
                .catch(error => res.send({error}))
            }
        })
        .catch(err => res.send({err}))
}});

//delete a reservation

app.delete('/deltable', (req,res)=>{
    var {day, hour, name, phone} = req.body;
    
    if (!day || !hour || !name || !phone) {
        console.error('Missing fields.');
        res.send({error:'Missing Fields'})
    }
    else{
        reserveModel.findOne({name,day,hour})
        .then(doc => {
             if(doc){
                 reserveModel.deleteOne({_id: doc._id })
                 .then(() =>res.send({}))
                 .catch(error => res.send({error}))
             }
            
             else{
                 res.send({error:'No Such Reservation Found'})
             }
        })
        //.catch(err => res.send({err}))
        .catch(err =>console.log('Final Error : No Such Reservation Found'))
}});

//change a reservation


app.patch('/changetable', (req,res)=>{
    var {day, hour, name, phone} = req.body;
    
    if (!day || !hour || !name || !phone) {
        console.error('Missing fields.');
        res.send({error:'Missing Fields'})
    }
    else{
        reserveModel.findOneAndUpdate({name,phone},req.body, { new: true }).exec()     //verify with name and phone
        .then(doc => {                                                  //only changes day and hour of reservation
            if(doc){
                res.send({doc})
            }
            
            else{
                res.send({error:'No Such Reservation Found'})
            }
        })
        .catch(err => res.send({err}))
}});




//              <----------------         END           --------------->


//setting up websocket server
//              <----------------         START           --------------->

// const WebSocket = require('ws');
// const wss = new WebSocket.Server({ port: 3003 });

// wss.on('connection', function connection(ws) {
//   console.log('WebSocket connection opened');

//   // Handle incoming messages
//   ws.on('message', function incoming(message) {
//     console.log('Received message: %s', message);
//   });

//   // Handle socket close
//   ws.on('close', function close() {
//     console.log('WebSocket connection closed');
//   });
// });

//              <----------------         END           --------------->



//      ***************     Image Upload      ******************
//              <----------------         START           --------------->

// app.post('/api/upload-images' ,(req,res) => {
      
//     imgModel.create(req.body)
//                 .then(doc =>res.send(doc))
//                 .catch(error => res.send({error}))
// });

//              <----------------         END           --------------->





//adding the feature of WebRTC
    //          <----------------         START           --------------->


// app.get('/', (req, res) => {
// res.redirect(`/${uuidV4()}`)
// })

// app.get('/:roomnum', (req, res) => {
// res.render('roomnum ', { roomId: req.params.room })
// })

// io.on('connection', socket => {
//     socket.on('join-room', (roomId, userId) => {
//       socket.join(roomId)
//       socket.to(roomId).broadcast.emit('New User Connected', userId)
  
//       socket.on('disconnect', () => {
//         socket.to(roomId).broadcast.emit('Disconnected User', userId)
//       })
//     })
//   })
  
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('offer', (description) => {
    console.log('Offer received:', description);
    socket.broadcast.emit('offer', description);
  });

  socket.on('answer', (description) => {
    console.log('Answer received:', description);
    socket.broadcast.emit('answer', description);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});



    //          <----------------         END           --------------->


// default route
app.all('*',(req,res)=>{res.status(404).send({err:'Invalid URL.'})});

// start server
app.listen(4000,()=>console.log("Server started on http://localhost:4000"));
