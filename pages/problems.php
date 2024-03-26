<?php
require_once "./getProblems.php";
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../src/css/style.css">
    <title>UML問題集</title>
</head>


<body>
    <div class="flex flex-col h-full p-10 ">
        <h2 class="mx-auto">Coding Problems</h2>
        <div class="w-full">
            <table class="table-auto mx-auto  w-8/12">
                <thead class="border-b-2 border-gray-400">
                    <tr>
                        <th class="text-left px-4 py-2">ID</th>
                        <th class="text-left px-4 py-2">Title</th>
                        <th class="text-left px-4 py-2">Theme</th>
                    </tr>
                </thead>
                <tbody id="table_info">
                </tbody>
        </div>
    </div>

</body>
<script src="../src/js/problems_page.js"></script>

</html>