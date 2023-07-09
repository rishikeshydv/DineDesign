'use strict'
const $ = document.querySelector.bind(document);


// login link action
$('#loginLink').addEventListener('click',openLoginScreen);

// register link action
$('#registerLink').addEventListener('click',openRegisterScreen);



// Sign In button action
$('#loginBtn').addEventListener('click',()=>{
    // check to make sure username/password aren't blank
    if(!$('#loginUsername').value || !$('#loginPassword').value)return;
    // TODO: 
    //   GET /users/{username}, where {username} is $('#loginUsername').value
    //     decode response from json to object called doc
    //     if doc.error, call showError(doc.error)
    //     otherwise, if doc.password is NOT the same as $('#loginPassword').value,
    //       call showError('Username and password do not match.')
    //     otherwise, call openHomeScreen(doc)
    //   use .catch(err=>showError('ERROR: '+err)}) to show any other errors

        // grab all user info from input fields, and POST it to /users

    fetch('/users/auth',{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
          },        
        body: JSON.stringify({
            username: $('#loginUsername').value,
            password: $('#loginPassword').value
        })  
    })
    .then(res=>res.json())
    .then(doc =>{
        if (doc.error){
            showError(doc.error);
            
        }
        else { 
            openHomeScreen(doc);
        }
    })
    .catch(err => showError('Error: '+err));
    });

// logout link action
$('#logoutLink').addEventListener('click',()=>{
    fetch('/users/:username',{
        method:'PATCH'})
    .then(res=>res.json())
    .then(doc =>{
        if (doc.error){
            showError(doc.error);
            
        }
        else {  
            openLoginScreen();
        }
    })
    .catch(err => showError('Error: '+err));
    });


// Register button action
$('#registerBtn').addEventListener('click',()=>{
    // check to make sure no fields aren't blank
    if(!$('#registerUsername').value ||
    !$('#registerPassword').value ||
    !$('#registerName').value ||
    !$('#registerEmail').value){
        showError('All fields are required.');
        return;
    }
    // grab all user info from input fields, and POST it to /users
    var data = {
        username: $('#registerUsername').value,
        password: $('#registerPassword').value,
        name: $('#registerName').value,
        email: $('#registerEmail').value
    };
    
    // TODO: 
    //   POST /users
    //     convert data (defined above) to json, and send via POST to /users
    //     decode response from json to object called doc
    //     if doc.error, showError(doc.error)
    //     otherwise, openHomeScreen(doc)
    //   use .catch(err=>showError('ERROR: '+err)}) to show any other errors
    
    
    fetch('/users',{
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data) 
    })
    .then(res=>res.json())
    .then(doc => {
        if (doc.error){
            showError(doc.error)
        }
        else{
            openHomeScreen(doc)
        }
    })
    .catch(err => showError('ERROR: '+err));
    
});




// Update button action
$('#updateBtn').addEventListener('click',()=>{
    // check to make sure no fields aren't blank
    if(!$('#updateName').value || !$('#updateEmail').value){
        showError('Fields cannot be blank.');
        return;
    }
    // grab all user info from input fields
    var data = {
        name: $('#updateName').value,
        email: $('#updateEmail').value
    };
    // TODO: 
    //   PATCH /users/{username}, where {username} is $('#username').innerText
    //     convert data (defined above) to json, and send via PATCH to /users/{username}
    //     decode response from json to object called doc
    //     if doc.error, showError(doc.error)
    //     otherwise, if doc.ok,
    //       alert("Your name and email have been updated.");
    //   use .catch(err=>showError('ERROR: '+err)}) to show any other errors
    
    fetch(`/users/$('#username')/$('#authToken')}`,{
        method:'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data) 
    })
    .then(res=>res.json())
    .then(doc => {
        if (doc.error){
            showError(doc.error)
        }
        else if(doc.ok){
            alert("Your name and email have been updated.")
        }
    })
    .catch(err => showError('ERROR: '+err));
});




// Delete button action
$('#deleteBtn').addEventListener('click',()=>{
    // confirm that the user wants to delete
    if(!confirm("Are you sure you want to delete your profile?"))
    return;
    // TODO: 
    //   DELETE /users/{username}, where {username} is $('#username').innerText
    //     decode response from json to object called doc
    //     if doc.error, showError(doc.error)
    //     otherwise, openLoginScreen()
    //   use .catch(err=>showError('ERROR: '+err)}) to show any other errors

    fetch(`/users/${username}/${authToken}`,{
        method:'DELETE',
        headers: {'Content-Type': 'application/json'},
    })
    .then(res=>res.json())
    .then(doc => {
        if (doc.error){
            showError(doc.error)
        }
        else {
            openLoginScreen()
        }
    })
    .catch(err => showError('ERROR: '+err));
});


