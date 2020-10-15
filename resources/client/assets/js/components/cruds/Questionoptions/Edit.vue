<template>
    <section class="content-wrapper" style="min-height: 960px;">
        <section class="content-header">
            <h1>Question Option</h1>
        </section>

        <section class="content">
            <div class="row">
                <div class="col-xs-12">
                    <form @submit.prevent="submitForm" novalidate>
                        <div class="box">
                            <div class="box-header with-border">
                                <h3 class="box-title">Edit</h3>
                            </div>

                            <div class="box-body">
                                <back-buttton></back-buttton>
                            </div>

                            <bootstrap-alert />

                            <div class="box-body">
                                <div class="form-group">
                                    <label for="question_id">Question id</label>
                                    <input
                                            type="number"
                                            class="form-control"
                                            name="question_id"
                                            placeholder="Enter Question id"
                                            :value="item.question_id"
                                            @input="updateQuestion_id"
                                            >
                                </div>
                                <div class="form-group">
                                    <label for="question">Question</label>
                                    <v-select
                                            name="question"
                                            label="question_text"
                                            @input="updateQuestion"
                                            :value="item.question"
                                            :options="questionsAll"
                                            />
                                </div>
                                <div class="form-group">
                                    <label for="option_text">Option text *</label>
                                    <input
                                            type="text"
                                            class="form-control"
                                            name="option_text"
                                            placeholder="Enter Option text *"
                                            :value="item.option_text"
                                            @input="updateOption_text"
                                            >
                                </div>
                                <div class="form-group">
                                    <div class="checkbox">
                                        <label>
                                            <input
                                                    type="checkbox"
                                                    name="is_correct"
                                                    :value="item.is_correct"
                                                    :checked="item.is_correct == true"
                                                    @change="updateIs_correct"
                                                    >
                                            Is correct
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
        ...mapGetters('QuestionoptionsSingle', ['item', 'loading', 'questionsAll']),
    },
    created() {
        this.fetchData(this.$route.params.id)
    },
    destroyed() {
        this.resetState()
    },
    watch: {
        "$route.params.id": function() {
            this.resetState()
            this.fetchData(this.$route.params.id)
        }
    },
    methods: {
        ...mapActions('QuestionoptionsSingle', ['fetchData', 'updateData', 'resetState', 'setQuestion_id', 'setQuestion', 'setOption_text', 'setIs_correct']),
        updateQuestion_id(e) {
            this.setQuestion_id(e.target.value)
        },
        updateQuestion(value) {
            this.setQuestion(value)
        },
        updateOption_text(e) {
            this.setOption_text(e.target.value)
        },
        updateIs_correct(e) {
            this.setIs_correct(e.target.checked)
        },
        submitForm() {
            this.updateData()
                .then(() => {
                    this.$router.push({ name: 'questionoptions.index' })
                    this.$eventHub.$emit('update-success')
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
