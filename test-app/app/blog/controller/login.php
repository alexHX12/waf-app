<?php

class Login extends Controller
{

    public static function checkLogin()
    {
        if (isset($_POST['email']) && isset($_POST['password']) && isset($_POST['action']) && $_POST['action'] == 'register') {
            if (DB::getConnection()->query("
            INSERT INTO utenti VALUES('" . $_POST['email'] . "','" . password_hash($_POST['password'], PASSWORD_DEFAULT) . "',1)")) {
                $_SESSION['email'] = $_POST['email'];
                $_SESSION['ruolo'] = 1;
            }
            header('Location: ./post');
        } else if (isset($_POST['email']) && isset($_POST['password']) && isset($_POST['action']) && $_POST['action'] == 'login') {
            $x_ris = DB::getConnection()->query("
            SELECT * FROM utenti WHERE email='" . $_POST['email'] . "'");
            $x = $x_ris->fetch_array(MYSQLI_ASSOC);
            if (password_verify($_POST['password'], $x['password'])) {
                $_SESSION['email'] = $x['email'];
                $_SESSION['ruolo'] = $x['ruolo'];
            }
            header('Location: ./post');
        }

        if (isset($_GET['action']) && $_GET['action'] == 'logout') {
            session_destroy();
            header('Location: ./post');
        }
    }
}