function showListOfUsers(){
    // TODO:
    //   GET /users
    //     decode response from json to an array called docs
    //     for every doc in docs, call showUserInList(doc)
    //       you can do this by using a for-loop or, better yet, a forEach function:
    //         docs.forEach(showUserInList)
    //   use .catch(err=>showError('Could not get user list: '+err)}) to show any potential errors

    fetch('/users')
    .then(res => res.json())
    .then(doc => {
        console.log(doc);
        doc.forEach(showUserInList);
    })
    .catch(err=>showError('Could not get user list: '+err))
    }





function showUserInList(doc){
    // add doc.username to #userlist
    var item = document.createElement('li');
    $('#userlist').appendChild(item);
    item.innerText = doc.username;
}

function showError(err){
    // show error in dedicated error div
    $('#error').innerText=err;
}

function resetInputs(){
    // clear all input values
    var inputs = document.getElementsByTagName("input");
    for(var input of inputs){
        input.value='';
    }
}

function openHomeScreen(doc){
    // hide other screens, clear inputs, clear error
    $('#loginScreen').classList.add('hidden');
    $('#registerScreen').classList.add('hidden');
    resetInputs();
    showError('');
    // reveal home screen
    $('#homeScreen').classList.remove('hidden');
    // display name, username
    $('#name').innerText = doc.name;
    $('#username').innerText = doc.username;
    // display updatable user info in input fields
    $('#updateName').value = doc.name;
    $('#updateEmail').value = doc.email;
    // clear prior userlist
    $('#userlist').innerHTML = '';
    // show new list of users
    showListOfUsers();
}

function openLoginScreen(){
    // hide other screens, clear inputs, clear error
    $('#registerScreen').classList.add('hidden');
    $('#homeScreen').classList.add('hidden');
    resetInputs();
    showError('');
    // reveal login screen
    $('#loginScreen').classList.remove('hidden');
}

function openRegisterScreen(){
    // hide other screens, clear inputs, clear error
    $('#loginScreen').classList.add('hidden');
    $('#homeScreen').classList.add('hidden');
    resetInputs();
    showError('');
    // reveal register screen
    $('#registerScreen').classList.remove('hidden');
}


    
    --
    
    
    
    // CRUD Operations on Reservation
    //              <----------------        START          --------------->
    
    // Book Table
    $('#book-table-btn').addEventListener('click',()=>{
        fetch('/booktable',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                day: $('#days_select').value,
                hour: $('#hours_select').value,
                name: $('#name_select').value,
                phone: $('#phone_select').value
            })
        })
        .then(res=>res.json())
        .then(doc =>{
            if (doc.error){
                showError(doc.error);
                
            }
            else {  
                $('#success-text').innerText = 'Reservation Successful ';
            }
        })
        .catch(err => showError('Error: '+err));
    });
    
    
    //Delete Reservation
    
    $('#del-table-btn').addEventListener('click',()=>{
        fetch('/deltable',{
            method:'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                day: $('#days_select').value,
                hour: $('#hours_select').value,
                name: $('#name_select').value,
                phone: $('#phone_select').value
            })
        })
        .then(res=>res.json())
        .then(doc =>{
            if (doc.error){
                showError(doc.error);
                
            }
            else {  
                $('#success-text').innerText = 'Reservation Deleted';
            }
        })
        .catch(err => showError('Error: '+err));
    });
    
    //Update Reservation
    
    $('#change-table-btn').addEventListener('click',()=>{
        fetch('/changetable',{
            method:'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                day: $('#days_select').value,
                hour: $('#hours_select').value,
                name: $('#name_select').value,
                phone: $('#phone_select').value
            })
        })
        .then(res=>res.json())
        .then(doc =>{
            if (doc.error){
                showError(doc.error);
                
            }
            else {  
                $('#success-text').innerText = 'Reservation Changed';
            }
        })
        .catch(err => showError('Error: '+err));
    });
    //              <----------------         END           --------------->
    
    
    // Getting Reviews from YELP
    
    // client_id = '0AuNRPnpDgdrNtUz4Cr5fg'
    // api = 'zqw1oPhA83oZLV3QHHYINxG5QIV09V_BeCVqjUk8iksAcCnKZcQnPfMLIVF_5FAbQNdq0vBMCOQrGwwBmQGIm23XFYgGxsL7QV6ULN17ow4kPEeZ5dwVmRX39k1dZHYx'
    // business_id = 'qllT7GpKz_uuJvR-31Wkwg'
    
    // fetch(`https://api.yelp.com/v3/businesses/${business_id}/reviews`,
    // {
    //     headers: {
    //         Authorization: `Bearer ${apiKey}`
    //     }
    // })
    // .then(response => response.json())
    // .then(doc => {
    //     const reviews = doc.reviews;
    //     const reviewsContainer = document.getElementById('reviews');
        
    //     reviews.forEach(review => {
    //         const reviewElement = document.createElement('div');
    //         reviewElement.textContent = review.text;
    //         reviewsContainer.appendChild(reviewElement);
    //     });
    // })
    // .catch(error => {
    //     console.error(error);
    // });
    
    //Image Upload Section
    
    $('#img-upload').addEventListener('click',()=>{
        
        const fileInput = document.getElementById('image');
        const formData = new FormData();
        formData.append('images', fileInput.files[0]);
        
        
        fetch('/api/upload-images', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(doc => {
            console.log(doc);
        })
        .catch(err =>showError('ERROR: '+err)
        );
        
    })



// adding webGL to the header using three.js

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("webgl-container").appendChild(renderer.domElement);

const letters = [];
const phrase = "DINE DIVINE";

const fontLoader = new THREE.FontLoader();
fontLoader.load(
  "https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/fonts/droid/droid_serif_regular.typeface.json",
  function (font) {
    // create a letter mesh for each character in the phrase
    for (let i = 0; i < phrase.length; i++) {
      const geometry = new THREE.TextGeometry(phrase[i], {
        font: font,
        size: 0.2,
        height: 0.05,
      });
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(
          Math.random(),
          Math.random(),
          Math.random()
        ),
      });
      const letter = new THREE.Mesh(geometry, material);
      letter.position.x = -6.5 + i * 0.3;
      letter.position.y = 0;
      scene.add(letter);
      letters.push(letter);
    }
  }
);

