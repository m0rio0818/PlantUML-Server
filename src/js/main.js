require.config({
    paths: {
        'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.20.0/min/vs'
    }
});

require(['vs/editor/editor.main'], function () {
    let editor = monaco.editor.create(document.getElementById('editor-container'), {
        value: "",
        language: 'markdown'
    });

    // window.addEventListener("load", () => {
    //     // let value = editor.getValue();
    //     // let highlight = document.getElementById("highlight").value;
    //     updateRender(value, highlight, "preview")
    // })

    editor.onDidChangeModelContent(() => {
        // let htmlButton = document.getElementById("html");
        // // let highlight = document.getElementById("highlight").value;
        // let value = editor.getValue();
        // let type = htmlButton.value == "on" ? "html" : "preview";
        // updateRender(value, highlight, type);
    });
});


function update_HTML(editor) {
    let htmlButton = document.getElementById("html");
    htmlButton.addEventListener("click", () => {
        let highlight = document.getElementById("highlight").value;
        let value = editor.getValue();

        if (htmlButton.value == "off") {
            togglePreviewHTML()
            let type = htmlButton.value == "on" ? "html" : "preview";
            updateRender(value, highlight, type);
        }
    })
}

function update_Preview(editor) {
    let preview_button = document.getElementById("preview");
    preview_button.addEventListener("click", () => {
        let highlight = document.getElementById("highlight").value;
        let value = editor.getValue();

        if (preview_button.value == "off") {
            togglePreviewHTML()
            let type = preview_button.value == "on" ? "preview" : "preview";
            updateRender(value, highlight, type);
        }
    })
}


function update_Higlight(editor) {
    let highlight = document.getElementById("highlight");
    let htmlButton = document.getElementById("html");
    highlight.addEventListener("click", (e) => {
        if (e.target.value == "on") {
            highlight.classList.remove("hover:bg-blue-500", "text-blue-700", "hover:text-white", "border-blue-500")
            highlight.classList.add("bg-blue-500", "text-white", "hover:text-blue-500", "hover:bg-white", "hover:border-blue-500")
            e.target.value = "off";
            highlight.innerHTML = "Highlight : OFF";
        }
        else {
            highlight.classList.remove("bg-blue-500", "text-white", "hover:text-blue-500", "hover:bg-white", "hover:border-blue-500")
            highlight.classList.add("hover:bg-blue-500", "text-blue-700", "hover:text-white", "border-blue-500")
            e.target.value = "on";
            highlight.innerHTML = "Highlight : ON";
        }
        console.log("highlightを変更")
        let highlights = document.getElementById("highlight").value;
        let value = editor.getValue();
        let type = htmlButton.value == "on" ? "html" : "preview";
        updateRender(value, highlights, type)
    })
}


function update_download(editor) {

    download.addEventListener("click", () => {
        console.log("ファイルをダウンロードします")
        let highlights = document.getElementById("highlight").value;
        let value = editor.getValue();
        let htmlButton = document.getElementById("html");
        let type = htmlButton.value == "on" ? "html" : "preview";
        updateRender(value, highlights, type);
        // ダウンロードするコンテンツ
        let element = document.getElementById("converted-ele");
        let data;
        if (type == "preview") {
            data = element.innerHTML;
        }
        else {
            data = element.innerText;
        }
        console.log("ダウンロードするコンテンツ => ", data);
        let blob = new Blob([data], { "type": "text/html" })

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = "converted.html";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    })

}


function updateRender(value, highlight, type) {
    const requet = new Request("../convert.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "markdown=" + value + "&highlight=" + highlight + "&type=" + type
    })

    fetch(requet)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.text(); // レスポンスをテキスト形式で取得
        })
        .then(data => {
            let converted_ele = document.getElementById("converted-ele");
            if (type == "preview") {
                converted_ele.innerText = "";
                converted_ele.innerHTML = data;
            }
            else {
                converted_ele.innerHTML = "";
                converted_ele.innerText = data;
            }
        })
        .catch(error => {
            console.error("There was a problem with the fetch operation:", error);
        });
}