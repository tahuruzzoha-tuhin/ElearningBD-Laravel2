<template>
    <section class="content-wrapper" style="min-height: 960px;">
        <section class="content-header">
            <h1>Lessons</h1>
        </section>

        <section class="content">
            <div class="row">
                <div class="col-xs-12">
                    <div class="box">
                        <div class="box-header with-border">
                            <h3 class="box-title">View</h3>
                        </div>

                        <div class="box-body">
                            <back-buttton></back-buttton>
                        </div>

                        <div class="box-body">
                            <div class="row">
                                <div class="col-xs-6">
                                    <table class="table table-bordered table-striped">
                                        <tbody>
                                        <tr>
                                            <th>#</th>
                                            <td>{{ item.id }}</td>
                                        </tr>
                                        <tr>
                                            <th>Lesson id</th>
                                            <td>{{ item.lesson_id }}</td>
                                            </tr>
                                        <tr>
                                            <th>Course</th>
                                            <td>
                                                <span class="label label-info" v-if="item.course !== null">
                                                    {{ item.course.title }}
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Title</th>
                                            <td>{{ item.title }}</td>
                                            </tr>
                                        <tr>
                                            <th>Thumbnail</th>
                                            <td v-html="item.thumbnail_link"></td>
                                            </tr>
                                        <tr>
                                            <th>Short text</th>
                                            <td>{{ item.short_text }}</td>
                                            </tr>
                                        <tr>
                                            <th>Long text</th>
                                            <td v-html="item.long_text"></td>
                                            </tr>
                                        <tr>
                                            <th>Video</th>
                                            <td v-html="item.video_link"></td>
                                            </tr>
                                        <tr>
                                            <th>Position</th>
                                            <td>{{ item.position }}</td>
                                            </tr>
                                        <tr>
                                            <th>Is published</th>
                                            <td>{{ item.is_published }}</td>
                                            </tr>
                                        <tr>
                                            <th>Is free</th>
                                            <td>{{ item.is_free }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
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
    created() {
        this.fetchData(this.$route.params.id)
    },
    destroyed() {
        this.resetState()
    },
    computed: {
        ...mapGetters('LessonsSingle', ['item'])
    },
    watch: {
        "$route.params.id": function() {
            this.resetState()
            this.fetchData(this.$route.params.id)
        }
    },
    methods: {
        ...mapActions('LessonsSingle', ['fetchData', 'resetState'])
    }
}
</script>


<style scoped>

</style>