camera.position.z = 5;

let time = 0;
let speed = 0.01;
let amplitude = 0.1;

function animate() {
  requestAnimationFrame(animate);

  time += speed;

  for (let i = 0; i < letters.length; i++) {
    // jiggle the position of each letter
    letters[i].position.y = amplitude * Math.sin(time + i);

    // change the color of each letter
    letters[i].material.color = new THREE.Color(
      Math.random(),
      Math.random(),
      Math.random()
    );
  }

  renderer.render(scene, camera);
}

animate();


//end of webGL
    
    
//                   *************     adding websockets    ****************
    
    // var socket = new WebSocket("//localhost:3003");
    // socket.addEventListener('open', function (event) {
    //     console.log('WebSocket connection opened');
    // });
    
    // socket.addEventListener('message', function (event) {
    //     console.log('Received message: ' + event.data);
    // });
    
    // socket.addEventListener('close', function (event) {
    //     console.log('WebSocket connection closed');
    // });
    
    // socket.send('Hello server!');
    
    
    //      ************ adding the feature of WebRTC **************
    
    // const socket = io('/')
    
    // const videoGrid = document.getElementById('video-grid')
    
    // //setting up a 'peer' for userID
    // const myPeer = new Peer(undefined, {                // ID is the first argument which is set as 'undefined', this will generate a unique ID automatically.
    //     host: '/',
    //     port: '3002'
    // })
    
    // const userVid = document.createElement('video')
    // userVid.muted = true        //turns off the mic of the user as you dont want to hear your own voice while you speak
    // const setOfUsers = {}
    // navigator.mediaDevices.getUserMedia({
    //     video: true,
    //     audio: true
    // }).then(stream => {
    //     addVideoStream(userVid, stream)
        
    //     //when a new user connects to the server 
    //     socket.on('New User Connected', userId => {
    //         connectToNewUser(userId, stream)
    //     })

    //     //when the user receives a call 
    //     myPeer.on('call', res => {
    //         res.answer(stream)
    //         const newVideo = document.createElement('video')
    //         res.on('stream', userVideoStream => {
    //             addVideoStream(newVideo, userVideoStream)
    //         })
    //     })
        
    // })

    // socket.on('Disconnected User', userId => {
    //     if (setOfUsers[userId]) {
    //     setOfUsers[userId].close()
    //     }
    //   })
    
    //   myPeer.on('open', id => {
    //     socket.emit('join-room', ROOM_ID, id)
    //   })

    //   function connectToNewUser(userId, stream) {
    //     const call = myPeer.call(userId, stream)
    //     const video = document.createElement('video')
    //     call.on('stream', userVideoStream => {
    //       addVideoStream(video, userVideoStream)
    //     })
    //     call.on('close', () => {
    //       video.remove()
    //     })
      
    //     setOfUsers[userId] = call
    //   }

    // function addVideoStream(newVideo, stream) {
    //     newVideo.srcObject = stream
    //     newVideo.addEventListener('loadedmetadata', () => {
    //         newVideo.play()
    //     })
    //     videoGrid.append(newVideo)}
        