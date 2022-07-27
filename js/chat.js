
oldalToltes();

function oldalToltes(){
    var coded = Cookies.get("JWT1");  
    var loginObject = renderLoginedUser(coded); 

    console.log(loginObject)
    renderSelf(loginObject);
    renderChat();
    renderFriends();
    renderRequests();
}




function renderLoginedUser(token) {       
    
    let codedUserData = token.split('.')[1]    
    console.log(codedUserData); 
    let uncodedData = atob(codedUserData)    
    let object = JSON.parse(uncodedData)     
    
    return object 
}
    

function renderSelf(data){
    var selfHTML = '';

    selfHTML+=`
        <div>
            <img src="img/user.png" alt="">
        </div>
        <div class="wrap2">
            <p>${data.Firstname +" "+ data.Lastname +" " + data.Middlename}</p>
            <div class="search2">
                <input type="text" class="searchTerm2" placeholder="Search a friend...">
                <button type="submit" class="searchButton2">
                    <i class="fa fa-search"></i>
                </button>
            </div>
        </div>
        `
        document.getElementById('friend-header').innerHTML = selfHTML;
        document.getElementById('mobile-friends-header').innerHTML = selfHTML;
}


function renderFriends(){
    var friendHTML = '';
    fetch('https://localhost:7222/api/Users/Friends', {
        method: 'GET',
        headers: {
                'Authorization':`Bearer ${Cookies.get("JWT1")}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
        }
    })
      .then(function (response) {
          return response.json();
      })
      .then(function (data) {
          appendData(data);
      })
      .catch(function (err) {
          console.log('error: ' + err);
      });
    function appendData(data) {
    
      for (var i = 0; i < data.length; i++) {
        friendHTML+=`
        <div id="friend-template" onclick="alert('yo')">
            <div>
                <img src="img/user.png" alt="">
            </div>
            <div id="friend-text">
                <p>${data[i].firstname+" "+data[i].lastname+" "+data[i].middlename}</p>
                <small>${data[i].email}</small>
            </div>
        </div> 
        <br>
        `
    
      }
      document.getElementById('friend-list').innerHTML = friendHTML;
      document.getElementById('mobile-friend-list').innerHTML = friendHTML;
    }

}

function renderRequests(){
    var requestHTML = '';
    fetch('https://localhost:7222/api/Users/FriendRequests',{
        method: 'GET',
        headers: {
                'Authorization':`Bearer ${Cookies.get("JWT1")}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
        }
        })
      .then(function (response) {
          return response.json();
      })
      .then(function (data) {
          appendData(data);
      })
      .catch(function (err) {
          console.log('error: ' + err);
      });
    function appendData(data) {
    
      for (var i = 0; i < data.length; i++) {
        requestHTML+=`
        <div id="request-template">
            <div>
                <img src="img/user.png" alt="">
            </div>
            <div id="request-text">
                <div>
                    <p>${data[i].sender.firstname+" "+data[i].sender.lastname+" "+data[i].sender.middlename}</p> 
                </div>                                    
                <div id="btnbox">
                    <button data-requestid="${data[i].id}" id="accept" onclick="acceptRequest(${data[i].id})" type="submit" class="btn3"><i class="fa-solid fa-user-plus"></i></button>
                    <button data-requestid="${data[i].id}" id="decline" onclick="declineRequest(${data[i].id})" type="submit" class="btn3"><i class="fa-solid fa-user-minus"></i></button>  
                </div>                                                                   
            </div>
        </div> 
        <br>
        `
    
      }
      document.getElementById('request-list').innerHTML = requestHTML;
      document.getElementById('mobile-request-list').innerHTML = requestHTML;
    }
/*     for (const item of document.querySelectorAll('[id^="decline"]')) {
        item.onclick=function(event){
            var id=event.target.dataset.requestid;
            console.log(id)
            declineRequest(id);
        }
    } */



}

