<?php

namespace App\Http\Controllers;

use App\Tipo;
use Illuminate\Http\Request;

use App\Http\Requests;

class TipoController extends Controller
{
    public function get($id) {
        $tipo = DB::table('tipo')->where('id_tipo', $id)->first();

        if ($tipo) {
            return $tipo;
        } else {
            return 'tipo nao encontrada';
        }
    }

    public function store(Request $request) {

        $rules = array(
            'nome' => 'required',
            'imagem' => 'required',
            'categoria' => 'required'
        );

        $this->validate($request, $rules);

        $tipo = new Tipo();
        $result = $tipo->create($request->all());

        return $result;
    }

    public function update(Request $request)
    {
        $rules = array(
            'id_tipo' => 'required'
        );

        $this->validate($request, $rules);

        $tipo = new Tipo();
        $result = $tipo->update($request->all());

        return $result;
    }

    public function delete(Request $request)
    {
        $rules = array(
            'id_tipo' => 'required'
        );

        $this->validate($request, $rules);

        $tipo = new Tipo();
        $result = $tipo->delete($request->all());

        return $result;
    }
}
