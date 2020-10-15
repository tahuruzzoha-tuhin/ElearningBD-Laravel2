<?php

Route::group(['prefix' => '/v1', 'middleware' => ['auth:api'], 'namespace' => 'Api\V1', 'as' => 'api.'], function () {
    Route::post('change-password', 'ChangePasswordController@changePassword')->name('auth.change_password');
    Route::apiResource('rules', 'RulesController', ['only' => ['index']]);
    Route::apiResource('permissions', 'PermissionsController');
    Route::apiResource('roles', 'RolesController');
    Route::apiResource('users', 'UsersController');
    Route::apiResource('courses', 'CoursesController');
    Route::apiResource('lessons', 'LessonsController');
    Route::apiResource('tests', 'TestsController');
    Route::apiResource('questions', 'QuestionsController');
    Route::apiResource('questionoptions', 'QuestionoptionsController');
    Route::apiResource('contact-companies', 'ContactCompaniesController');
    Route::apiResource('contacts', 'ContactsController');
    Route::apiResource('faq-categories', 'FaqCategoriesController');
    Route::apiResource('faq-questions', 'FaqQuestionsController');
});
 