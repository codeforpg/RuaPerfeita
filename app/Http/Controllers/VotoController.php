<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class VotoController extends Controller
{

    public function get($id) {
        $voto = DB::table('votos')->where('id_voto', $id)->first();

        if ($voto) {
            return $voto;
        } else {
            return 'voto nao encontrado';
        }
    }

    public function store(Request $request) {

        $rules = array(
            'valor' => 'required'
        );

        $this->validate($request, $rules);

        $voto = new Voto();
        $result = $voto->create($request->all());

        return $result;
    }

    public function update(Request $request)
    {
        $rules = array(
            'id_voto' => 'required'
        );

        $this->validate($request, $rules);

        $voto = new Voto();
        $result = $voto->update($request->all());

        return $result;
    }

    public function delete(Request $request)
    {
        $rules = array(
            'id_voto' => 'required'
        );

        $this->validate($request, $rules);

        $voto = new Voto();
        $result = $voto->delete($request->all());

        return $result;
    }

}
