import Vue from 'vue'
import VueRouter from 'vue-router'

import ChangePassword from '../components/ChangePassword.vue'
import PermissionsIndex from '../components/cruds/Permissions/Index.vue'
import PermissionsCreate from '../components/cruds/Permissions/Create.vue'
import PermissionsShow from '../components/cruds/Permissions/Show.vue'
import PermissionsEdit from '../components/cruds/Permissions/Edit.vue'
import RolesIndex from '../components/cruds/Roles/Index.vue'
import RolesCreate from '../components/cruds/Roles/Create.vue'
import RolesShow from '../components/cruds/Roles/Show.vue'
import RolesEdit from '../components/cruds/Roles/Edit.vue'
import UsersIndex from '../components/cruds/Users/Index.vue'
import UsersCreate from '../components/cruds/Users/Create.vue'
import UsersShow from '../components/cruds/Users/Show.vue'
import UsersEdit from '../components/cruds/Users/Edit.vue'
import CoursesIndex from '../components/cruds/Courses/Index.vue'
import CoursesCreate from '../components/cruds/Courses/Create.vue'
import CoursesShow from '../components/cruds/Courses/Show.vue'
import CoursesEdit from '../components/cruds/Courses/Edit.vue'
import LessonsIndex from '../components/cruds/Lessons/Index.vue'
import LessonsCreate from '../components/cruds/Lessons/Create.vue'
import LessonsShow from '../components/cruds/Lessons/Show.vue'
import LessonsEdit from '../components/cruds/Lessons/Edit.vue'
import TestsIndex from '../components/cruds/Tests/Index.vue'
import TestsCreate from '../components/cruds/Tests/Create.vue'
import TestsShow from '../components/cruds/Tests/Show.vue'
import TestsEdit from '../components/cruds/Tests/Edit.vue'
import QuestionsIndex from '../components/cruds/Questions/Index.vue'
import QuestionsCreate from '../components/cruds/Questions/Create.vue'
import QuestionsShow from '../components/cruds/Questions/Show.vue'
import QuestionsEdit from '../components/cruds/Questions/Edit.vue'
import QuestionoptionsIndex from '../components/cruds/Questionoptions/Index.vue'
import QuestionoptionsCreate from '../components/cruds/Questionoptions/Create.vue'
import QuestionoptionsShow from '../components/cruds/Questionoptions/Show.vue'
import QuestionoptionsEdit from '../components/cruds/Questionoptions/Edit.vue'
import ContactCompaniesIndex from '../components/cruds/ContactCompanies/Index.vue'
import ContactCompaniesCreate from '../components/cruds/ContactCompanies/Create.vue'
import ContactCompaniesShow from '../components/cruds/ContactCompanies/Show.vue'
import ContactCompaniesEdit from '../components/cruds/ContactCompanies/Edit.vue'
import ContactsIndex from '../components/cruds/Contacts/Index.vue'
import ContactsCreate from '../components/cruds/Contacts/Create.vue'
import ContactsShow from '../components/cruds/Contacts/Show.vue'
import ContactsEdit from '../components/cruds/Contacts/Edit.vue'
import FaqCategoriesIndex from '../components/cruds/FaqCategories/Index.vue'
import FaqCategoriesCreate from '../components/cruds/FaqCategories/Create.vue'
import FaqCategoriesShow from '../components/cruds/FaqCategories/Show.vue'
import FaqCategoriesEdit from '../components/cruds/FaqCategories/Edit.vue'
import FaqQuestionsIndex from '../components/cruds/FaqQuestions/Index.vue'
import FaqQuestionsCreate from '../components/cruds/FaqQuestions/Create.vue'
import FaqQuestionsShow from '../components/cruds/FaqQuestions/Show.vue'
import FaqQuestionsEdit from '../components/cruds/FaqQuestions/Edit.vue'

Vue.use(VueRouter)

