<?php

$factory->define(App\Course::class, function (Faker\Generator $faker) {
    return [
        "user_id" => $faker->randomNumber(2),
        "teacher_id" => factory('App\Permission')->create(),
        "title" => $faker->name,
        "description" => $faker->name,
        "price" => $faker->randomNumber(2),
        "is_published" => 0,
    ];
});
