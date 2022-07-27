

var light = "css/style.css";
var dark = "css/dark.css";

function functionTry(){
    var isChecked = document.getElementById("switch").checked;

    if (isChecked == true){
        localStorage.setItem('darkmode',true)
    }else{
        localStorage.setItem('darkmode',false)
    }
    changeMode()
}

function changeMode(){
    var darkPlease = localStorage.getItem('darkmode');
    //console.log(darkPlease)

    if (darkPlease == "true"){        
        document.getElementById('stylesheet').href=dark;
    }else{
        document.getElementById('stylesheet').href=light;
    }
}
window.onload=function check(){
    var isDark = localStorage.getItem('darkmode');
    //console.log(isDark)

    if (isDark == "true"){
        changeMode()
        document.getElementById("switch").checked = true;
    }
}


