<?php
require_once "./getProblems.php";
?>

<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <title>Plant UML </title>
    <link rel="stylesheet" href="../src/css/style.css">
    </style>
</head>

<?php
$json_items = load_json();
$get_id = $_GET["id"];
$id = $get_id - 1;
$title = $json_items[$id]["title"];
$theme = $json_items[$id]["theme"];
$uml = $json_items[$id]["uml"];
?>

<body>
    <div class="d-flex flex-col h-screen ">
        <div class="d-flex font-medium text-center text-gray-500 underline-b">
            <ul class="flex flex-wrap justify-end -mb-px">
                <li class="me-2 border-b-2 hover:border-gray-400">
                    <a id="editor" href="../index.php" class="inline-block p-4 rounded-t-lg text-gray-500 hover:text-black hover:border-gray-300" style="text-decoration:none;">
                        Editor
                    </a>
                </li>
                <li class="me-2 border-b-2 hover:border-gray-400">
                    <a id="exercices" href="../pages/problems.php" class="active inline-block p-4 rounded-t-lg text-gray-500 hover:text-black hover:border-gray-300" style="text-decoration:none;">
                        Exercices
                    </a>
                </li>
            </ul>
        </div>
        <h1 class="text-center">
            <?php
            echo $title;
            ?>
        </h1>
        <div class="p-3 flex items-center justify-center sticky top-0 bg-white">
            <button id="ans_uml" value="on" class="bg-transparent mx-1 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded">
                Show Anwer
            </button>
        </div>
        <div class="prose flex flex-col h-full lg:flex-row px-5 lg:px-5 py-5 lg:py-2">
            <div id="editor-container" class="w-full lg:w-1/3 h-1/3 md:h-3/4 lg:h-full" style="border:1px solid grey">
            </div>
            <div class="w-full lg:w-1/3 h-1/3 md:h-3/4 lg:h-full overflow-scroll" style="border:1px solid grey">
                <div class="p-3 flex items-center justify-center sticky top-0 bg-white">
                    <button id="png" value="on" class="bg-transparent mx-1 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded">
                        png
                    </button>
                    <button id="svg" value="off" class="bg-transparent mx-1 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded">
                        svg
                    </button>
                    <button id="text" value="on" class="bg-transparent mx-1 font-semibold py-1 px-2 border hover:bg-blue-500 text-blue-700  hover:text-white  border-blue-500 hover:border-transparent rounded">
                        text
                    </button>
                </div>
                <div id="converted-ele" class="p-2">
                </div>
            </div>
            <div id="answer_area" data-php-variable="<?php echo $uml; ?>" class="w-full lg:w-1/3 h-1/3 md:h-3/4 lg:h-full overflow-scroll" style="border:1px solid grey">
            </div>
        </div>
    </div>
</body>
<script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.20.0/min/vs/loader.min.js"></script>
<script src="../src/js/problem_page.js"></script>
<script src="../src/js/main.js"></script>

</html>