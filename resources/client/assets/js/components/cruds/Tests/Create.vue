<template>
    <section class="content-wrapper" style="min-height: 960px;">
        <section class="content-header">
            <h1>Tests</h1>
        </section>

        <section class="content">
            <div class="row">
                <div class="col-xs-12">
                    <form @submit.prevent="submitForm" novalidate>
                        <div class="box">
                            <div class="box-header with-border">
                                <h3 class="box-title">Create</h3>
                            </div>

                            <div class="box-body">
                                <back-buttton></back-buttton>
                            </div>

                            <bootstrap-alert />

                            <div class="box-body">
                                <div class="form-group">
                                    <label for="test_id">Test id *</label>
                                    <input
                                            type="number"
                                            class="form-control"
                                            name="test_id"
                                            placeholder="Enter Test id *"
                                            :value="item.test_id"
                                            @input="updateTest_id"
                                            >
                                </div>
                                <div class="form-group">
                                    <label for="courses">Courses *</label>
                                    <v-select
                                            name="courses"
                                            label="title"
                                            @input="updateCourses"
                                            :value="item.courses"
                                            :options="coursesAll"
                                            />
                                </div>
                                <div class="form-group">
                                    <label for="lesson">Lesson *</label>
                                    <v-select
                                            name="lesson"
                                            label="title"
                                            @input="updateLesson"
                                            :value="item.lesson"
                                            :options="lessonsAll"
                                            />
                                </div>
                                <div class="form-group">
                                    <label for="title">Title</label>
                                    <input
                                            type="text"
                                            class="form-control"
                                            name="title"
                                            placeholder="Enter Title"
                                            :value="item.title"
                                            @input="updateTitle"
                                            >
                                </div>
                                <div class="form-group">
                                    <label for="description">Description</label>
                                    <vue-ckeditor
                                            name="description"
                                            :id="'description'"
                                            :value="item.description"
                                            @input="updateDescription"
                                    />
                                </div>
                                <div class="form-group">
                                    <div class="checkbox">
                                        <label>
                                            <input
                                                    type="checkbox"
                                                    name="is_published"
                                                    :value="item.is_published"
                                                    :checked="item.is_published == true"
                                                    @change="updateIs_published"
                                                    >
                                            Is published
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div class="box-footer">
                                <vue-button-spinner
                                        class="btn btn-primary btn-sm"
                                        :isLoading="loading"
                                        :disabled="loading"
                                        >
                                    Save
                                </vue-button-spinner>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </section>
</template>


<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            // Code...
        }
    },
    computed: {
        ...mapGetters('TestsSingle', ['item', 'loading', 'coursesAll', 'lessonsAll'])
    },
    created() {
        this.fetchCoursesAll(),
        this.fetchLessonsAll()
    },
    destroyed() {
        this.resetState()
    },
    methods: {
        ...mapActions('TestsSingle', ['storeData', 'resetState', 'setTest_id', 'setCourses', 'setLesson', 'setTitle', 'setDescription', 'setIs_published', 'fetchCoursesAll', 'fetchLessonsAll']),
        updateTest_id(e) {
            this.setTest_id(e.target.value)
        },
        updateCourses(value) {
            this.setCourses(value)
        },
        updateLesson(value) {
            this.setLesson(value)
        },
        updateTitle(e) {
            this.setTitle(e.target.value)
        },
        updateDescription(value) {
            this.setDescription(value)
        },
        updateIs_published(e) {
            this.setIs_published(e.target.checked)
        },
        submitForm() {
            this.storeData()
                .then(() => {
                    this.$router.push({ name: 'tests.index' })
                    this.$eventHub.$emit('create-success')
                })
                .catch((error) => {
                    console.error(error)
                })
        }
    }
}
</script>


<style scoped>

</style>
