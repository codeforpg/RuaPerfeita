<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Propriedades extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('propriedades', function(Blueprint $table) {
            $table->increments('id_propriedade');
            $table->integer('tipo');
            $table->foreign('tipo')->references('id_tipo')->on('tipo')->onDelete('cascade');
            $table->string('descricao');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
