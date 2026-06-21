document.addEventListener("DOMContentLoaded", () => {

    checkLogin();

    loadFollowups();

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


// Add Followup

function addFollowup(){

    const leadId =
    document.getElementById("leadId")
    .value.trim();

    const followupDate =
    document.getElementById("followupDate")
    .value;

    const notes =
    document.getElementById("notes")
    .value.trim();

    if(
        leadId === "" ||
        followupDate === "" ||
        notes === ""
    ){
        alert("Please Fill All Fields");
        return;
    }

    fetch(
        "http://localhost:8080/api/followups",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                leadId,
                followupDate,
                notes
            })
        }
    )

    .then(response => response.json())

    .then(data => {

        alert(
            "Followup Added Successfully"
        );

        clearForm();

        loadFollowups();

    })

    .catch(error => {

        console.error(error);

        alert("Failed To Add Followup");

    });

}


// Load Followups

function loadFollowups(){

    fetch(
        "http://localhost:8080/api/followups"
    )

    .then(response => response.json())

    .then(followups => {

        const tableBody =
        document.getElementById(
            "followupTableBody"
        );

        tableBody.innerHTML = "";

        followups.forEach(followup => {

            const row =
            document.createElement("tr");

            row.innerHTML = `

                <td>${followup.id}</td>

                <td>${followup.leadId}</td>

                <td>${followup.followupDate}</td>

                <td>${followup.notes}</td>

                <td>

                    <button
                    onclick="deleteFollowup(${followup.id})">
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


// Delete Followup

function deleteFollowup(id){

    if(
        !confirm(
            "Delete This Followup?"
        )
    ){
        return;
    }

    fetch(
        `http://localhost:8080/api/followups/${id}`,
        {
            method:"DELETE"
        }
    )

    .then(response => response.text())

    .then(message => {

        alert(message);

        loadFollowups();

    })

    .catch(error => {

        console.error(error);

        alert("Delete Failed");

    });

}


// Clear Form

function clearForm(){

    document.getElementById(
        "leadId"
    ).value = "";

    document.getElementById(
        "followupDate"
    ).value = "";

    document.getElementById(
        "notes"
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