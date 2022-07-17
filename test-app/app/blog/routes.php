<?php
require_once("route.php");
require_once("controller/newpost.php");
require_once("controller/post.php");

Route::set('index.php',function(){
    if (isset($_SESSION['email'])) {
        Post::newComment();
        Post::deletePost();
        Post::deleteComment();
    }
    Post::createView('post');
});
Route::set('newpost',function(){
    if (isset($_SESSION['email'])) {
        Post::newPost();
        NewPost::createView('newpost');
    }else{
        echo "Esegui il login per accedere a questa pagina!";
    }
});

Route::set('post',function(){
    if (isset($_SESSION['email'])) {
        Post::newComment();
        Post::deletePost();
        Post::deleteComment();
    }
    Post::createView('post');
});
