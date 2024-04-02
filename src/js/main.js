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

    let currentURL = window.location.href;
    if (currentURL.includes("problem.php")){
        problemPage_buttonClcik(editor)
    }else if (currentURL.includes("index.php")){
        Editor_buttonClcik(editor);
    }

    editor.onDidChangeModelContent(() => {
        let value = editor.getValue();
        const png = document.getElementById("png");
        const svg = document.getElementById("svg");
        const text = document.getElementById("text");

        if (png.value == "on") {
            updateRender(value, "png");
        } else if (svg.value == "on") {
            updateRender(value, "svg");
        } else if (text.value == "on") {
            updateRender(value, "txt");
        } else {
            updateRender(value, "uml");
        }
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
            if (type == "png") {
                converted_ele.innerHTML = `<img src=${data} alt="converted uml">`;
                console.log(converted_ele);
            }
            else if (type == "svg") {
                console.log(data);
                converted_ele.innerHTML = `<img src=${data} alt="converted uml">`;
                console.log(converted_ele);

            } else if (type == "txt") {
                converted_ele.innerHTML = `${data}`;
                console.log(data);

            } else {
                converted_ele.innerHTML = "";
            }
        })
        .catch(error => {
            console.error("There was a problem with the fetch operation:", error);
        });
}


function change_style_off(part) {
    part.classList.remove("hover:bg-white", "hover:text-black", "hover:border-gray-400", "text-white", "bg-gray-400", "border-gray-400");
    part.classList.add("hover:bg-gray-400", "hover:text-white", "text-gray-700", "border-gray-400");
}

function change_style_on(part) {
    part.classList.remove("hover:bg-gray-400", "hover:text-white", "text-gray-700", "border-gray-400");
    part.classList.add("hover:bg-white", "hover:text-black", "hover:border-gray-400", "text-white", "bg-gray-400", "border-gray-400");
}


function problemPage_buttonClcik(editor) {
    const png = document.getElementById("png");
    const svg = document.getElementById("svg");
    const text = document.getElementById("text");

    png_click(editor, png, svg, text);
    svg_click(editor, png, svg, text);
    text_click(editor, png, svg, text);
}


function Editor_buttonClcik(editor) {
    const png = document.getElementById("png");
    const svg = document.getElementById("svg");
    const text = document.getElementById("text");
    const download = document.getElementById("download");

    png_click(editor, png, svg, text);
    svg_click(editor, png, svg, text);
    text_click(editor, png, svg, text);
    download_click(png, svg, text, download);
}


function png_click(editor, png, svg, text) {
    png.addEventListener("click", () => {
        let value = editor.getValue();
        if (png.value == "off") {
            // pngをonに変える
            png.value = "on";
            svg.value = "off";
            text.value = "off";
            change_style_on(png);
            change_style_off(svg);
            change_style_off(text);
            updateRender(value, "png");
        }
    })
}


function svg_click(editor, png, svg, text) {
    svg.addEventListener("click", () => {
        let value = editor.getValue();
        if (svg.value == "off") {
            png.value = "off";
            svg.value = "on";
            text.value = "off";
            change_style_off(png);
            change_style_on(svg);
            change_style_off(text);
            updateRender(value, "svg");
        }
    })

}


function text_click(editor, png, svg, text) {

    text.addEventListener("click", () => {
        let value = editor.getValue();
        if (text.value == "off") {
            png.value = "off";
            svg.value = "off";
            text.value = "on";

            change_style_off(png);
            change_style_off(svg);
            change_style_on(text);

            updateRender(value, "txt");
        }
    })

}


function download_click(png, svg, text, download) {
    download.addEventListener("click", () => {
        if (png.value == "on") {
            const imgElement = converted_ele.getElementsByTagName("img");
            const imgUrl = imgElement[0].getAttribute("src");
            downloadImg(imgUrl, "png");
        } else if (svg.value == "on") {
            const imgElement = converted_ele.getElementsByTagName("img");
            const imgUrl = imgElement[0].getAttribute("src");
            downloadImg(imgUrl, "svg");
        } else if (text.value == "on") {
            const preElement = converted_ele.getElementsByTagName("pre");
            const data = preElement[0].innerText;
            downloadText(data);
        }
    })
}


function downloadText(data) {
    console.log("ダウンロードするコンテンツ => ", data);
    let blob = new Blob([data], { "type": "text/html" })

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "converted.txt";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}


function downloadImg(url, type) {
    fetch(url)
        .then(response => response.blob())
        .then(blob => {
            let imageUrl = URL.createObjectURL(blob);
            // ダウンロード用のリンクを作成し、画像URLを設定する
            let downloadLink = document.createElement("a");
            downloadLink.href = imageUrl;

            // ダウンロード時のファイル名を指定（任意）
            console.log("download", "imgage." + type);
            downloadLink.download = "plantUML." + type;

            // リンクをクリックして画像をダウンロードする
            downloadLink.click();

            // 使用後にURLを解放する（メモリーリークを防ぐため）
            URL.revokeObjectURL(imageUrl);
        })
        .catch(error => console.error("画像のダウンロード中にエラーが発生しました:", error));
}