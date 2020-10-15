<?php

$factory->define(App\Test::class, function (Faker\Generator $faker) {
    return [
        "test_id" => $faker->randomNumber(2),
        "courses_id" => factory('App\Course')->create(),
        "lesson_id" => factory('App\Lesson')->create(),
        "title" => $faker->name,
        "description" => $faker->name,
        "is_published" => 0,
    ];
});
