<?php

class DB
{
    private static $conn;

    public static function getConnection()
    {
        if (DB::$conn == null) {
            $conn = new mysqli('test.waf', 'root', 'test', 'blog');
            if (!$conn) {
                die('Connessione al DB non riuscita:' . $conn->connect_error());
            }
        }
        return $conn;
    }
}
