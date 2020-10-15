<template>
    <section class="content-wrapper" style="min-height: 960px;">
        <section class="content-header">
            <h1>Lessons</h1>
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
                                    <label for="lesson_id">Lesson id *</label>
                                    <input
                                            type="number"
                                            min="1"
                                            max="10000"
                                            class="form-control"
                                            name="lesson_id"
                                            placeholder="Enter Lesson id *"
                                            :value="item.lesson_id"
                                            @input="updateLesson_id"
                                            >
                                </div>
                                <div class="form-group">
                                    <label for="course">Course *</label>
                                    <v-select
                                            name="course"
                                            label="title"
                                            @input="updateCourse"
                                            :value="item.course"
                                            :options="coursesAll"
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
                                    <label for="short_text">Short text</label>
                                    <textarea
                                            rows="3"
                                            class="form-control"
                                            name="short_text"
                                            placeholder="Enter Short text"
                                            :value="item.short_text"
                                            @input="updateShort_text"
                                            >
                                    </textarea>
                                </div>
                                <div class="form-group">
                                    <label for="long_text">Long text</label>
                                    <vue-ckeditor
                                            name="long_text"
                                            :id="'long_text'"
                                            :value="item.long_text"
                                            @input="updateLong_text"
                                    />
                                </div>
                                <div class="form-group">
                                    <label for="video">Video</label>
                                    <input
                                            type="file"
                                            class="form-control"
                                            @change="updateVideo"
                                            multiple="multiple"
                                    >
                                    <ul v-if="item.video || item.uploaded_video" class="list-unstyled">
                                        <li v-for="video in item.uploaded_video">
                                            {{ video.file_name }}
                                            <button class="btn btn-xs btn-danger"
                                                    type="button"
                                                    @click="removeUploadedVideo($event, video.id);"
                                            >
                                                Remove file
                                            </button>
                                        </li>
                                        <li v-for="(video, index) in item.video">
                                            {{ video.name }}
                                            <button class="btn btn-xs btn-danger"
                                                    type="button"
                                                    @click="removeVideo($event, index);"
                                            >
                                                Remove file
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                                <div class="form-group">
                                    <label for="position">Position</label>
                                    <input
                                            type="number"
                                            class="form-control"
                                            name="position"
                                            placeholder="Enter Position"
                                            :value="item.position"
                                            @input="updatePosition"
                                            >
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
                                    <div class="checkbox">
                                        <label>
                                            <input
                                                    type="checkbox"
                                                    name="is_free"
                                                    :value="item.is_free"
                                                    :checked="item.is_free == true"
                                                    @change="updateIs_free"
                                                    >
                                            Is free
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
        ...mapGetters('LessonsSingle', ['item', 'loading', 'coursesAll']),
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
        ...mapActions('LessonsSingle', ['fetchData', 'updateData', 'resetState', 'setLesson_id', 'setCourse', 'setTitle', 'setThumbnail', 'destroyThumbnail', 'destroyUploadedThumbnail', 'setShort_text', 'setLong_text', 'setVideo', 'destroyVideo', 'destroyUploadedVideo', 'setPosition', 'setIs_published', 'setIs_free']),
        updateLesson_id(e) {
            this.setLesson_id(e.target.value)
        },
        updateCourse(value) {
            this.setCourse(value)
        },
        updateTitle(e) {
            this.setTitle(e.target.value)
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
        updateShort_text(e) {
            this.setShort_text(e.target.value)
        },
        updateLong_text(value) {
            this.setLong_text(value)
        },
        removeVideo(e, id) {
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
                    this.destroyVideo(id);
                }
            })
        },
        updateVideo(e) {
            this.setVideo(e.target.files);
            this.$forceUpdate();
        },
        removeUploadedVideo (e, id) {
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
                this.destroyUploadedVideo(id);
            }
        })
        },
        updatePosition(e) {
            this.setPosition(e.target.value)
        },
        updateIs_published(e) {
            this.setIs_published(e.target.checked)
        },
        updateIs_free(e) {
            this.setIs_free(e.target.checked)
        },
        submitForm() {
            this.updateData()
                .then(() => {
                    this.$router.push({ name: 'lessons.index' })
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
