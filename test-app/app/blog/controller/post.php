<?php
require_once('controller.php');

class Post extends Controller
{
    public static function newPost()
    {
        if (isset($_POST["titolo"]) && isset($_POST["post"]) && isset($_SESSION["email"])) {
            DB::getConnection()->query(
                "INSERT INTO post VALUES(null,"
                    . "'" . $_POST['titolo'] . "'"
                    . ","
                    . "'" . $_SESSION['email'] . "'"
                    . ","
                    . "NOW()"
                    . ","
                    . "'" . $_POST['post'] . "'"
                    . ")"
            );
            header('Location: ./post');
        }
    }

    public static function newComment()
    {
        if (isset($_POST["commento"])) {
            DB::getConnection()->query(
                "INSERT INTO commenti VALUES(null,"
                    . $_POST['post_id']
                    . ","
                    . "'" . $_SESSION['email'] . "'"
                    . ","
                    . "NOW()"
                    . ","
                    . "'" . $_POST['commento'] . "'"
                    . ")"
            );
            header("Location: ./post?post_id=" . $_GET["post_id"]);
        }
    }

    public static function deletePost()
    {
        if (
            isset($_GET["eliminap"]) &&
            (
                (isset($_SESSION['ruolo']) && $_SESSION['ruolo'] == 0) ||
                $_SESSION['email'] == DB::getConnection()->query("SELECT email FROM post WHERE id='" . $_GET["eliminap"] . "'")->fetch_array(MYSQLI_ASSOC)['email'])
        ) {
            DB::getConnection()->query(
                "DELETE FROM commenti WHERE post_id='" . $_GET["eliminap"] . "'"
            );
            DB::getConnection()->query(
                "DELETE FROM post WHERE id='" . $_GET["eliminap"] . "'"
            );
            header('Location: ./post');
        }
    }

    public static function deleteComment()
    {
        if (
            isset($_GET["eliminac"]) &&
            (
                (isset($_SESSION['ruolo']) && $_SESSION['ruolo'] == 0) ||
                $_SESSION['email'] == DB::getConnection()->query("SELECT email FROM commenti WHERE id='" . $_GET["eliminac"] . "'")->fetch_array(MYSQLI_ASSOC)['email'])
        ) {
            DB::getConnection()->query(
                "DELETE FROM commenti WHERE id='" . $_GET["eliminac"] . "'"
            );
            header("Location: ./post?post_id=" . $_GET["post_id"]);
        }
    }
}
