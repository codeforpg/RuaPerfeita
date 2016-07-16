<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Voto extends Model
{
    public $table = 'voto';
    public $primaryKey = 'id_voto';

//    public $fillable = ['lat', 'long', 'tipo', 'expire_at'];
}
