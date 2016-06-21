<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    public $table = 'categoria';
    public $primaryKey = 'id_categoria';

//    public $fillable = ['lat', 'long', 'tipo', 'expire_at'];
}
