document.addEventListener("DOMContentLoaded", () => {

    checkLogin();

    loadSummary();

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

        return;
    }

    if(currentUser.role !== "ADMIN"){

        alert(
            "Access Denied"
        );

        window.location.href =
        "dashboard.html";

    }

}


// Load Summary Report

function loadSummary(){

    fetch(
        "http://localhost:8080/api/reports/summary"
    )

    .then(response => {

        if(!response.ok){

            throw new Error(
                "Failed To Load Reports"
            );

        }

        return response.json();

    })

    .then(data => {

        document.getElementById(
            "totalLeads"
        ).innerText =
        data.totalLeads || 0;

        document.getElementById(
            "convertedLeads"
        ).innerText =
        data.convertedLeads || 0;

        document.getElementById(
            "newLeads"
        ).innerText =
        data.newLeads || 0;

        document.getElementById(
            "contactedLeads"
        ).innerText =
        data.contactedLeads || 0;

        document.getElementById(
            "followupLeads"
        ).innerText =
        data.followupLeads || 0;

        document.getElementById(
            "rejectedLeads"
        ).innerText =
        data.rejectedLeads || 0;

        document.getElementById(
            "totalCustomers"
        ).innerText =
        data.totalCustomers || 0;

        document.getElementById(
            "totalEmployees"
        ).innerText =
        data.totalEmployees || 0;

        document.getElementById(
            "totalFollowups"
        ).innerText =
        data.totalFollowups || 0;

    })

    .catch(error => {

        console.error(error);

        alert(
            "Unable To Load Reports"
        );

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