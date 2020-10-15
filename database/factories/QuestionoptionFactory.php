<?php

$factory->define(App\Questionoption::class, function (Faker\Generator $faker) {
    return [
        "question_id" => $faker->randomNumber(2),
        "question_id" => factory('App\Question')->create(),
        "option_text" => $faker->name,
        "is_correct" => 0,
    ];
});
