<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Add5f4e5fe30c35eRelationshipsToCourseTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('courses', function(Blueprint $table) {
            if (!Schema::hasColumn('courses', 'teacher_id')) {
                $table->integer('teacher_id')->unsigned()->nullable();
                $table->foreign('teacher_id', '50223_5f4e5bb8d652b')->references('id')->on('permissions')->onDelete('cascade');
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
        Schema::table('courses', function(Blueprint $table) {
            
        });
    }
}
