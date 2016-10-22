<?php

namespace App\Http\Controllers;

use App\Pin;
use Carbon\Carbon;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;

class PinController extends Controller
{
    public function index() {
        $pin = new Pin();
        $result =  $pin->leftJoin('tipo','tipo','=','id_tipo')->get();
        return $result;

    }

    public function store(Request $request) {

        $rules = array(
            'lat' => 'required',
            'long' => 'required',
            'tipo' => 'required',
        );

        $this->validate($request, $rules);

        $pin = new Pin();
        $post = $request->all();
        $post['expire_at'] = Carbon::now()->addDay(30)->toDateTimeString();
        $post['id_pin_status'] = 2;
        $newPin = $pin->create($post);

        $pin = new Pin();
        $result = $pin->where('id_pin','=',$newPin->id_pin)->leftJoin('tipo', 'tipo', '=', 'id_tipo')->first();

        return $result;
    }

    public function update($id, Request $request)
    {
        $pin = new Pin();
        if($request->voto > 0 ){
            $msg = ['success','voto decrementado'];
            $new_pin = $pin->find($id)->increment('voto');
        }elseif($request->voto < 0){
            $msg = ['success','voto incrementado'];
            $new_pin = $pin->find($id)->decrement('voto');
        }
        return [$msg,'pin'=>$pin->find($id)];
    }
}
