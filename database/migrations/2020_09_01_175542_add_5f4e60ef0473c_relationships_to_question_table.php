<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Add5f4e60ef0473cRelationshipsToQuestionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('questions', function(Blueprint $table) {
            if (!Schema::hasColumn('questions', 'test_id')) {
                $table->integer('test_id')->unsigned()->nullable();
                $table->foreign('test_id', '50226_5f4e60ee04783')->references('id')->on('tests')->onDelete('cascade');
                }
                
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('questions', function(Blueprint $table) {
            
        });
    }
}
