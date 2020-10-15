<?php

$factory->define(App\Question::class, function (Faker\Generator $faker) {
    return [
        "question_id" => $faker->randomNumber(2),
        "test_id" => factory('App\Test')->create(),
        "question_text" => $faker->name,
    ];
});
