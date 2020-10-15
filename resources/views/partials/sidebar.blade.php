@inject('request', 'Illuminate\Http\Request')
<!-- Left side column. contains the sidebar -->
<aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
        <ul class="sidebar-menu">

            <li>
                <a href="{{ url('/') }}">
                    <i class="fa fa-wrench"></i>
                    <span class="title">@lang('quickadmin.qa_dashboard')</span>
                </a>
            </li>

            <li class="treeview" v-if="$can('user_management_access')">
                <a href="#">
                    <i class="fa fa-users"></i>
                    <span>@lang('quickadmin.user-management.title')</span>
                    <span class="pull-right-container">
                        <i class="fa fa-angle-left pull-right"></i>
                    </span>
                </a>
                <ul class="treeview-menu">
                    <li v-if="$can('permission_access')">
                        <router-link :to="{ name: 'permissions.index' }">
                            <i class="fa fa-briefcase"></i>
                            <span>@lang('quickadmin.permissions.title')</span>
                        </router-link>
                    </li>  
                    <li v-if="$can('role_access')">
                        <router-link :to="{ name: 'roles.index' }">
                            <i class="fa fa-briefcase"></i>
                            <span>@lang('quickadmin.roles.title')</span>
                        </router-link>
                    </li>
                    <li v-if="$can('user_access')">
                        <router-link :to="{ name: 'users.index' }">
                            <i class="fa fa-user"></i>
                            <span>@lang('quickadmin.users.title')</span>
                        </router-link>
                    </li>
                </ul>
            </li>
            <li v-if="$can('course_access')">
                <router-link :to="{ name: 'courses.index' }">
                    <i class="fa fa-book"></i>
                    <span>@lang('quickadmin.courses.title')</span>
                </router-link>
            </li>
            <li v-if="$can('lesson_access')">
                <router-link :to="{ name: 'lessons.index' }">
                    <i class="fa fa-drivers-license-o"></i>
                    <span>@lang('quickadmin.lessons.title')</span>
                </router-link>
            </li>
           <!--  <li v-if="$can('test_access')">
                <router-link :to="{ name: 'tests.index' }">
                    <i class="fa fa-columns"></i>
                    <span>@lang('quickadmin.tests.title')</span>
                </router-link>
            </li> -->
            <li class="{{ $request->segment(1) == 'tests' ? 'active' : '' }}">
                <a href="{{ route('tests.index') }}">
                    <i class="fa fa-gears"></i>
                    <span class="title">@lang('quickadmin.test.new')</span>
                </a>
            </li>
            <li v-if="$can('question_access')">
                <router-link :to="{ name: 'questions.index' }">
                    <i class="fa fa-cog"></i>
                    <span>@lang('quickadmin.questions.title')</span>
                </router-link>
            </li>
            <li v-if="$can('questionoption_access')">
                <router-link :to="{ name: 'questionoptions.index' }">
                    <i class="fa fa-th-large"></i>
                    <span>@lang('quickadmin.questionoption.title')</span>
                </router-link>
            </li>
            <li class="treeview" v-if="$can('contact_management_access')">
                <a href="#">
                    <i class="fa fa-phone-square"></i>
                    <span>@lang('quickadmin.contact-management.title')</span>
                    <span class="pull-right-container">
                        <i class="fa fa-angle-left pull-right"></i>
                    </span>
                </a>
                <ul class="treeview-menu">
                    <li v-if="$can('contact_company_access')">
                        <router-link :to="{ name: 'contact_companies.index' }">
                            <i class="fa fa-building-o"></i>
                            <span>@lang('quickadmin.contact-companies.title')</span>
                        </router-link>
                    </li>
                    <li v-if="$can('contact_access')">
                        <router-link :to="{ name: 'contacts.index' }">
                            <i class="fa fa-user-plus"></i>
                            <span>@lang('quickadmin.contacts.title')</span>
                        </router-link>
                    </li>
                </ul>
            </li>
            <li class="treeview" v-if="$can('faq_management_access')">
                <a href="#">
                    <i class="fa fa-question"></i>
                    <span>@lang('quickadmin.faq-management.title')</span>
                    <span class="pull-right-container">
                        <i class="fa fa-angle-left pull-right"></i>
                    </span>
                </a>
                <ul class="treeview-menu">
                    <li v-if="$can('faq_category_access')">
                        <router-link :to="{ name: 'faq_categories.index' }">
                            <i class="fa fa-briefcase"></i>
                            <span>@lang('quickadmin.faq-categories.title')</span>
                        </router-link>
                    </li>
                    <li v-if="$can('faq_question_access')">
                        <router-link :to="{ name: 'faq_questions.index' }">
                            <i class="fa fa-question"></i>
                            <span>@lang('quickadmin.faq-questions.title')</span>
                        </router-link>
                    </li>
                </ul>
            </li>

            <li>
                <router-link :to="{ name: 'auth.change_password' }">
                    <i class="fa fa-key"></i>
                    <span class="title">@lang('quickadmin.qa_change_password')</span>
                </router-link>
            </li>

            <li>
                <a href="#logout" onclick="$('#logout').submit();">
                    <i class="fa fa-arrow-left"></i>
                    <span class="title">@lang('quickadmin.qa_logout')</span>
                </a>
            </li>
        </ul>
    </section>
</aside>
