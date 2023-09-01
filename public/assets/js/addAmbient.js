//Start add ambient input logic
document.getElementById("btnMorePlaces").addEventListener("click", () => {
    document.getElementById("morePlacesDiv").removeAttribute("hidden");
    document
        .getElementById("morePlacesInputId1")
        .setAttribute("name", "morePlacesInputId");
    document
        .getElementById("morePlacesInputName1")
        .setAttribute("name", "morePlacesInputName");
});

//Start similarCount variable with 2 because the first one is on document and hidden
let similarCount = 2;
document
    .getElementById("addMorePlaces")
    .addEventListener("click", () => renderNewPlaceInput());
function renderNewPlaceInput() {


    const morePlacesDiv = document.getElementById("morePlacesDiv");

    const inputDiv = document.createElement("div");
    inputDiv.setAttribute("class", "col-sm-3 p-2 input-group has-validation");
    inputDiv.setAttribute("id", "morePlacesInputDiv" + similarCount);

    //Start ID

    const idDiv = document.createElement("div");
    idDiv.setAttribute("class", "col-sm-4");

    const idLabel = document.createElement("label");
    idLabel.setAttribute("for", "morePlacesInputId" + similarCount);
    idLabel.setAttribute("class", "form-label");
    idLabel.innerHTML = "Id";

    const validationDivId = document.createElement("div");
    validationDivId.setAttribute("class", "input-group has-validation");

    const inputId = document.createElement("input");

    inputId.setAttribute("type", "text");
    inputId.setAttribute("class", "form-control");
    inputId.setAttribute("name", "morePlacesInputId");
    inputId.setAttribute("id", "morePlacesInputId" + similarCount);
    inputId.setAttribute("required", "true");

    const invalidId = document.createElement("div");
    invalidId.setAttribute("class", "invalid-feedback");
    invalidId.innerHTML = "Preencha a identificação visual do lugar a ser cadastrado";

    validationDivId.appendChild(inputId);
    validationDivId.appendChild(invalidId);

    idDiv.appendChild(idLabel);
    idDiv.appendChild(validationDivId);

    inputDiv.appendChild(idDiv);

    //End ID

    //Start Name

    const nameDiv = document.createElement("div");
    nameDiv.setAttribute("class", "col-sm-4");

    const nameLabel = document.createElement("label");
    nameLabel.setAttribute("for", "morePlacesInputName" + similarCount);
    nameLabel.setAttribute("class", "form-label");
    nameLabel.innerHTML = "Nome";

    const validationDivName = document.createElement("div");
    validationDivName.setAttribute("class", "input-group has-validation");

    const inputName = document.createElement("input");

    inputName.setAttribute("type", "text");
    inputName.setAttribute("class", "form-control");
    inputName.setAttribute("name", "morePlacesInputName");
    inputName.setAttribute("id", "morePlacesInputName" + similarCount);
    inputName.setAttribute("onkeydown", "testForRender(event)");
    inputName.setAttribute("required", "true");

    const invalidName = document.createElement("div");
    invalidName.setAttribute("class", "invalid-feedback");
    invalidName.innerHTML = "Preencha o nome do lugar a ser adicionado";

    validationDivName.appendChild(inputName);
    validationDivName.appendChild(invalidName);

    nameDiv.appendChild(nameLabel);
    nameDiv.appendChild(validationDivName);

    inputDiv.appendChild(nameDiv);

    //End Name

    //Start Remove Button

    const removeDiv = document.createElement("div");
    removeDiv.setAttribute("class", "col-sm-3 pt-2 mx-auto mt-4");

    const removeButton = document.createElement("button");
    removeButton.setAttribute("class", "btn btn-outline-danger");
    removeButton.setAttribute("type", "button");
    removeButton.setAttribute("rownumber", similarCount);
    removeButton.setAttribute("onclick", "removeSimilar(this)");
    removeButton.innerHTML = "Remover";
    removeDiv.appendChild(removeButton);

    inputDiv.appendChild(removeDiv);
    //End Remove Button
    morePlacesDiv.appendChild(inputDiv);
    const buttonDiv = document.getElementById("addMorePlacesDiv");

    buttonDiv.remove();

    morePlacesDiv.appendChild(buttonDiv);
    inputId.focus();
    similarCount++;
}
function testForRender(event) {
    if (event.key === "Enter" || event.keyCode === 13) {
        renderNewPlaceInput();
    }
}
function removeSimilar(element) {
    const number = element.getAttribute("rownumber");
    document.getElementById("morePlacesInputDiv" + number).remove();
    element.parentElement.remove();
}

//End add ambient input logic

//Start logic to select Context
document.addEventListener("DOMContentLoaded", () => {
    fetch("/api/v1/context", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(async (response) => {
        if (response.status == 201 || response.status == 200) {
            renderContexts(await response.json());
        }
        if (response.status == 404) {
            console.log(await response.json());
        }
    });
});

let idContext = 0;

function renderContexts(data) {
    const contextList = document.getElementById("contextList");
    contextList.innerHTML = "";
    data.forEach((context) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        //class="dropdown-item" onclick="selectContext(this)
        a.setAttribute("class", "dropdown-item");
        a.innerHTML = context.name;
        a.setAttribute("value", context.id);
        a.setAttribute("onclick", "selectContext(this)");
        li.appendChild(a);
        contextList.appendChild(li);
    });
}
function selectContext(element) {
    idContext = element.getAttribute("value");
    document.getElementById("contextButton").innerHTML = element.innerHTML;
    document.getElementById("placeAlert").setAttribute("hidden", "true");
}

