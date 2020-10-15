<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Create1598971344LessonsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if(! Schema::hasTable('lessons')) {
            Schema::create('lessons', function (Blueprint $table) {
                $table->increments('id');
                $table->integer('lesson_id')->nullable();
                $table->string('title')->nullable();
                $table->text('short_text')->nullable();
                $table->text('long_text')->nullable();
                $table->integer('position')->nullable();
                $table->tinyInteger('is_published')->nullable()->default('0');
                $table->tinyInteger('is_free')->nullable()->default('0');
                
                $table->timestamps();
                $table->softDeletes();

                $table->index(['deleted_at']);
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('lessons');
    }
}
