function tableBuilder() {
    return (
        '<table class="table" id="objectTable">' +
        "<thead>" +
        "<tr>" +
        '<th scope="col">#</th>' +
        '<th scope="col">Nome</th>' +
        '<th scope="col">Verificado</th>' +
        '<th scope="col">Observações</th>' +
        '<th scope="col">Imagem</th>' +
        "</tr>" +
        "</thead>" +
        '<tbody id="objectTBody">' +
        "</tbody>" +
        "</table>"
    );
}

function buildTableExistentRow(data, row) {
    let movement;
    if (data.object.movement.length != 0) {
        movement = data.object.movement[data.object.movement.length - 1];
        createdAt = movement.createdAt.toString().split('-');
        whenBack = movement.whenBack.toString().split('-');
        document.getElementById('observations-' + data.object.id).innerHTML = 'Devolução pendente, foi movimentado para ' +
            movement.Place.name + ' por ' + movement.User.name +
            ' e a devolução não foi registrada. A previsão do empréstimo era de ' + createdAt[2].split('T')[0] + '/' + createdAt[1] +
            '/' + createdAt[0] + ' até ' + whenBack[2].split('T')[0] + '/' + whenBack[1] + '/' + whenBack[0];
        row.setAttribute("class", "table-danger");
    }
}

function buildTableRow(data) {
    let movement;
    if (data.object.movement.length != 0) {
        movement = data.object.movement[data.object.movement.length - 1];
        return (
            '<tr id="' +
            data.object.id +
            '">' +
            "<td>" +
            data.object.id +
            "</td>" +
            "<td>" +
            data.object.name +
            "</td>" +
            '<td id="iconCheck-' + data.object.id + '">' +
            '<i class="bi bi-dash-square"></i>' +
            "</td>" +
            '<td id="observations-' + data.object.id + '">' +
            'Devolução pendente, foi movimentado para ' + movement.Place.name + ' por ' + movement.User.name + ' e a devolução não foi registrada' +
            "</td>" +
            "<td>" +
            data.object.imagePath +
            "</td>" +
            "</tr>"
        );
    } else if (data.isThere == false) {
        movement = data.object.movement[data.object.movement.length - 1];
        return (
            '<tr id="' +
            data.object.id +
            '"class="table-danger">' +
            "<td>" +
            data.object.id +
            "</td>" +
            "<td>" +
            data.object.name +
            "</td>" +
            '<td id="iconCheck-' + data.object.id + '">' +
            '<i class="bi bi-dash-square"></i>' +
            "</td>" +
            '<td id="observations-' + data.object.id + '">' +
            'Objeto marcado como perdido, ele deveria estar em ' + data.place.name + ' em ' + data.place.contextPlace.name +
            "</td>" +
            "<td>" +
            data.object.imagePath +
            "</td>" +
            "</tr>"
        );
    }
    return (
        '<tr id="' +
        data.object.id +
        '">' +
        "<td>" +
        data.object.id +
        "</td>" +
        "<td>" +
        data.object.name +
        "</td>" +
        '<td id="iconCheck-' + data.object.id + '">' +
        '<i class="bi bi-dash-square"></i>' +
        "</td>" +
        '<td id="observations-' + data.object.id + '">' +
        "</td>" +
        "<td>" +
        data.object.imagePath +
        "</td>" +
        "</tr>"
    );
}
const insertBox = document.getElementById("insertBox");
const objects = Array();
const whatDo = { notFoundObjects: 0, wrongPlaceObjects: 0 };
let inserting = true;

function switchingInsert(element) {
    if (inserting) {
        inserting = false;
        element.innerHTML = 'Removendo'
        element.setAttribute("class", "btn btn-danger")
    } else {
        inserting = true;
        element.innerHTML = 'Inserindo'
        element.setAttribute("class", "btn btn-success")
    }
}
function databuilder(data) {
    const found = objects.includes(data);
    const regex = /^[0-9a-zA-Z]+$/;
    if (!found && regex.test(data) && inserting) {
        objects.push(data);
        const row = document.getElementById(data);
        if (row) {
            row.setAttribute("class", "table-success");
            document.getElementById(`iconCheck-${data}`).innerHTML = '<i class="bi bi-check-square"></i>'
        }
    }
    if (found && regex.test(data) && !inserting) {
        objects.splice(objects.indexOf(data), 1)
        const row = document.getElementById(data);
        if (row)
            row.removeAttribute("class");
        document.getElementById(`iconCheck-${data}`).innerHTML = '<i class="bi bi-dash-square"></i>'
    }
    insertBox.value = "";
    insertBox.focus();
    //console.log(objects)
}
insertBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
        databuilder(insertBox.value);
    }
});

const modal = document.getElementById("finishingVerifyModal")

function verifyAmbient(id) {
    window.location = "/places/verifying/" + id;
}
function handleObjects(value, element, attributeName) {
    document.getElementsByName(attributeName).forEach((e) => {
        e.setAttribute("class", "card");
    });
    if (document.documentElement.getAttribute("data-bs-theme") === "dark") {
        element.setAttribute("class", "card selected text-dark");
    } else {
        element.setAttribute("class", "card selected");
    }
    whatDo[attributeName] = value;
    //console.log(whatDo);
}
function notFoundObjects(value, element) {
    handleObjects(value, element, "notFoundObjects");
}
function wrongPlaceObjects(value, element) {
    handleObjects(value, element, "wrongPlaceObjects");
}