//End logic to select Context

//Start logic to save ambient
const modalFinish = new bootstrap.Modal(document.getElementById('finishAddObjectModal'));
let bodyObject;

document.getElementById("saveButton").addEventListener("click", (event) => {
    if (idContext == 0) {
        document.getElementById("placeAlert").removeAttribute("hidden");
        return;
    }

    const forms = document.querySelectorAll(".needs-validation");
    let isValid = true;
    Array.from(forms).forEach((form) => {
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
            isValid = false;
        }
        form.classList.add("was-validated");
    });

    if (!isValid) {
        return;
    }

    const placeName = document.getElementById("placeName");
    const placeId = document.getElementById("placeId");

    const morePlacesId = document.getElementsByName("morePlacesInputId");
    const morePlacesName = document.getElementsByName("morePlacesInputName");
    const morePlaces = Array();
    const tableBuilderAccepted = document.createElement("tbody");
    tableBuilderAccepted.setAttribute("id", "mFAOtBody");
    const tableBuilderDenied = document.createElement("tbody");
    tableBuilderDenied.setAttribute("id", "mFAOdeniedTBody");
    const notAdded = Array();

    function buildTableRow(dataObject, element = tableBuilderAccepted) {
        const tr = document.createElement("tr")
        const th = document.createElement("th");
        th.setAttribute("scope", "row");
        th.innerHTML = dataObject.vid;
        const td = document.createElement("td");
        td.innerHTML = dataObject.name;
        tr.appendChild(th);
        tr.appendChild(td);
        element.appendChild(tr);
    }

    buildTableRow({ vid: placeId.value, name: placeName.value });
    if (morePlacesId.length > 0) {
        morePlacesId.forEach((placeId, index) => {
            if (!morePlaces.includes(placeId.value) && placeId.value != "") {
                if (morePlacesName[index].value != "") {
                    const object = {
                        vid: placeId.value,
                        name: morePlacesName[index].value,
                        context: idContext
                    }
                    morePlaces.push(object);
                    buildTableRow(object);

                } else {
                    const object = {
                        vid: placeId.value,
                        name: "(Nenhum valor foi adicionado)",
                        context: idContext
                    }
                    notAdded.push(object);
                    buildTableRow(object, tableBuilderDenied);
                }
            } else {
                const object = {
                    vid: "(Nenhum valor foi adicionado)",
                    name: morePlacesName[index].value,
                    context: idContext
                }
                notAdded.push(object);
                buildTableRow(object, tableBuilderDenied);
            }
        });
    }

    bodyObject = {
        vid:placeId.value,
        name:placeName.value,
        morePlaces:morePlaces,
        notAdded:notAdded,
        idContext:idContext
    }

    document.getElementById("mFAOl1").innerHTML = `Você está adicionando ${morePlaces.length + 1}
    ambientes ao sistema e colocando no contexto ${document.getElementById("contextButton").innerHTML}`;
    if (document.getElementById("mFAOtBody") !== null) {
        document.getElementById("mFAOtBody").remove();
    }
    
    document.getElementById("mFAOtable").appendChild(tableBuilderAccepted);

    if (notAdded.length>0) {
        document.getElementById("mFAOdeniedDiv").removeAttribute("hidden");
        if (document.getElementById("mFAOdeniedTBody") !== null) {
            document.getElementById("mFAOdeniedTBody").remove();
        }
        document.getElementById("mFAOdeniedTable").appendChild(tableBuilderDenied);
    }else{
        document.getElementById("mFAOdeniedDiv").setAttribute("hidden","true");
    }

    modalFinish.show();
});
document
    .getElementById("finishSave")
    .addEventListener("click", (event) => {
        save();
    });
function save() {
    const modalContent = document.getElementById("mFAOContent");
    modalContent.setAttribute("hidden", "true");
    document.getElementById("mFAOLoading").removeAttribute("hidden");
    document.getElementById("mFAOFooter").setAttribute("hidden", "true")
    document.getElementById("mFAOErrorEnd").setAttribute("hidden", "true")
    try {
        fetch("/api/v1/place", {
            method: "POST",
            body: JSON.stringify(bodyObject),
            headers:{
                "Content-Type":"application/json"
            }
        })
            .then(async (response) => {
                if (response.status == 200 || response.status == 201) {
                    document.getElementById("mFAOLoading").setAttribute("hidden", "true")
                    document.getElementById("mFAOSuccessEnd").removeAttribute("hidden")
                }
                console.log(await response.json());
            })
    } catch (error) {
        document.getElementById("mFAOLoading").setAttribute("hidden", "true")
        document.getElementById("mFAOErrorEnd").removeAttribute("hidden")
    }
}
//End logic to save object



function datetime(data) {
    const date = data.toString().split("-");
    return (
        date[2].split("T")[0] +
        "/" +
        date[1] +
        "/" +
        date[0] +
        " às " +
        date[2].split("T")[1].split(":")[0] +
        ":" +
        date[2].split("T")[1].split(":")[1]
    );
}