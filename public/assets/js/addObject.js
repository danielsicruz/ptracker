//Start similar input logic
document.getElementById("btnSimilar").addEventListener("click", () => {
    document.getElementById("similarDiv").removeAttribute("hidden");
    document
        .getElementById("similarInput1")
        .setAttribute("name", "similarInput");
});

//Start similarCount variable with 2 because the first one is on document and hidden
let similarCount = 2;
document
    .getElementById("addSimilar")
    .addEventListener("click", () => renderNewSimilarInput());
function renderNewSimilarInput() {
    const removeDiv = document.createElement("div");
    removeDiv.setAttribute("class", "col-sm-3 pt-2");

    const similarDiv = document.getElementById("similarDiv");
    similarDiv.appendChild(removeDiv);

    const removeButton = document.createElement("button");
    removeButton.setAttribute("class", "btn btn-outline-danger");
    removeButton.setAttribute("type", "button");
    removeButton.setAttribute("rownumber", similarCount - 1);
    removeButton.setAttribute("onclick", "removeSimilar(this)");
    removeButton.innerHTML = "Remover";
    removeDiv.appendChild(removeButton);

    const inputDiv = document.createElement("div");
    inputDiv.setAttribute("class", "col-sm-3 p-2");
    inputDiv.setAttribute("id", "similarInputDiv" + similarCount);

    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("class", "form-control");
    input.setAttribute("name", "similarInput");
    input.setAttribute("id", "similarInput" + similarCount);
    input.setAttribute("onkeydown", "testForRender(event)");

    inputDiv.appendChild(input);

    similarDiv.appendChild(inputDiv);

    const buttonDiv = document.getElementById("addSimilarDiv");

    buttonDiv.remove();

    similarDiv.appendChild(buttonDiv);
    input.focus();
    similarCount++;
}
function testForRender(event) {
    if (event.key === "Enter" || event.keyCode === 13) {
        renderNewSimilarInput();
    }
}
function removeSimilar(element) {
    const number = element.getAttribute("rownumber");
    document.getElementById("similarInputDiv" + number).remove();
    element.parentElement.remove();
    document.getElementById("similarInput" + (similarCount - 1)).focus();
}

//End similar input logic

//Start logic to select place
const modalPlaces = document.getElementById("placesModal");
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

let idPlace = 0;
function selectAmbient(id, name) {
    document.getElementById("placesButton").innerHTML = name;
    idPlace = id;
    document.getElementById("placeAlert").setAttribute("hidden", "");
}

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
    document.getElementById("contextButton").innerHTML = element.innerHTML;
    fetch("/api/v1/place?context=" + element.getAttribute("value"), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(async (response) => {
        renderPlaces(await response.json());
    });
}

function renderPlaces(places) {
    savePlaces(places);
    filterPlaces("", Array());
    idPlace = 0;
    const placesButton = document.getElementById("placesButton");
    placesButton.removeAttribute("hidden");
    placesButton.innerHTML = "Selecione um ambiente";
    places.forEach((place) => {
        document.getElementById("placeList").innerHTML += cardBuilder(place);
    });
}
function cardBuilder(place) {
    return (
        '<div class="col">' +
        '<div class="card" data-bs-dismiss="modal" data-bs-target="#placesModal" onclick="selectAmbient(' +
        `${place.id},'${place.name}'` +
        ');">' +
        "<img" +
        ' src="/assets/images/Sesi-SP.jpg"' +
        ' class="card-img-top"' +
        ' alt="..."' +
        "/>" +
        '<div class="card-body">' +
        '<h5 class="card-title">' +
        place.name +
        "</h5>" +
        "</div>" +
        "</div>" +
        "</div>"
    );
}
let savedPlaces = Array();
function savePlaces(places) {
    savedPlaces = places;
}
function filterPlaces(search, places) {
    placeList.innerHTML = "";

    const filteredPlaces = places.filter((place) => {
        return (
            place.name.toLowerCase().includes(search.toLowerCase()) ||
            place.vid.includes(search)
        );
    });

    filteredPlaces.forEach((place) => {
        placeList.innerHTML += cardBuilder(place);
    });
}
searchBar.addEventListener("input", () => {
    const searchTerm = searchBar.value;
    filterPlaces(searchTerm, savedPlaces);
});
filterPlaces("", Array());
//End logic to select place

//Start logic to image preview
document.getElementById("imageInput").addEventListener(
    "change",
    (e) => {
        const element = document.getElementById("imageInput");
        if (element.files && element.files[0]) {
            var file = new FileReader();
            file.onload = function (e) {
                document
                    .getElementById("preview")
                    .setAttribute("src", e.target.result);
                document
                    .getElementById("uploadText")
                    .setAttribute("hidden", "true");
                document
                    .getElementById("uploadIcon")
                    .setAttribute("hidden", "true");
            };
            file.readAsDataURL(element.files[0]);
        }
    },
    false
);
//End logic to image preview

//Start logic to save object
const modalFinish = new bootstrap.Modal(document.getElementById('finishAddObjectModal'));
let formData = new FormData();

document.getElementById("saveButton").addEventListener("click", (event) => {
    formData = new FormData();
    if (idPlace == 0) {
        //Limpe os campos se o response for 201
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

    const similars = document.getElementsByName("similarInput");
    const similarIds = Array();
    if (similars.length > 0) {
        similars.forEach((similar) => {
            if (!similarIds.includes(similar.value) && similar.value != "") {
                similarIds.push(similar.value);
            }
        });
    }
    const objectName = document.getElementById("objectName");
    const description = document.getElementById("description");
    const objectId = document.getElementById("objectId");
    const imageInput = document.getElementById("imageInput");

    formData.append("id", objectId.value);
    formData.append("idPlace", idPlace);
    formData.append("name", objectName.value);
    formData.append("description", description.value);
    formData.append("similars", JSON.stringify(similarIds));
    formData.append("image", imageInput.files[0]);

    document.getElementById("mFAOl1").innerHTML = `Você está adicionando ${similarIds.length + 1}
    objetos ao sistema e movendo todos eles a ${document.getElementById("placesButton").innerHTML}`;
    document.getElementById("mFAOl2").innerHTML = `Nome: ${objectName.value}`;
    document.getElementById("mFAOl3").innerHTML = `Descrição: ${description.value}`;
    let stringBuilder = "";
    similarIds.forEach(id => {
        stringBuilder += id + ", ";
    })
    document.getElementById("mFAOl4").innerHTML = "ID: " + stringBuilder + objectId.value;

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
        fetch("/api/v1/object", {
            method: "POST",
            body: formData,
        })
            .then(async (response) => {
                if (response.status == 200 || response.status == 201) {
                    document.getElementById("mFAOLoading").setAttribute("hidden", "true")
                    document.getElementById("mFAOSuccessEnd").removeAttribute("hidden")
                }
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