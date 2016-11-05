<?php

/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', ['as' => 'index', 'uses' => function () {
  return view('index');
}]);

Route::get('/comentarios/{id}', function ($id) {
  return view('comentarios',compact('id'));
});

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/

Route::resource('pin', 'PinController', ['only' => ['index', 'store', 'update']]);
Route::resource('tipo', 'TipoController', ['only' => ['index', 'store', 'update']]);
Route::resource('categoria', 'CategoriaController', ['only' => ['index', 'store', 'update']]);
Route::resource('voto', 'VotoController', ['only' => ['index', 'store', 'update']]);

Route::get('tipo/all','TipoController@all');
Route::get('last','PinController@last');