function renderChat(){
    //chat render
/*     chat header html
        <div>
            <img src="img/user.png" alt="">
        </div>
        <div class="wrap2">
            <p>${}</p>
            <small>${}</small>
        </div> 
        
        
        saját cset
        <div id="self-chat">
            <p>${}</p>
        </div>
        
        partner cset
        <div id="partner-chat">
            <p>${}</p>
        </div>
        */

}



function renderSearch(){
    /*
        <div id="search-template">
            <div>
                <img src="img/user.png" alt="">
            </div>
            <div id="request-text">
                <div>
                    <p>${data[i].sender.firstname+" "+data[i].sender.lastname+" "+data[i].sender.middlename}</p> 
                </div>                                    
                <div id="btnbox">
                    <button data-requestid="${data[i].id}" id="accept" onclick="sendRequest(${data[i].id})" type="submit" class="btn3"><i class="fa-solid fa-user-plus"></i></button>                  
                </div>                                                                   
            </div>
        </div> 
        <br>
    */

}


function searchRequest(){ 
    var searchHTML = "";
    var searchlist = document.getElementById('search-list');
    var name = document.getElementById('searchFriend').value;
    var link = `https://localhost:7222/api/Users/Search?keyword=${name}`;
    //console.log(name)

    fetch(`https://localhost:7222/api/Users/Search?keyword=${name}`,{
        method: 'GET',
        headers: {
                'Authorization':`Bearer ${Cookies.get("JWT1")}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        appendData(data);
        console.log(data);
    })
    .catch(function (err) {
        console.log('error: ' + err);
    });
    function appendData(data) {

    for (var i = 0; i < data.length; i++) {
    searchHTML+=`
    <div id="request-template">
        <div>
            <img src="img/user.png" alt="">
        </div>
        <div id="request-text">
            <div>
                <p>${data[i].firstname+" "+data[i].lastname+" "+data[i].middlename}</p> 
            </div>                                    
            <div id="btnbox">
                <button onclick="sendRequest('${data[i].username}')" type="submit" id="addfriendbtn" class="btn3"><i class="fa-solid fa-user-plus"></i></button>                  
            </div>                                                                   
        </div>
    </div> 
    <br>
    `

    }
    searchlist.classList.remove('hidden');
    document.getElementById('search-list').innerHTML = searchHTML;
    }
}

function sendRequest(username){
    //fenti keresés és request küldés-e
    

    fetch('https://localhost:7222/api/Users/SendFriendRequest',{
        method: 'POST',
        headers: {
                'Authorization':`Bearer ${Cookies.get("JWT1")}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
        },
        body:  username
        })
      .then(function (response) {
          return response.json();
      })
      .then(function (data) {
          //appendData(data);
          //location.reload(); 
          console.log(data);
      })
      .catch(function (err) {
          console.log('error: ' + err);
      });
      

}

function searchFriend(){
    //keresni a barátok közt

}



function declineRequest(id){
    console.log(id)
    fetch('https://localhost:7222/api/Users/DeclineFriendRequest',{
        method: 'POST',
        headers: {
                'Authorization':`Bearer ${Cookies.get("JWT1")}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
        },
        body: id
        })
      .then(function (response) {
          return response.json();
      })
      .then(function (data) {
          appendData(data);
          console.log(response.json());
      })
      .catch(function (err) {
          console.log('error: ' + err);
      });
      location.reload();
}

function acceptRequest(id){
/*     for (const item of document.querySelectorAll('[id^="accept"]')) {
        item.onclick=function(event){
            var id=event.target.dataset.requestid;
            console.log(id)
            acceptRequest(id);
        }
    } */
    console.log(id)
    fetch('https://localhost:7222/api/Users/AcceptFriendRequest',{
        method: 'POST',
        headers: {
                'Authorization':`Bearer ${Cookies.get("JWT1")}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
        },
        body: id
        })
      .then(function (response) {
          return response.json();
      })
      .then(function (data) {
          appendData(data);
          console.log(response.json());
      })
      .catch(function (err) {
          console.log('error: ' + err);
      });

      location.reload();
}