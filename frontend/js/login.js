// Show / Hide Password

const togglePassword =
document.getElementById("togglePassword");

const password =
document.getElementById("password");

if(togglePassword){

    togglePassword.addEventListener("change", () => {

        if(password.type === "password"){
            password.type = "text";
        }
        else{
            password.type = "password";
        }

    });

}


// Login

document
.getElementById("loginForm")
.addEventListener("submit", function(e){

    e.preventDefault();

    const email =
    document.getElementById("email")
    .value.trim();

    const password =
    document.getElementById("password")
    .value.trim();

    if(
        email === "" ||
        password === ""
    ){
        alert("Please fill all fields");
        return;
    }

    fetch(
        "http://localhost:8080/api/auth/login",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email:email,
                password:password
            })
        }
    )
    .then(response => {

        if(!response.ok){
            throw new Error("Invalid Credentials");
        }

        return response.json();

    })
    .then(user => {

        sessionStorage.setItem(
            "currentUser",
            JSON.stringify(user)
        );

        alert(
            "Welcome " +
            user.name +
            " (" +
            user.role +
            ")"
        );

        window.location.href =
        "dashboard.html";

    })
    .catch(error => {

        console.error(error);

        alert("Invalid Email or Password");

    });

});