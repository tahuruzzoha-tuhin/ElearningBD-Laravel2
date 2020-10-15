<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Create1598972486QuestionoptionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if(! Schema::hasTable('questionoptions')) {
            Schema::create('questionoptions', function (Blueprint $table) {
                $table->increments('id');
                $table->integer('question_id')->nullable();
                $table->string('option_text')->nullable();
                $table->tinyInteger('is_correct')->nullable()->default('0');
                
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
        Schema::dropIfExists('questionoptions');
    }
}
