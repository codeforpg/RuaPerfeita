<?php

namespace App\Http\Controllers;

use App\Categoria;
use Illuminate\Http\Request;

use App\Http\Requests;

class CategoriaController extends Controller
{

    public function get($id) {
        $categoria = DB::table('categoria')->where('id_categoria', $id)->first();

        if ($categoria) {
            return $categoria;
        } else {
            return 'categoria nao encontrada';
        }
    }

    public function store(Request $request) {

        $rules = array(
            'nome' => 'required',
            'tipo' => 'required'
        );

        $this->validate($request, $rules);

        $categoria = new Categoria();
        $result = $categoria->create($request->all());

        return $result;
    }

    public function update(Request $request)
    {
        $rules = array(
            'id_categoria' => 'required'
        );

        $this->validate($request, $rules);

        $categoria = new Categoria();
        $result = $categoria->update($request->all());

        return $result;
    }

    public function delete(Request $request)
    {
        $rules = array(
            'id_categoria' => 'required'
        );

        $this->validate($request, $rules);

        $categoria = new Categoria();
        $result = $categoria->delete($request->all());

        return $result;
    }

}
