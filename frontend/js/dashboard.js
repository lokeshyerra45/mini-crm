document.addEventListener("DOMContentLoaded", () => {

    // Check Login

    const currentUser =
    JSON.parse(
        sessionStorage.getItem("currentUser")
    );

    if(!currentUser){

        window.location.href =
        "login.html";

        return;
    }

    // Welcome Message

    const welcomeUser =
    document.getElementById("welcomeUser");

    if(welcomeUser){

        welcomeUser.innerText =
        "Welcome, " +
        currentUser.name +
        " (" +
        currentUser.role +
        ")";
    }

    // Hide Reports Menu For Employee

    if(currentUser.role === "EMPLOYEE"){

        const reportsMenu =
        document.getElementById("reportsMenu");

        if(reportsMenu){

            reportsMenu.style.display =
            "none";

        }

    }

    loadDashboard();

    loadRecentLeads();

});


// Dashboard Statistics

function loadDashboard(){

    fetch(
        "http://localhost:8080/api/dashboard"
    )

    .then(response => {

        if(!response.ok){

            throw new Error(
                "Dashboard Load Failed"
            );

        }

        return response.json();

    })

    .then(data => {

        const totalLeads =
        document.getElementById(
            "totalLeads"
        );

        const convertedLeads =
        document.getElementById(
            "convertedLeads"
        );

        const pendingLeads =
        document.getElementById(
            "pendingLeads"
        );

        const totalCustomers =
        document.getElementById(
            "totalCustomers"
        );

        const totalUsers =
        document.getElementById(
            "totalUsers"
        );

        if(totalLeads){

            totalLeads.innerText =
            data.totalLeads || 0;

        }

        if(convertedLeads){

            convertedLeads.innerText =
            data.convertedLeads || 0;

        }

        if(pendingLeads){

            pendingLeads.innerText =
            data.pendingLeads || 0;

        }

        if(totalCustomers){

            totalCustomers.innerText =
            data.totalCustomers || 0;

        }

        if(totalUsers){

            totalUsers.innerText =
            data.totalUsers || 0;

        }

    })

    .catch(error => {

        console.error(error);

        alert(
            "Unable To Load Dashboard Data"
        );

    });

}


// Recent Leads Table

function loadRecentLeads(){

    fetch(
        "http://localhost:8080/api/leads"
    )

    .then(response => response.json())

    .then(leads => {

        const tableBody =
        document.getElementById(
            "leadTableBody"
        );

        if(!tableBody){

            return;

        }

        tableBody.innerHTML = "";

        leads.forEach(lead => {

            const row =
            document.createElement("tr");

            row.innerHTML = `

                <td>${lead.customerName}</td>

                <td>${lead.email}</td>

                <td>${lead.phone}</td>

                <td>${lead.status}</td>

            `;

            tableBody.appendChild(row);

        });

    })

    .catch(error => {

        console.error(error);

    });

}


// Logout

function logout(){

    sessionStorage.removeItem(
        "currentUser"
    );

    window.location.href =
    "login.html";

}