const routes = [
    { path: '/change-password', component: ChangePassword, name: 'auth.change_password' },
    { path: '/permissions', component: PermissionsIndex, name: 'permissions.index' },
    { path: '/permissions/create', component: PermissionsCreate, name: 'permissions.create' },
    { path: '/permissions/:id', component: PermissionsShow, name: 'permissions.show' },
    { path: '/permissions/:id/edit', component: PermissionsEdit, name: 'permissions.edit' },
    { path: '/roles', component: RolesIndex, name: 'roles.index' },
    { path: '/roles/create', component: RolesCreate, name: 'roles.create' },
    { path: '/roles/:id', component: RolesShow, name: 'roles.show' },
    { path: '/roles/:id/edit', component: RolesEdit, name: 'roles.edit' },
    { path: '/users', component: UsersIndex, name: 'users.index' },
    { path: '/users/create', component: UsersCreate, name: 'users.create' },
    { path: '/users/:id', component: UsersShow, name: 'users.show' },
    { path: '/users/:id/edit', component: UsersEdit, name: 'users.edit' },
    { path: '/courses', component: CoursesIndex, name: 'courses.index' },
    { path: '/courses/create', component: CoursesCreate, name: 'courses.create' },
    { path: '/courses/:id', component: CoursesShow, name: 'courses.show' },
    { path: '/courses/:id/edit', component: CoursesEdit, name: 'courses.edit' },
    { path: '/lessons', component: LessonsIndex, name: 'lessons.index' },
    { path: '/lessons/create', component: LessonsCreate, name: 'lessons.create' },
    { path: '/lessons/:id', component: LessonsShow, name: 'lessons.show' },
    { path: '/lessons/:id/edit', component: LessonsEdit, name: 'lessons.edit' },
    { path: '/tests', component: TestsIndex, name: 'tests.index' },
    { path: '/tests/create', component: TestsCreate, name: 'tests.create' },
    { path: '/tests/:id', component: TestsShow, name: 'tests.show' },
    { path: '/tests/:id/edit', component: TestsEdit, name: 'tests.edit' },
    { path: '/questions', component: QuestionsIndex, name: 'questions.index' },
    { path: '/questions/create', component: QuestionsCreate, name: 'questions.create' },
    { path: '/questions/:id', component: QuestionsShow, name: 'questions.show' },
    { path: '/questions/:id/edit', component: QuestionsEdit, name: 'questions.edit' },
    { path: '/questionoptions', component: QuestionoptionsIndex, name: 'questionoptions.index' },
    { path: '/questionoptions/create', component: QuestionoptionsCreate, name: 'questionoptions.create' },
    { path: '/questionoptions/:id', component: QuestionoptionsShow, name: 'questionoptions.show' },
    { path: '/questionoptions/:id/edit', component: QuestionoptionsEdit, name: 'questionoptions.edit' },
    { path: '/contact-companies', component: ContactCompaniesIndex, name: 'contact_companies.index' },
    { path: '/contact-companies/create', component: ContactCompaniesCreate, name: 'contact_companies.create' },
    { path: '/contact-companies/:id', component: ContactCompaniesShow, name: 'contact_companies.show' },
    { path: '/contact-companies/:id/edit', component: ContactCompaniesEdit, name: 'contact_companies.edit' },
    { path: '/contacts', component: ContactsIndex, name: 'contacts.index' },
    { path: '/contacts/create', component: ContactsCreate, name: 'contacts.create' },
    { path: '/contacts/:id', component: ContactsShow, name: 'contacts.show' },
    { path: '/contacts/:id/edit', component: ContactsEdit, name: 'contacts.edit' },
    { path: '/faq-categories', component: FaqCategoriesIndex, name: 'faq_categories.index' },
    { path: '/faq-categories/create', component: FaqCategoriesCreate, name: 'faq_categories.create' },
    { path: '/faq-categories/:id', component: FaqCategoriesShow, name: 'faq_categories.show' },
    { path: '/faq-categories/:id/edit', component: FaqCategoriesEdit, name: 'faq_categories.edit' },
    { path: '/faq-questions', component: FaqQuestionsIndex, name: 'faq_questions.index' },
    { path: '/faq-questions/create', component: FaqQuestionsCreate, name: 'faq_questions.create' },
    { path: '/faq-questions/:id', component: FaqQuestionsShow, name: 'faq_questions.show' },
    { path: '/faq-questions/:id/edit', component: FaqQuestionsEdit, name: 'faq_questions.edit' },
]

export default new VueRouter({
    mode: 'history',
    base: '/admin',
    routes
})
