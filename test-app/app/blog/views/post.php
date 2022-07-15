<?php
$str = "";
if (isset($_GET['post_id'])) {
    $ris = DB::getConnection()->query("SELECT * FROM post WHERE id=" . $_GET['post_id']);
    $e = $ris->fetch_array(MYSQLI_ASSOC);
    $str = "<div id='post_wrapper'><article class='post'>
                <header>
                    <h2>" . $e['titolo'] . "</h2>
                    <address class='email'><a href='mailto:" . $e['email'] . "'>" . $e['email'] . "</a></p>
                    </header>
                        <p>" . $e['contenuto'] . " <br><br>" . "Data inserimento:" . $e['data'] . "</p>" .
        ((isset($_SESSION['ruolo']) && $_SESSION['ruolo'] == 0) ||
            (isset($_SESSION['email']) && ($_SESSION['email'] == $e['email']))
            ? "<br><br><div><a href='?eliminap=" . $e['id']
            . "'>Elimina post</a></div>" : "");
    $x = DB::getConnection()->query(
        "SELECT *
    FROM commenti
    WHERE post_id =" . $e['id']
    );
    if ($x->num_rows != 0) {
        for ($i = 0; $i < $x->num_rows; $i++) {
            $c_arr[$i] = $x->fetch_array(MYSQLI_ASSOC);
        }
        $str .= "<hr><p>Commenti:</p>";
        foreach (array_reverse($c_arr) as $c) {
            $str .= $c['email'] . " " . $c['data'] . "<br>" .
                $c['contenuto'] . ((isset($_SESSION['ruolo']) && $_SESSION['ruolo'] == 0) ||
                    (isset($_SESSION['email']) && ($_SESSION['email'] == $c['email']))
                    ? "<br><br><div><a href='?post_id=" . $e['id'] . "&eliminac=" . $c['id']
                    . "'>Elimina commento</a></div>" : "") . "<br><br>";
        }
    }
    if (isset($_SESSION['email'])) {
        $str .= "<hr><p>Inserisci un commento:</p>
    <form method='POST' action='#'>
        <input type='hidden' name='post_id' value='" . $e['id'] . "'>
        <input type='text' name='commento' placeholder='Inserisci un commento' required>
        <button type='submit'>Invia</button>
    </form>";
    }
    $str .= "</article></div>";
} else {
    $str = "Seleziona un articolo o creane uno per iniziare";
}
echo $str;
?>

</body>

</html>