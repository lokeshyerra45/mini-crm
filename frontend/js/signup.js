function registerUser() {

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value.trim();

    const role =
        document.getElementById("role").value;

    if (
        name === "" ||
        email === "" ||
        password === ""
    ) {
        alert("Please fill all fields");
        return;
    }

    fetch(
        "http://localhost:8080/api/auth/register",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                role: role
            })
        }
    )
    .then(response => {

        if (!response.ok) {
            throw new Error("Registration Failed");
        }

        return response.json();
    })
    .then(data => {

        alert("Registration Successful");

        window.location.href =
            "login.html";

    })
    .catch(error => {

        console.error(error);

        alert("Registration Failed");

    });

}