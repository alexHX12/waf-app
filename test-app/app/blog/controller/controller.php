<?php
require_once("controller/login.php");

class Controller
{
    public static function createView($name)
    {
        require_once('./controller/dbConnection.php');
        Login::checkLogin();
        require_once("./views/navbar.php");
        if (!isset($_SESSION['email'])) {
            require_once("./views/login.php");
        }
        require_once("./views/$name.php");
    }
}
