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


Route::get('importacao',function (){
  try {
    \DB::beginTransaction();
    $dados = \Illuminate\Support\Facades\File::get(storage_path('IMPORTACAO.csv'));
    $dadaos_array = explode("\n",$dados);
    array_shift($dadaos_array);
    foreach ($dadaos_array as $linha_array) {
      /*
       * 5 = limite de velocidade
       * 6 = tipo
       * 7 = lat
       * 8 = long
       * */
      $linha = explode(',', $linha_array);
      if(isset($linha[6]) == false) {
       continue;
      }
      switch ($linha[6]){
        case 'Controlador de Velocidade':
          $tipo = 1;
          break;
        case 'Rotatoria':
          $tipo = 2;
          break;
        case 'Faixa Elevada':
          $tipo = 3;
          break;
        case 'Semafaro':
          $tipo = 4;
          break;
        case 'Lombada Eletronica':
          $tipo = 5;
          break;
        default:
          $tipo = 6;
          break;
      }
      $linha[7] = substr_replace($linha[7], '.', 3, 0);
      $linha[8] = substr_replace($linha[8], '.', 3, 0);
      \App\Pin::create([
        'lat'=>$linha[8],
        'long'=>$linha[7],
        'tipo'=>$tipo,
        'obs'=>$linha[5],
      ]);
    }
    \DB::commit();
  }catch (\Mockery\CountValidator\Exception $e){
    \DB::rollback();
    dd($e->getMessage(),$linha);
  }
});