function read_jsonFiles() {
    const jsonPath = "../../json/problems.json"
    fetch(jsonPath)
        .then(response => response.json())
        .then(data => {
            jsonData = data; // JSON データをログに表示する例
            localStorage.setItem('jsonData', JSON.stringify(data));
        })
        .catch(error => console.error('Error fetching JSON:', error));
}


function open_jsonFile() {
    const jsonPath = "../../json/problems.json"
    fetch(jsonPath)
        .then(response => response.json())
        .then(data => {
            jsonData = data; // JSON データをログに表示する例
            localStorage.setItem('jsonData', JSON.stringify(data));
        })
        .catch(error => console.error('Error fetching JSON:', error));



    let answer_area = document.getElementById("answer_area");
    let phpVariable = document.getElementById('answer_area').getAttribute('data-php-variable');
    console.log(phpVariable);
}

open_jsonFile()