<template>
    <section class="content-wrapper" style="min-height: 960px;">
        <section class="content-header">
            <h1>Courses</h1>
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
                                            <th>User id</th>
                                            <td>{{ item.user_id }}</td>
                                            </tr>
                                        <tr>
                                            <th>Teacher</th>
                                            <td>
                                                <span class="label label-info" v-if="item.teacher !== null">
                                                    {{ item.teacher.title }}
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Title</th>
                                            <td>{{ item.title }}</td>
                                            </tr>
                                        <tr>
                                            <th>Description</th>
                                            <td v-html="item.description"></td>
                                            </tr>
                                        <tr>
                                            <th>Price</th>
                                            <td>{{ item.price }}</td>
                                            </tr>
                                        <tr>
                                            <th>Thumbnail</th>
                                            <td v-html="item.thumbnail_link"></td>
                                            </tr>
                                        <tr>
                                            <th>Is published</th>
                                            <td>{{ item.is_published }}</td>
                                            </tr>
                                        <tr>
                                            <th>Students</th>
                                            <td>
                                                <span class="label label-info" v-for="students in item.students">
                                                    {{ students.name }}
                                                </span>
                                            </td>
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
        ...mapGetters('CoursesSingle', ['item'])
    },
    watch: {
        "$route.params.id": function() {
            this.resetState()
            this.fetchData(this.$route.params.id)
        }
    },
    methods: {
        ...mapActions('CoursesSingle', ['fetchData', 'resetState'])
    }
}
</script>


<style scoped>

</style>
