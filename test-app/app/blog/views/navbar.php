<!DOCTYPE HTML>

<html>

<head>
    <title>Blog</title>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="./views/style.css">
</head>

<body>

    <?php

    $p_ris = DB::getConnection()->query("SELECT * FROM post");

    for ($i = 0; $i < $p_ris->num_rows; $i++) {
        $p[$i] = $p_ris->fetch_array(MYSQLI_ASSOC);
    }
    $str = "<nav>";
    if (isset($_SESSION['email'])) {
        $str .= "<li><a href='newpost'>Nuovo post</a></li>";
    }
    if ($p_ris->num_rows != 0) {
        foreach ($p as $e) {
            $str .= "<li><a href='post?post_id=" . $e['id'] . "'>" . $e['titolo'] . "</a></li>";
        }
    }
    if (isset($_SESSION['email'])) {
        $str .= "<li><a href='?action=logout'>Logout</a></li>";
    }
    $str .= "</ul></nav>";
    echo $str;
    ?>
