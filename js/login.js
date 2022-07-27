


document.getElementById('login').onsubmit = function (event){
    event.preventDefault();

    var name = event.target.elements.username.value;
    var pass = event.target.elements.password.value;

    if (name=="" || pass==""){
        alert("Üres felhasználónév vagy jelszó")
    }else{
        const data = { 
            username: name,
            password: pass,
        };
     
        fetch('https://localhost:7222/api/Auth/Login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
        Cookies.set("JWT1", data);
        console.log('Success:', data);
        })
        .catch((error) => {
        console.error('Error:', error);
        alert('bad password or username')
        });  
    
    
        
        alert('succesful login')
        location.href = "chat.html";
    }


 
} 


