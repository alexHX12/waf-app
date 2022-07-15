<?php
require_once("route.php");
require_once("controller/newpost.php");
require_once("controller/post.php");

Route::set('index.php',function(){
    Post::createView('post');
    if (isset($_SESSION['email'])) {
        Post::newComment();
        Post::deletePost();
        Post::deleteComment();
    }
});
Route::set('newpost',function(){
    if (isset($_SESSION['email'])) {
        NewPost::createView('newpost');
        Post::newPost();
    }else{
        echo "Esegui il login per accedere a questa pagina!";
    }
});

Route::set('post',function(){
    Post::createView('post');
    if (isset($_SESSION['email'])) {
        Post::newComment();
        Post::deletePost();
        Post::deleteComment();
    }
});
