document.addEventListener("DOMContentLoaded", () => {

    checkLogin();

    loadLeads();

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


// Add Lead

function addLead(){

    const customerId =
    document.getElementById("customerId")
    .value.trim();

    const customerName =
    document.getElementById("customerName")
    .value.trim();

    const phone =
    document.getElementById("phone")
    .value.trim();

    const email =
    document.getElementById("email")
    .value.trim();

    const source =
    document.getElementById("source")
    .value.trim();

    const status =
    document.getElementById("status")
    .value;

    const assignedTo =
    document.getElementById("assignedTo")
    .value.trim();

    if(
        customerId === "" ||
        customerName === "" ||
        phone === "" ||
        email === ""
    ){
        alert("Please Fill Required Fields");
        return;
    }

    fetch(
        "http://localhost:8080/api/leads",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                customerId,
                customerName,
                phone,
                email,
                source,
                status,
                assignedTo
            })
        }
    )

    .then(response => response.json())

    .then(data => {

        alert("Lead Added Successfully");

        clearForm();

        loadLeads();

    })

    .catch(error => {

        console.error(error);

        alert("Failed To Add Lead");

    });

}


// Load Leads

function loadLeads(){

    fetch(
        "http://localhost:8080/api/leads"
    )

    .then(response => response.json())

    .then(leads => {

        const tableBody =
        document.getElementById(
            "leadTableBody"
        );

        tableBody.innerHTML = "";

        leads.forEach(lead => {

            const row =
            document.createElement("tr");

            row.innerHTML = `

                <td>${lead.customerId}</td>
                <td>${lead.customerName}</td>
                <td>${lead.phone}</td>
                <td>${lead.email}</td>
                <td>${lead.source}</td>
                <td>${lead.status}</td>
                <td>${lead.assignedTo}</td>

                <td>

                    <button
                        onclick="deleteLead(${lead.customerId})">
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


// Delete Lead

function deleteLead(customerId){

    if(
        !confirm(
            "Delete This Lead?"
        )
    ){
        return;
    }

    fetch(
        `http://localhost:8080/api/leads/${customerId}`,
        {
            method:"DELETE"
        }
    )

    .then(response => response.text())

    .then(message => {

        alert(message);

        loadLeads();

    })

    .catch(error => {

        console.error(error);

        alert("Delete Failed");

    });

}


// Clear Form

function clearForm(){

    document.getElementById(
        "customerId"
    ).value = "";
    
    document.getElementById(
        "customerName"
    ).value = "";

    document.getElementById(
        "phone"
    ).value = "";

    document.getElementById(
        "email"
    ).value = "";

    document.getElementById(
        "source"
    ).value = "";

    document.getElementById(
        "assignedTo"
    ).value = "";

}