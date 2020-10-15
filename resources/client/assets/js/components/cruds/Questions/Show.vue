<template>
    <section class="content-wrapper" style="min-height: 960px;">
        <section class="content-header">
            <h1>Questions</h1>
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
                                            <th>Question id</th>
                                            <td>{{ item.question_id }}</td>
                                            </tr>
                                        <tr>
                                            <th>Test</th>
                                            <td>
                                                <span class="label label-info" v-if="item.test !== null">
                                                    {{ item.test.title }}
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Question text</th>
                                            <td>{{ item.question_text }}</td>
                                            </tr>
                                        <tr>
                                            <th>Question image</th>
                                            <td v-html="item.question_image_link"></td>
                                            </tr>
                                        <tr>
                                            <th>Question file</th>
                                            <td v-html="item.question_file_link"></td>
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
        ...mapGetters('QuestionsSingle', ['item'])
    },
    watch: {
        "$route.params.id": function() {
            this.resetState()
            this.fetchData(this.$route.params.id)
        }
    },
    methods: {
        ...mapActions('QuestionsSingle', ['fetchData', 'resetState'])
    }
}
</script>


<style scoped>

</style>
