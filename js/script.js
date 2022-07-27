function mobileChange(x) {
    if (x.matches) {
        var element = document.getElementById("mobile-view");
        element.classList.remove("hidden");
        var element2 = document.getElementById("desktop-view");
        element2.classList.add("hidden");
    } else {
        var element2 = document.getElementById("desktop-view");
        element2.classList.remove("hidden");
        var element = document.getElementById("mobile-view");
        element.classList.add("hidden");
    }
  }
  
  var x = window.matchMedia("(max-width: 900px)")
  mobileChange(x)
  x.addListener(mobileChange)

  function showFriends(){
    var friend = document.getElementById("friends");
    friend.classList.remove("hidden");
    var chatmobile = document.getElementById("chatmobile");
    chatmobile.classList.add("hidden");
    var requests = document.getElementById("requests");
    requests.classList.add("hidden");
  }

  function showRequests(){
    var friend = document.getElementById("friends");
    friend.classList.add("hidden");
    var chatmobile = document.getElementById("chatmobile");
    chatmobile.classList.add("hidden");
    var requests = document.getElementById("requests");
    requests.classList.remove("hidden");
  }

  function showChat(){
    var friend = document.getElementById("friends");
    friend.classList.add("hidden");
    var chatmobile = document.getElementById("chatmobile");
    chatmobile.classList.remove("hidden");
    var requests = document.getElementById("requests");
    requests.classList.add("hidden");
  }

//logout
document.getElementById('logout').onclick = function (event){
  event.preventDefault();
  alert("Sikeres kilépés!");
  location.href = "index.html";
  Cookies.set("JWT", "");
} 