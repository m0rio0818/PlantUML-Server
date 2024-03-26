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
                <tbody>
                    <?php
                    $items = json();
                    $totalPages = ceil(count($items) / 10);
                    foreach ($items as $item) {
                        echo sprintf(
                            "<tr  class='hover:bg-gray-200 border-b border-gray-200'>
                                    <td class='px-4 py-2'>%s</td>
                                    <td class='px-4 py-2 mx-auto'>%s</td>
                                    <td class='px-4 py-2'>%s</td>
                                </tr>",
                            $item["id"],
                            $item["title"],
                            $item["theme"],
                        );
                    }
                    ?>
                </tbody>
        </div>
    </div>

</body>

</html>