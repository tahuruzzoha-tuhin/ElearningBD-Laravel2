import Vue from 'vue'
import Vuex from 'vuex'
import Alert from './modules/alert'
import ChangePassword from './modules/change_password'
import Rules from './modules/rules'
import PermissionsIndex from './modules/Permissions'
import PermissionsSingle from './modules/Permissions/single'
import RolesIndex from './modules/Roles'
import RolesSingle from './modules/Roles/single'
import UsersIndex from './modules/Users'
import UsersSingle from './modules/Users/single'
import CoursesIndex from './modules/Courses'
import CoursesSingle from './modules/Courses/single'
import LessonsIndex from './modules/Lessons'
import LessonsSingle from './modules/Lessons/single'
import TestsIndex from './modules/Tests'
import TestsSingle from './modules/Tests/single'
import QuestionsIndex from './modules/Questions'
import QuestionsSingle from './modules/Questions/single'
import QuestionoptionsIndex from './modules/Questionoptions'
import QuestionoptionsSingle from './modules/Questionoptions/single'
import ContactCompaniesIndex from './modules/ContactCompanies'
import ContactCompaniesSingle from './modules/ContactCompanies/single'
import ContactsIndex from './modules/Contacts'
import ContactsSingle from './modules/Contacts/single'
import FaqCategoriesIndex from './modules/FaqCategories'
import FaqCategoriesSingle from './modules/FaqCategories/single'
import FaqQuestionsIndex from './modules/FaqQuestions'
import FaqQuestionsSingle from './modules/FaqQuestions/single'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        Alert,
        ChangePassword,
        Rules,
        PermissionsIndex,
        PermissionsSingle,
        RolesIndex,
        RolesSingle,
        UsersIndex,
        UsersSingle,
        CoursesIndex,
        CoursesSingle,
        LessonsIndex,
        LessonsSingle,
        TestsIndex,
        TestsSingle,
        QuestionsIndex,
        QuestionsSingle,
        QuestionoptionsIndex,
        QuestionoptionsSingle,
        ContactCompaniesIndex,
        ContactCompaniesSingle,
        ContactsIndex,
        ContactsSingle,
        FaqCategoriesIndex,
        FaqCategoriesSingle,
        FaqQuestionsIndex,
        FaqQuestionsSingle,
    },
    strict: debug,
})
