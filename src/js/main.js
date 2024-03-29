const converted_ele = document.getElementById("converted-ele");


require.config({
    paths: {
        'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.20.0/min/vs'
    }
});

require(['vs/editor/editor.main'], function () {
    let editor = monaco.editor.create(document.getElementById('editor-container'), {
        value: "",
        language: 'plaintext'
    });

    // window.addEventListener("load", () => {
    //     // let value = editor.getValue();
    //     // let highlight = document.getElementById("highlight").value;
    //     updateRender(value, highlight, "preview")
    // })

    editor.onDidChangeModelContent(() => {
        let value = editor.getValue();

        // console.log(JSON.stringify(params));

        updateRender(value, "png");
        // updateRender(params, "uml");
        //     fetch("../../pages/problem.php", {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        //         body: JSON.stringify(params)
        //     })
        //         .then(response => {
        //             // if (!response.ok) {
        //             //     throw new Error("Network response is not OK");
        //             // }
        //             return response.text()
        //         })
        //         .then(data => {
        //             console.log(data)
        //         })
        //         .catch(error => {
        //             console.error('There was a problem with your fetch operation:', error);
        //         });
    });
});

function updateRender(text, type) {
    const params = {
        value: text,
        type: type
    }

    const requet = new Request("../../encode.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
    })

    fetch(requet)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.text(); // レスポンスをテキスト形式で取得
        })
        .then(data => {
            console.log(converted_ele);
            converted_ele.innerHTML = `<img src=${data} alt="converted uml">`;
            console.log(converted_ele);
            console.log(data);
        })
        .catch(error => {
            console.error("There was a problem with the fetch operation:", error);
        });
}


function activateTabs() {
    let editor = document.getElementById("editor");
    let exercices = document.getElementById("exercices");
}
