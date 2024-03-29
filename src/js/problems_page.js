function moveToDetailPage(id) {
    console.log(id)
    window.location.href = "problem.php?id=" + id ;
}

function fetch_jsonFile() {
    const jsonPath = "../../json/problems.json"

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", jsonPath, true);

        xhr.responseType = "json";
        xhr.onload = function () {
            if (xhr.status == 200) {
                resolve(xhr.response);
            } else {
                reject(new Error('Request failed with status', xhr.status));
            }
        }

        xhr.onerror = function () {
            reject(new Error('Network request failed'));
        };

        xhr.send();
    });
}

function createTableElement() {
    fetch_jsonFile()
        .then(jsonData => {
            console.log("fetched data", jsonData);
            for (let i = 0; i < jsonData.length; i++) {
                let currData = jsonData[i];
                const ele_id = currData["id"];

                let tabel_tr = document.createElement("tr");
                tabel_tr.id = `tableItem_${currData["id"]}`
                tabel_tr.classList.add("hover:bg-gray-200", "border-b", "border-gray-200")
                tabel_tr.addEventListener("click", () => {
                    moveToDetailPage(ele_id)
                })

                let id_td = document.createElement("td");
                id_td.id = `id_${ele_id}`;
                id_td.classList.add("'px-4", "py-2");

                let title_td = document.createElement("td");
                title_td.id = `title_${ele_id}`;
                title_td.classList.add("'px-4", "py-2");

                let theme_td = document.createElement("td");
                theme_td.id = `theme${ele_id}`;
                theme_td.classList.add("'px-4", "py-2");

                id_td.innerHTML = ele_id;
                title_td.innerHTML = currData["title"];
                theme_td.innerHTML = currData["theme"];

                tabel_tr.append(id_td, title_td, theme_td);
                table_info.append(tabel_tr)
            }
        })
        .catch(error => {
            console.error("Error:", error.message)
        });

    let table_info = document.getElementById("table_info");
}

createTableElement()