<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PinStatus extends Model
{
    protected $primaryKey = 'id_pin_status';
    protected $table = 'pin_status';
    public $timestamps = false;
    protected $fillable = [
        'descricao'
    ];
}
