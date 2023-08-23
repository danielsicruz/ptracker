document.getElementById("searchButton").addEventListener("click", () => {
    search();
});
insertBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
        search();
    }
});
function search() {
    const id = document.getElementById("insertBox").value;
    const notFound = document.getElementById("notFound");
    try {
        fetch("/api/v1/object/" + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(async (response) => {
            if (response.status === 201 || response.status === 200) {
                // document
                //   .getElementById("mFVLoading")
                //   .setAttribute("hidden", "true");
                // document
                //   .getElementById("mFVSuccessEnd")
                //   .removeAttribute("hidden");
                notFound.setAttribute("hidden", "true");
                render(await response.json());
            } else {
                // document
                //   .getElementById("mFVLoading")
                //   .setAttribute("hidden", "true");
                // document.getElementById("mFVErrorEnd").removeAttribute("hidden");
            }
            if (response.status === 404) {
                notFound.removeAttribute("hidden");
                render("clear");
            }
        });
    } catch (error) {
        // document.getElementById("mFVLoading").setAttribute("hidden", "true");
        // document.getElementById("mFVErrorEnd").removeAttribute("hidden");
        //Algo deu errado
        console.log(error);
    }
}
function render(data) {
    if (data == "clear") {
        document.getElementById("objectId").value = "";
        document.getElementById("objectName").value = "";
        document.getElementById("description").value = "";
        document.getElementById("createdAt").value = "";
        document.getElementById("objectImage").setAttribute("src", "");
        document
            .getElementById("imgDiv")
            .setAttribute(
                "class",
                "img-not-found col-md-5 col-lg-4 order-md-last mx-auto"
            );
        document
            .getElementById("btnHistory")
            .setAttribute("disabled", "true");
    } else {
        document.getElementById("objectId").value = data.id;
        document.getElementById("objectName").value = data.name;
        document.getElementById("description").value = data.description;
        document.getElementById("createdAt").value = datetime(data.createdAt);
        document.getElementById("btnHistory").removeAttribute("disabled");
        document.getElementById("movementsModalLabel").innerHTML =
            "Movimentação de " + data.name + " - ID:" + data.id;

        const imgDiv = document.getElementById("imgDiv");
        imgDiv.innerHTML =
            '<img class="img-fluid" src="" alt="" id="objectImage"/>';
        if (data.imagePath != null) {
            imgDiv.setAttribute("class", "col-md-5 col-lg-4 order-md-last");
            const imgTag = document.getElementById("objectImage");
            imgTag.setAttribute("src", data.imagePath);

            imgTag.onerror = () => {
                imgDiv.setAttribute(
                    "class",
                    "img-not-found col-md-5 col-lg-4 order-md-last mx-auto"
                );
            };
        } else {
            imgDiv.setAttribute(
                "class",
                "img-not-found col-md-5 col-lg-4 order-md-last mx-auto"
            );
        }
    }
}
let movementsData = Array();
document.getElementById("btnHistory").addEventListener("click", () => {
    const id = document.getElementById("objectId").value;
    fetch("/api/v1/movement?idObject=" + id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(async (response) => {
        if (response.status == 201 || response.status == 200) {
            movementsData = await response.json();
        }
        if (response.status == 404) {
            console.log(await response.json());
        }
    });

    fetch("/api/v1/object/" + id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
});
const modal = document.getElementById("movementsModal");
modal.addEventListener("shown.bs.modal", () => {
    if (movementsData.length > 0) {
        const tbMovimentsBody = document.getElementById("movementsBody");
        tbMovimentsBody.innerHTML = "";
        const pages = Math.ceil(movementsData.length / 10);
        movementsData.forEach((movement) => {
            const row = document.createElement("tr");
            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            const td3 = document.createElement("td");
            const td4 = document.createElement("td");
            const td5 = document.createElement("td");
            const td6 = document.createElement("td");
            const td7 = document.createElement("td");
            const td8 = document.createElement("td");
            const td9 = document.createElement("td");
            td1.innerHTML = movement.id;
            td2.innerHTML =
                movement.fromPlace.name +
                " em " +
                movement.fromPlace.contextPlace.name;
            td3.innerHTML =
                movement.toPlace.name +
                " em " +
                movement.toPlace.contextPlace.name;
            td4.innerHTML = movement.User.name;
            td5.innerHTML = datetime(movement.createdAt);
            if (movement.temporary) {
                td6.innerHTML = "Sim";
                td7.innerHTML = datetime(movement.whenBack);
                td8.innerHTML = movement.isBack ? "Sim" : "Não";
                td9.innerHTML = movement.isBack
                    ? datetime(movement.updatedAt)
                    : "Aguardando";
            } else {
                td6.innerHTML = "Não";
                td7.innerHTML = "Não se aplica";
                td8.innerHTML = "Não se aplica";
                td9.innerHTML = "Não se aplica";
            }
            row.appendChild(td1);
            row.appendChild(td2);
            row.appendChild(td3);
            row.appendChild(td4);
            row.appendChild(td5);
            row.appendChild(td6);
            row.appendChild(td7);
            row.appendChild(td8);
            row.appendChild(td9);
            tbMovimentsBody.appendChild(row);
        });
    }
});
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