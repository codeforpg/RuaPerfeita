<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Propriedade extends Model
{
    protected $primaryKey = 'id_propriedade';
    protected $fillable = [
        'tipo',
        'descricao'
    ];
}
