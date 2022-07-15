<?php

class Route{

    public static $routes=array();

    public static function set($r,$f){
        self::$routes[]=$r;
        if($_GET['url']==$r){
            $f->__invoke();
        }
    }
}
