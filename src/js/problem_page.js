function showAnswer(uml, url) {
    const show_ans = document.getElementById("show_ans");
    const answer_area = document.getElementById("answer_area");

    const value = show_ans.value

    if (value == "off") {
        // 回答が表示　→ 隠す
        show_ans.innerHTML = "Hide Answer"
        show_ans.classList.remove("hover:bg-gray-400", "text-gray-600", "hover:text-white", "border-gray-400");
        show_ans.classList.add("hover:bg-white-500", "text-white", "hover:text-white", "border-gray-400", "bg-gray-400");
        show_ans.value = "on";


        answer_area.innerHTML = "";
        console.log(uml);
        let p = document.createElement("p");
        p.classList.add("overflow-y-hidden")
        answer_area.append(p);
        p.innerText = uml;
    } else {
        // 回答を隠す → 表示
        show_ans.classList.remove("hover:bg-white-500", "text-white", "hover:text-white", "border-gray-400", "bg-gray-400");
        show_ans.classList.add("hover:bg-gray-400", "text-gray-600", "hover:text-white", "border-gray-400");
        show_ans.innerHTML = "Show Answer"
        show_ans.value = "off"

        answer_area.innerHTML = "";
        let img = document.createElement("img");
        img.src = url;
        answer_area.append(img);
    }
}