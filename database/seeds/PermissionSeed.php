<?php

use Illuminate\Database\Seeder;

class PermissionSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $items = [
            
            ['id' => 1, 'title' => 'user_management_access',],
            ['id' => 2, 'title' => 'permission_access',],
            ['id' => 3, 'title' => 'permission_create',],
            ['id' => 4, 'title' => 'permission_edit',],
            ['id' => 5, 'title' => 'permission_view',],
            ['id' => 6, 'title' => 'permission_delete',],
            ['id' => 7, 'title' => 'role_access',],
            ['id' => 8, 'title' => 'role_create',],
            ['id' => 9, 'title' => 'role_edit',],
            ['id' => 10, 'title' => 'role_view',],
            ['id' => 11, 'title' => 'role_delete',],
            ['id' => 12, 'title' => 'user_access',],
            ['id' => 13, 'title' => 'user_create',],
            ['id' => 14, 'title' => 'user_edit',],
            ['id' => 15, 'title' => 'user_view',],
            ['id' => 16, 'title' => 'user_delete',],
            ['id' => 17, 'title' => 'course_access',],
            ['id' => 18, 'title' => 'course_create',],
            ['id' => 19, 'title' => 'course_edit',],
            ['id' => 20, 'title' => 'course_view',],
            ['id' => 21, 'title' => 'course_delete',],
            ['id' => 22, 'title' => 'lesson_access',],
            ['id' => 23, 'title' => 'lesson_create',],
            ['id' => 24, 'title' => 'lesson_edit',],
            ['id' => 25, 'title' => 'lesson_view',],
            ['id' => 26, 'title' => 'lesson_delete',],
            ['id' => 27, 'title' => 'test_access',],
            ['id' => 28, 'title' => 'test_create',],
            ['id' => 29, 'title' => 'test_edit',],
            ['id' => 30, 'title' => 'test_view',],
            ['id' => 31, 'title' => 'test_delete',],
            ['id' => 32, 'title' => 'question_access',],
            ['id' => 33, 'title' => 'question_create',],
            ['id' => 34, 'title' => 'question_edit',],
            ['id' => 35, 'title' => 'question_view',],
            ['id' => 36, 'title' => 'question_delete',],
            ['id' => 37, 'title' => 'questionoption_access',],
            ['id' => 38, 'title' => 'questionoption_create',],
            ['id' => 39, 'title' => 'questionoption_edit',],
            ['id' => 40, 'title' => 'questionoption_view',],
            ['id' => 41, 'title' => 'questionoption_delete',],
            ['id' => 42, 'title' => 'contact_management_access',],
            ['id' => 43, 'title' => 'contact_management_create',],
            ['id' => 44, 'title' => 'contact_management_edit',],
            ['id' => 45, 'title' => 'contact_management_view',],
            ['id' => 46, 'title' => 'contact_management_delete',],
            ['id' => 47, 'title' => 'contact_company_access',],
            ['id' => 48, 'title' => 'contact_company_create',],
            ['id' => 49, 'title' => 'contact_company_edit',],
            ['id' => 50, 'title' => 'contact_company_view',],
            ['id' => 51, 'title' => 'contact_company_delete',],
            ['id' => 52, 'title' => 'contact_access',],
            ['id' => 53, 'title' => 'contact_create',],
            ['id' => 54, 'title' => 'contact_edit',],
            ['id' => 55, 'title' => 'contact_view',],
            ['id' => 56, 'title' => 'contact_delete',],
            ['id' => 57, 'title' => 'faq_management_access',],
            ['id' => 58, 'title' => 'faq_management_create',],
            ['id' => 59, 'title' => 'faq_management_edit',],
            ['id' => 60, 'title' => 'faq_management_view',],
            ['id' => 61, 'title' => 'faq_management_delete',],
            ['id' => 62, 'title' => 'faq_category_access',],
            ['id' => 63, 'title' => 'faq_category_create',],
            ['id' => 64, 'title' => 'faq_category_edit',],
            ['id' => 65, 'title' => 'faq_category_view',],
            ['id' => 66, 'title' => 'faq_category_delete',],
            ['id' => 67, 'title' => 'faq_question_access',],
            ['id' => 68, 'title' => 'faq_question_create',],
            ['id' => 69, 'title' => 'faq_question_edit',],
            ['id' => 70, 'title' => 'faq_question_view',],
            ['id' => 71, 'title' => 'faq_question_delete',],

        ];

        foreach ($items as $item) {
            \App\Permission::create($item);
        }
    }
}
