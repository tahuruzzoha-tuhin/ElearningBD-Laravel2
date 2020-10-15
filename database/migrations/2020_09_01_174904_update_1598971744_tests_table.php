<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Update1598971744TestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tests', function (Blueprint $table) {
            
if (!Schema::hasColumn('tests', 'title')) {
                $table->string('title')->nullable();
                }
if (!Schema::hasColumn('tests', 'description')) {
                $table->text('description')->nullable();
                }
if (!Schema::hasColumn('tests', 'is_published')) {
                $table->tinyInteger('is_published')->nullable()->default('0');
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
        Schema::table('tests', function (Blueprint $table) {
            $table->dropColumn('title');
            $table->dropColumn('description');
            $table->dropColumn('is_published');
            
        });

    }
}
