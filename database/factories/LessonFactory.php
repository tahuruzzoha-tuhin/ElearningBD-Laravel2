<?php

$factory->define(App\Lesson::class, function (Faker\Generator $faker) {
    return [
        "lesson_id" => $faker->randomNumber(2),
        "course_id" => factory('App\Course')->create(),
        "title" => $faker->name,
        "short_text" => $faker->name,
        "long_text" => $faker->name,
        "position" => $faker->randomNumber(2),
        "is_published" => 0,
        "is_free" => 0,
    ];
});
