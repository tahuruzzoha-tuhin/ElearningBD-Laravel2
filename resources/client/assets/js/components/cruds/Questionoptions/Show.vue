<template>
    <section class="content-wrapper" style="min-height: 960px;">
        <section class="content-header">
            <h1>Question Option</h1>
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
                                            <th>Question</th>
                                            <td>
                                                <span class="label label-info" v-if="item.question !== null">
                                                    {{ item.question.question_text }}
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Option text</th>
                                            <td>{{ item.option_text }}</td>
                                            </tr>
                                        <tr>
                                            <th>Is correct</th>
                                            <td>{{ item.is_correct }}</td>
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
        ...mapGetters('QuestionoptionsSingle', ['item'])
    },
    watch: {
        "$route.params.id": function() {
            this.resetState()
            this.fetchData(this.$route.params.id)
        }
    },
    methods: {
        ...mapActions('QuestionoptionsSingle', ['fetchData', 'resetState'])
    }
}
</script>


<style scoped>

</style>
