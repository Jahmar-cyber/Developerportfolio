
function welcomeMessage() {

    document.getElementById("welcome").innerHTML =
        "Welcome! You just built your first interactive website.";

}

function calculate(operation) {

    // Get values from HTML inputs

    let number1 = Number(document.getElementById("num1").value);

    let number2 = Number(document.getElementById("num2").value);

    let result;

    // Perform mathematical operation

    if (operation === "add") {

        result = number1 + number2;

    } else if (operation === "subtract") {

        result = number1 - number2;

    } else if (operation === "multiply") {

        result = number1 * number2;

    } else if (operation === "divide") {

        if (number2 === 0) {
            document.getElementById("result").innerHTML =
                "Cannot divide by zero!";
            return;
        }

        result = number1 / number2;

    }

    // Display result

    document.getElementById("result").innerHTML =
        "Result: " + result;

}


// PROJECT DATA ARRAY

// LOAD SAVED PROJECTS OR CREATE DEFAULT PROJECTS

let defaultProjects = [
    {
        name: "IBM i Business Management System",
        language: "RPGLE, SQL, DB2",
        status: "In Progress"
    },
    {
        name: "C# Student Grade Calculator",
        language: "C#, Visual Studio",
        status: "Completed"
    },
    {
        name: "Python Data Management Application",
        language: "Python",
        status: "In Progress"
    }
];

let projects = JSON.parse(localStorage.getItem("projects")) || defaultProjects;




// TRACK WHICH PROJECT IS BEING EDITED

let editingProjectIndex = null;
function saveProjects() {
    localStorage.setItem("projects", JSON.stringify(projects));
}

// DISPLAY ALL PROJECTS

function displayProjects() {

    let projectList = document.getElementById("projectList");

    projectList.innerHTML = "";

    projects.forEach(function(project, index) {

        let projectCard = document.createElement("div");

        projectCard.className = "project-card";

        let title = document.createElement("h3");
        title.textContent = project.name;

        let language = document.createElement("p");
        language.textContent = "Technology: " + project.language;

        let status = document.createElement("p");
        status.textContent = "Status: " + project.status;

        // CREATE EDIT BUTTON

        let editButton = document.createElement("button");

        editButton.textContent = "Edit";

        editButton.className = "edit-button";

        editButton.addEventListener("click", function() {
            editProject(index);
        });

        // CREATE DELETE BUTTON

        let deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.className = "delete-button";

        deleteButton.addEventListener("click", function() {
            deleteProject(index);
        });

        // ADD ELEMENTS TO PROJECT CARD

        let actions = document.createElement("div");

        actions.className = "project-actions";

        actions.appendChild(editButton);
        actions.appendChild(deleteButton);

        projectCard.appendChild(title);
        projectCard.appendChild(language);
        projectCard.appendChild(status);
        projectCard.appendChild(actions);

        projectList.appendChild(projectCard);

    });

  
// SAVE PROJECTS TO BROWSER STORAGE

function saveProjects() {

    localStorage.setItem(
        "projects",
        JSON.stringify(projects)
    );

}
  

}


// CREATE OR UPDATE PROJECT

function addProject() {

    let name = document.getElementById("projectName").value.trim();

    let language = document.getElementById("projectLanguage").value.trim();

    let status = document.getElementById("projectStatus").value;

    if (name === "" || language === "") {

        alert("Please complete all fields.");

        return;
    }

    let project = {

        name: name,
        language: language,
        status: status

    };

    if (editingProjectIndex === null) {

        // CREATE

        projects.push(project);

    } else {

        // UPDATE

        projects[editingProjectIndex] = project;

    }

    saveProjects();

    cancelEdit();

    displayProjects();

}


// EDIT PROJECT

function editProject(index) {

    let project = projects[index];

    document.getElementById("projectName").value = project.name;

    document.getElementById("projectLanguage").value = project.language;

    document.getElementById("projectStatus").value = project.status;

    editingProjectIndex = index;

    document.getElementById("formTitle").textContent =
        "Edit Project";

    document.getElementById("saveProjectButton").textContent =
        "Save Changes";

    document.getElementById("cancelEditButton").hidden = false;

    document.getElementById("projectName").focus();

}


// DELETE PROJECT

function deleteProject(index) {

    let confirmDelete = confirm(
        "Are you sure you want to delete this project?"
    );

    if (confirmDelete) {

        projects.splice(index, 1);

        saveProjects();

        cancelEdit();

        displayProjects();

    }

}


// CANCEL EDITING

function cancelEdit() {

    editingProjectIndex = null;

    document.getElementById("projectName").value = "";

    document.getElementById("projectLanguage").value = "";

    document.getElementById("projectStatus").value = "In Progress";

    document.getElementById("formTitle").textContent =
        "Add a New Project";

    document.getElementById("saveProjectButton").textContent =
        "Add Project";

    document.getElementById("cancelEditButton").hidden = true;

}


// LOAD PROJECTS

displayProjects();
