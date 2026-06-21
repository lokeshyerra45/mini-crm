document.addEventListener("DOMContentLoaded", () => {

    checkLogin();

    loadCustomers();

});


// Check Login

function checkLogin(){

    const currentUser =
    JSON.parse(
        sessionStorage.getItem("currentUser")
    );

    if(!currentUser){

        window.location.href =
        "login.html";

    }

}


// Add Customer

function addCustomer(){

    const name =
    document.getElementById("name")
    .value.trim();

    const email =
    document.getElementById("email")
    .value.trim();

    const phone =
    document.getElementById("phone")
    .value.trim();

    const address =
    document.getElementById("address")
    .value.trim();

    if(
        name === "" ||
        email === "" ||
        phone === ""
    ){
        alert("Please Fill Required Fields");
        return;
    }

    fetch(
        "http://localhost:8080/api/customers",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                email,
                phone,
                address
            })
        }
    )

    .then(response => response.json())

    .then(data => {

        alert(
            "Customer Added Successfully"
        );

        clearForm();

        loadCustomers();

    })

    .catch(error => {

        console.error(error);

        alert("Failed To Add Customer");

    });

}


// Load Customers

function loadCustomers(){

    fetch(
        "http://localhost:8080/api/customers"
    )

    .then(response => response.json())

    .then(customers => {

        const tableBody =
        document.getElementById(
            "customerTableBody"
        );

        tableBody.innerHTML = "";

        customers.forEach(customer => {

            const row =
            document.createElement("tr");

            row.innerHTML = `

                <td>${customer.id}</td>

                <td>${customer.name}</td>

                <td>${customer.email}</td>

                <td>${customer.phone}</td>

                <td>${customer.address}</td>

                <td>

                    <button
                        onclick="deleteCustomer(${customer.id})">
                        Delete
                    </button>

                </td>

            `;

            tableBody.appendChild(row);

        });

    })

    .catch(error => {

        console.error(error);

    });

}


// Delete Customer

function deleteCustomer(id){

    if(
        !confirm(
            "Delete This Customer?"
        )
    ){
        return;
    }

    fetch(
        `http://localhost:8080/api/customers/${id}`,
        {
            method:"DELETE"
        }
    )

    .then(response => response.text())

    .then(message => {

        alert(message);

        loadCustomers();

    })

    .catch(error => {

        console.error(error);

        alert("Delete Failed");

    });

}


// Clear Form

function clearForm(){

    document.getElementById(
        "name"
    ).value = "";

    document.getElementById(
        "email"
    ).value = "";

    document.getElementById(
        "phone"
    ).value = "";

    document.getElementById(
        "address"
    ).value = "";

}


// Logout

function logout(){

    sessionStorage.removeItem(
        "currentUser"
    );

    window.location.href =
    "login.html";

}