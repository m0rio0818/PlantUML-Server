<?php
require __DIR__ . '/vendor/autoload.php';
require_once "./pages/getProblems.php";
?>

<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <title><?php $theme ?> </title>
    <link rel="stylesheet" href="../src/css/style.css">
    </style>
</head>

<body>
    <?php $id ?>fetch
    <div class="d-flex flex-col h-screen ">
        <div class="d-flex font-medium text-center text-gray-500 underline-b">
            <ul class="flex flex-wrap justify-end -mb-px">
                <li id="editor" value="on" class="me-2 border-b-2 border-green-500">
                    <a href="../index.php" class="inline-block p-4 rounded-t-lg text-green-500 hover:border-gray-300" style="text-decoration:none;">
                        Editor
                    </a>
                </li>
                <li id="exercices" value="off" class="me-2 border-b-2 hover:border-gray-400">
                    <a href="../pages/problems.php" class="active inline-block p-4 rounded-t-lg text-gray-500 hover:text-black hover:border-gray-300" style="text-decoration:none;">
                        Exercices
                    </a>
                </li>
            </ul>
        </div>
        <h1 class="text-center">
            PlantUML Editor
        </h1>
        <div>
            <div class="p-3 flex items-center justify-center sticky top-0 bg-white">
                <button id="png" value="on" class="bg-transparent mx-1 py-1 px-3 font-semibold border rounded hover:bg-white hover:text-black  hover:border-gray-400 text-white bg-gray-400 border-gray-400 hover:border-transparent">
                    png
                </button>
                <button id="svg" value="off" class="bg-transparent mx-1 py-1 px-3 font-semibold border rounded hover:bg-gray-400 hover:text-white text-gray-700 border-gray-400 hover:border-transparent">
                    svg
                </button>
                <button id="text" value="off" class="bg-transparent mx-1 font-semibold py-1 px-3 border rounded hover:bg-gray-400 hover:text-white text-gray-700 border-gray-400 hover:border-transparent">
                   text
                </button>
                <button id="download" class="bg-transparent mx-1 font-semibold py-1 px-3 border rounded hover:bg-gray-400 text-gray-700  hover:text-white  border-gray-400 hover:border-transparent">
                    Download
                </button>
            </div>
        </div>
        <div class="prose flex flex-col h-full lg:flex-row px-5 lg:px-5 py-5 lg:py-2">
            <div id="editor-container" class="w-full lg:w-1/2 h-1/2 md:h-3/4 lg:h-full" style="border:1px solid grey">
            </div>
            <div class="w-full lg:w-1/2 h-1/2 md:h-3/4 lg:h-full overflow-scroll" style="border:1px solid grey">
                <div id="converted-ele" class="p-2">
                </div>
            </div>
        </div>
    </div>
</body>
<script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.20.0/min/vs/loader.min.js"></script>
<script src="../src/js/problem_page.js"></script>
<script src="../src/js/main.js"></script>

</html>