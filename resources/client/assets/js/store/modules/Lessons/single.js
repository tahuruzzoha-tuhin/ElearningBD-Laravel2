function initialState() {
    return {
        item: {
            id: null,
            lesson_id: null,
            course: null,
            title: null,
            thumbnail: [],
            uploaded_thumbnail: [],
            short_text: null,
            long_text: null,
            video: [],
            uploaded_video: [],
            position: null,
            is_published: false,
            is_free: false,
        },
        coursesAll: [],
        
        loading: false,
    }
}

const getters = {
    item: state => state.item,
    loading: state => state.loading,
    coursesAll: state => state.coursesAll,
    
}

const actions = {
    storeData({ commit, state, dispatch }) {
        commit('setLoading', true)
        dispatch('Alert/resetState', null, { root: true })

        return new Promise((resolve, reject) => {
            let params = new FormData();

            for (let fieldName in state.item) {
                let fieldValue = state.item[fieldName];
                if (typeof fieldValue !== 'object') {
                    params.set(fieldName, fieldValue);
                } else {
                    if (fieldValue && typeof fieldValue[0] !== 'object') {
                        params.set(fieldName, fieldValue);
                    } else {
                        for (let index in fieldValue) {
                            params.set(fieldName + '[' + index + ']', fieldValue[index]);
                        }
                    }
                }
            }

            if (_.isEmpty(state.item.course)) {
                params.set('course_id', '')
            } else {
                params.set('course_id', state.item.course.id)
            }
            params.set('uploaded_thumbnail', state.item.uploaded_thumbnail.map(o => o['id']))
            params.set('uploaded_video', state.item.uploaded_video.map(o => o['id']))
            params.set('is_published', state.item.is_published ? 1 : 0)
            params.set('is_free', state.item.is_free ? 1 : 0)

            axios.post('/api/v1/lessons', params)
                .then(response => {
                    commit('resetState')
                    resolve()
                })
                .catch(error => {
                    let message = error.response.data.message || error.message
                    let errors  = error.response.data.errors

                    dispatch(
                        'Alert/setAlert',
                        { message: message, errors: errors, color: 'danger' },
                        { root: true })

                    reject(error)
                })
                .finally(() => {
                    commit('setLoading', false)
                })
        })
    },
    updateData({ commit, state, dispatch }) {
        commit('setLoading', true)
        dispatch('Alert/resetState', null, { root: true })

        return new Promise((resolve, reject) => {
            let params = new FormData();
            params.set('_method', 'PUT')

            for (let fieldName in state.item) {
                let fieldValue = state.item[fieldName];
                if (typeof fieldValue !== 'object') {
                    params.set(fieldName, fieldValue);
                } else {
                    if (fieldValue && typeof fieldValue[0] !== 'object') {
                        params.set(fieldName, fieldValue);
                    } else {
                        for (let index in fieldValue) {
                            params.set(fieldName + '[' + index + ']', fieldValue[index]);
                        }
                    }
                }
            }

            if (_.isEmpty(state.item.course)) {
                params.set('course_id', '')
            } else {
                params.set('course_id', state.item.course.id)
            }
            params.set('uploaded_thumbnail', state.item.uploaded_thumbnail.map(o => o['id']))
            params.set('uploaded_video', state.item.uploaded_video.map(o => o['id']))
            params.set('is_published', state.item.is_published ? 1 : 0)
            params.set('is_free', state.item.is_free ? 1 : 0)

            axios.post('/api/v1/lessons/' + state.item.id, params)
                .then(response => {
                    commit('setItem', response.data.data)
                    resolve()
                })
                .catch(error => {
                    let message = error.response.data.message || error.message
                    let errors  = error.response.data.errors

                    dispatch(
                        'Alert/setAlert',
                        { message: message, errors: errors, color: 'danger' },
                        { root: true })

                    reject(error)
                })
                .finally(() => {
                    commit('setLoading', false)
                })
        })
    },
    fetchData({ commit, dispatch }, id) {
        axios.get('/api/v1/lessons/' + id)
            .then(response => {
                commit('setItem', response.data.data)
            })

        dispatch('fetchCoursesAll')
    },
    fetchCoursesAll({ commit }) {
        axios.get('/api/v1/courses')
            .then(response => {
                commit('setCoursesAll', response.data.data)
            })
    },
    setLesson_id({ commit }, value) {
        commit('setLesson_id', value)
    },
    setCourse({ commit }, value) {
        commit('setCourse', value)
    },
    setTitle({ commit }, value) {
        commit('setTitle', value)
    },
    setThumbnail({ commit }, value) {
        commit('setThumbnail', value)
    },
    destroyThumbnail({ commit }, value) {
        commit('destroyThumbnail', value)
    },
    destroyUploadedThumbnail({ commit }, value) {
        commit('destroyUploadedThumbnail', value)
    },
    setShort_text({ commit }, value) {
        commit('setShort_text', value)
    },
    setLong_text({ commit }, value) {
        commit('setLong_text', value)
    },
    setVideo({ commit }, value) {
        commit('setVideo', value)
    },
    destroyVideo({ commit }, value) {
        commit('destroyVideo', value)
    },
    destroyUploadedVideo({ commit }, value) {
        commit('destroyUploadedVideo', value)
    },
    setPosition({ commit }, value) {
        commit('setPosition', value)
    },
    setIs_published({ commit }, value) {
        commit('setIs_published', value)
    },
    setIs_free({ commit }, value) {
        commit('setIs_free', value)
    },
    resetState({ commit }) {
        commit('resetState')
    }
}

const mutations = {
    setItem(state, item) {
        state.item = item
    },
    setLesson_id(state, value) {
        state.item.lesson_id = value
    },
    setCourse(state, value) {
        state.item.course = value
    },
    setTitle(state, value) {
        state.item.title = value
    },
    setThumbnail(state, value) {
        for (let i in value) {
            let thumbnail = value[i];
            if (typeof thumbnail === "object") {
                state.item.thumbnail.push(thumbnail);
            }
        }
    },
    destroyThumbnail(state, value) {
        for (let i in state.item.thumbnail) {
            if (i == value) {
                state.item.thumbnail.splice(i, 1);
            }
        }
    },
    destroyUploadedThumbnail(state, value) {
        for (let i in state.item.uploaded_thumbnail) {
            let data = state.item.uploaded_thumbnail[i];
            if (data.id === value) {
                state.item.uploaded_thumbnail.splice(i, 1);
            }
        }
    },
    setShort_text(state, value) {
        state.item.short_text = value
    },
    setLong_text(state, value) {
        state.item.long_text = value
    },
    setVideo(state, value) {
        for (let i in value) {
            let video = value[i];
            if (typeof video === "object") {
                state.item.video.push(video);
            }
        }
    },
    destroyVideo(state, value) {
        for (let i in state.item.video) {
            if (i == value) {
                state.item.video.splice(i, 1);
            }
        }
    },
    destroyUploadedVideo(state, value) {
        for (let i in state.item.uploaded_video) {
            let data = state.item.uploaded_video[i];
            if (data.id === value) {
                state.item.uploaded_video.splice(i, 1);
            }
        }
    },
    setPosition(state, value) {
        state.item.position = value
    },
    setIs_published(state, value) {
        state.item.is_published = value
    },
    setIs_free(state, value) {
        state.item.is_free = value
    },
    setCoursesAll(state, value) {
        state.coursesAll = value
    },
    
    setLoading(state, loading) {
        state.loading = loading
    },
    resetState(state) {
        state = Object.assign(state, initialState())
    }
}

export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
}
