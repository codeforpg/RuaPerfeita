<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pin extends Model
{
    public $table = 'pin';
    public $primaryKey = 'id_pin';

    public $fillable = ['lat', 'long', 'tipo', 'expire_at', 'id_pin_status'];
}
