<template>
    <section class="content-wrapper" style="min-height: 960px;">
        <section class="content-header">
            <h1>Courses</h1>
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
                                    <label for="teacher">Teacher *</label>
                                    <v-select
                                            name="teacher"
                                            label="title"
                                            @input="updateTeacher"
                                            :value="item.teacher"
                                            :options="permissionsAll"
                                            />
                                </div>
                                <div class="form-group">
                                    <label for="title">Title *</label>
                                    <input
                                            type="text"
                                            class="form-control"
                                            name="title"
                                            placeholder="Enter Title *"
                                            :value="item.title"
                                            @input="updateTitle"
                                            >
                                </div>
                                <div class="form-group">
                                    <label for="description">Description *</label>
                                    <vue-ckeditor
                                            name="description"
                                            :id="'description'"
                                            :value="item.description"
                                            @input="updateDescription"
                                    />
                                </div>
                                <div class="form-group">
                                    <label for="price">Price</label>
                                    <input
                                            type="text"
                                            class="form-control"
                                            name="price"
                                            placeholder="Enter Price"
                                            :value="item.price"
                                            @input="updatePrice"
                                            >
                                </div>
                                <div class="form-group">
                                    <label for="thumbnail">Thumbnail</label>
                                    <input
                                            type="file"
                                            class="form-control"
                                            @change="updateThumbnail"
                                            multiple="multiple"
                                    >
                                    <ul v-if="item.thumbnail || item.uploaded_thumbnail" class="list-unstyled">
                                        <li v-for="thumbnail in item.uploaded_thumbnail">
                                            {{ thumbnail.file_name }}
                                            <button class="btn btn-xs btn-danger"
                                                    type="button"
                                                    @click="removeUploadedThumbnail($event, thumbnail.id);"
                                            >
                                                Remove file
                                            </button>
                                        </li>
                                        <li v-for="(thumbnail, index) in item.thumbnail">
                                            {{ thumbnail.name }}
                                            <button class="btn btn-xs btn-danger"
                                                    type="button"
                                                    @click="removeThumbnail($event, index);"
                                            >
                                                Remove file
                                            </button>
                                        </li>
                                    </ul>
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
                                <div class="form-group">
                                    <label for="students">Students</label>
                                    <v-select
                                            name="students"
                                            label="name"
                                            @input="updateStudents"
                                            :value="item.students"
                                            :options="usersAll"
                                            multiple
                                            />
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
        ...mapGetters('CoursesSingle', ['item', 'loading', 'permissionsAll', 'usersAll']),
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
        ...mapActions('CoursesSingle', ['fetchData', 'updateData', 'resetState', 'setTeacher', 'setTitle', 'setDescription', 'setPrice', 'setThumbnail', 'destroyThumbnail', 'destroyUploadedThumbnail', 'setIs_published', 'setStudents']),
        updateTeacher(value) {
            this.setTeacher(value)
        },
        updateTitle(e) {
            this.setTitle(e.target.value)
        },
        updateDescription(value) {
            this.setDescription(value)
        },
        updatePrice(e) {
            this.setPrice(e.target.value)
        },
        removeThumbnail(e, id) {
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
                    this.destroyThumbnail(id);
                }
            })
        },
        updateThumbnail(e) {
            this.setThumbnail(e.target.files);
            this.$forceUpdate();
        },
        removeUploadedThumbnail (e, id) {
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
                this.destroyUploadedThumbnail(id);
            }
        })
        },
        updateIs_published(e) {
            this.setIs_published(e.target.checked)
        },
        updateStudents(value) {
            this.setStudents(value)
        },
        submitForm() {
            this.updateData()
                .then(() => {
                    this.$router.push({ name: 'courses.index' })
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
