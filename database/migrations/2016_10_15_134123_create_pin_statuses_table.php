<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePinStatusesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pin_status', function (Blueprint $table) {
            $table->increments('id_pin_status');
            $table->string('descricao');
        });

        Schema::table('pin',function(Blueprint $table){
            $table->integer('id_pin_status');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pin_status');

        Schema::table('pin',function(Blueprint $table){
            $table->dropColumn('id_pin_status');
        });
    }
}
