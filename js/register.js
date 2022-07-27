document.getElementById('register').onsubmit=function checkData(event) {
    event.preventDefault();

    var firstname = event.target.elements.firstname.value;
    var lastname = event.target.elements.lastname.value;
    var middlename = event.target.elements.middlename.value;
    var username = event.target.elements.username.value;
    var password = event.target.elements.password.value;
    var email = event.target.elements.email.value;

    checkFirst(firstname);
    checkLast(lastname);
    checkMiddle(middlename);
    checkUsername(username);
    checkPassword(password);

    if ((checkFirst(firstname)===true) && (checkLast(lastname)===true) && (checkUsername(username)===true) && (checkPassword(password)===true)){
        signUP(firstname, middlename, lastname, password, username, email);
    } 

}

function checkMiddle(middlename){
    var letters3 = /^[A-Za-z]+$/;
    if (middlename != ""){
        if (letters3.test(middlename)){
            return true;
        }
        else{
            alert('Use only alphabetical characters!');
            return false;
        }
    }else{    
        return "";
    }

}

function checkFirst(firstname){
    var letters = /^[A-Za-z]+$/;

    if (letters.test(firstname)){
        return true;
    }
    else{
        alert('You must enter a First name! Use only alphabetical characters!');
        return false;
    }
}
function checkLast(lastname){
    var letters2 = /^[A-Za-z]+$/;

    if (letters2.test(lastname)){
        return true;
    }
    else{
        alert('You must enter a Last name! Use only alphabetical characters!');
        return false;
    }
}


function checkUsername(username) {
    
    var usernameRegexp = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{3,15}$/i;
    
    if(usernameRegexp.test(username)) {
        return true;
    }
    else {
        alert('The username must be between 4-15 characters! The username must NOT contain special characters!');
        return false;
    }
}

function checkPassword(password) { 

    var paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;

    if(paswd.test(password)) { 
        return true;
    }
    else { 
        alert('The password must be between 7-15 characters! The password must have at least one number and one special character!')
        return false;
    }
} 

function signUP(firstname, middlename, lastname, password, username, email){
    
    var data = {
        username : username,
        firstname: firstname,
        lastname: lastname,
        middlename: middlename,
        email: email,
        password : password
    }

    fetch('https://localhost:7222/api/Auth/Register', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        alert('Sikeres regisztráció');
        location.reload();
        })
        .catch((error) => {
        console.error('Error:', error);
        });  
    
}

/* 'Authorization':`Bearer ${Cookies.get("JWT")}` */