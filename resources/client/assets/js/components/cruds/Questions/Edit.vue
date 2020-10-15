<template>
    <section class="content-wrapper" style="min-height: 960px;">
        <section class="content-header">
            <h1>Questions</h1>
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
                                    <label for="question_id">Question id *</label>
                                    <input
                                            type="number"
                                            class="form-control"
                                            name="question_id"
                                            placeholder="Enter Question id *"
                                            :value="item.question_id"
                                            @input="updateQuestion_id"
                                            >
                                </div>
                                <div class="form-group">
                                    <label for="test">Test</label>
                                    <v-select
                                            name="test"
                                            label="title"
                                            @input="updateTest"
                                            :value="item.test"
                                            :options="testsAll"
                                            />
                                </div>
                                <div class="form-group">
                                    <label for="question_text">Question text *</label>
                                    <input
                                            type="text"
                                            class="form-control"
                                            name="question_text"
                                            placeholder="Enter Question text *"
                                            :value="item.question_text"
                                            @input="updateQuestion_text"
                                            >
                                </div>
                                <div class="form-group">
                                    <label for="question_image">Question image</label>
                                    <input
                                            type="file"
                                            class="form-control"
                                            @change="updateQuestion_image"
                                            multiple="multiple"
                                    >
                                    <ul v-if="item.question_image || item.uploaded_question_image" class="list-unstyled">
                                        <li v-for="question_image in item.uploaded_question_image">
                                            {{ question_image.file_name }}
                                            <button class="btn btn-xs btn-danger"
                                                    type="button"
                                                    @click="removeUploadedQuestionImage($event, question_image.id);"
                                            >
                                                Remove file
                                            </button>
                                        </li>
                                        <li v-for="(question_image, index) in item.question_image">
                                            {{ question_image.name }}
                                            <button class="btn btn-xs btn-danger"
                                                    type="button"
                                                    @click="removeQuestion_image($event, index);"
                                            >
                                                Remove file
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                                <div class="form-group">
                                    <label for="question_file">Question file</label>
                                    <input
                                            type="file"
                                            class="form-control"
                                            @change="updateQuestion_file"
                                            multiple="multiple"
                                    >
                                    <ul v-if="item.question_file || item.uploaded_question_file" class="list-unstyled">
                                        <li v-for="question_file in item.uploaded_question_file">
                                            {{ question_file.file_name }}
                                            <button class="btn btn-xs btn-danger"
                                                    type="button"
                                                    @click="removeUploadedQuestionFile($event, question_file.id);"
                                            >
                                                Remove file
                                            </button>
                                        </li>
                                        <li v-for="(question_file, index) in item.question_file">
                                            {{ question_file.name }}
                                            <button class="btn btn-xs btn-danger"
                                                    type="button"
                                                    @click="removeQuestion_file($event, index);"
                                            >
                                                Remove file
                                            </button>
                                        </li>
                                    </ul>
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
        ...mapGetters('QuestionsSingle', ['item', 'loading', 'testsAll']),
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
        ...mapActions('QuestionsSingle', ['fetchData', 'updateData', 'resetState', 'setQuestion_id', 'setTest', 'setQuestion_text', 'setQuestion_image', 'destroyQuestion_image', 'destroyUploadedQuestionImage', 'setQuestion_file', 'destroyQuestion_file', 'destroyUploadedQuestionFile']),
        updateQuestion_id(e) {
            this.setQuestion_id(e.target.value)
        },
        updateTest(value) {
            this.setTest(value)
        },
        updateQuestion_text(e) {
            this.setQuestion_text(e.target.value)
        },
        removeQuestion_image(e, id) {
            this.$swal({
                title: 'Are you sure?',
                text: "To fully delete the file submit the form.",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Delete',
                confirmButtonColor: '#dd4b39',
                focusCancel: true,
                reverseButtons: true
            }).then(result => {
                if (typeof result.dismiss === "undefined") {
                    this.destroyQuestion_image(id);
                }
            })
        },
        updateQuestion_image(e) {
            this.setQuestion_image(e.target.files);
            this.$forceUpdate();
        },
        removeUploadedQuestionImage (e, id) {
        this.$swal({
          title: 'Are you sure ? ',
          text: "To fully delete the file submit the form.",
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Delete',
          confirmButtonColor: '#dd4b39',
          focusCancel: true,
          reverseButtons: true
        }).
        then(result => {
            if (typeof result.dismiss === "undefined") {
                this.destroyUploadedQuestionImage(id);
            }
        })
        },
        removeQuestion_file(e, id) {
            this.$swal({
                title: 'Are you sure?',
                text: "To fully delete the file submit the form.",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Delete',
                confirmButtonColor: '#dd4b39',
                focusCancel: true,
                reverseButtons: true
            }).then(result => {
                if (typeof result.dismiss === "undefined") {
                    this.destroyQuestion_file(id);
                }
            })
        },
        updateQuestion_file(e) {
            this.setQuestion_file(e.target.files);
            this.$forceUpdate();
        },
        removeUploadedQuestionFile (e, id) {
        this.$swal({
          title: 'Are you sure ? ',
          text: "To fully delete the file submit the form.",
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Delete',
          confirmButtonColor: '#dd4b39',
          focusCancel: true,
          reverseButtons: true
        }).
        then(result => {
            if (typeof result.dismiss === "undefined") {
                this.destroyUploadedQuestionFile(id);
            }
        })
        },
        submitForm() {
            this.updateData()
                .then(() => {
                    this.$router.push({ name: 'questions.index' })
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
