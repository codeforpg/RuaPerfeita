<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tipo extends Model
{
    public $table = 'tipo';
    public $primaryKey = 'id_tipo';

    public $fillable = ['nome', 'tipo', 'imagem','imagem_icon'];
}
