function initialState() {
    return {
        item: {
            id: null,
            test_id: null,
            courses: null,
            lesson: null,
            title: null,
            description: null,
            is_published: false,
        },
        coursesAll: [],
        lessonsAll: [],
        
        loading: false,
    }
}

const getters = {
    item: state => state.item,
    loading: state => state.loading,
    coursesAll: state => state.coursesAll,
    lessonsAll: state => state.lessonsAll,
    
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

            if (_.isEmpty(state.item.courses)) {
                params.set('courses_id', '')
            } else {
                params.set('courses_id', state.item.courses.id)
            }
            if (_.isEmpty(state.item.lesson)) {
                params.set('lesson_id', '')
            } else {
                params.set('lesson_id', state.item.lesson.id)
            }
            params.set('is_published', state.item.is_published ? 1 : 0)

            axios.post('/api/v1/tests', params)
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

            if (_.isEmpty(state.item.courses)) {
                params.set('courses_id', '')
            } else {
                params.set('courses_id', state.item.courses.id)
            }
            if (_.isEmpty(state.item.lesson)) {
                params.set('lesson_id', '')
            } else {
                params.set('lesson_id', state.item.lesson.id)
            }
            params.set('is_published', state.item.is_published ? 1 : 0)

            axios.post('/api/v1/tests/' + state.item.id, params)
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
        axios.get('/api/v1/tests/' + id)
            .then(response => {
                commit('setItem', response.data.data)
            })

        dispatch('fetchCoursesAll')
    dispatch('fetchLessonsAll')
    },
    fetchCoursesAll({ commit }) {
        axios.get('/api/v1/courses')
            .then(response => {
                commit('setCoursesAll', response.data.data)
            })
    },
    fetchLessonsAll({ commit }) {
        axios.get('/api/v1/lessons')
            .then(response => {
                commit('setLessonsAll', response.data.data)
            })
    },
    setTest_id({ commit }, value) {
        commit('setTest_id', value)
    },
    setCourses({ commit }, value) {
        commit('setCourses', value)
    },
    setLesson({ commit }, value) {
        commit('setLesson', value)
    },
    setTitle({ commit }, value) {
        commit('setTitle', value)
    },
    setDescription({ commit }, value) {
        commit('setDescription', value)
    },
    setIs_published({ commit }, value) {
        commit('setIs_published', value)
    },
    resetState({ commit }) {
        commit('resetState')
    }
}

const mutations = {
    setItem(state, item) {
        state.item = item
    },
    setTest_id(state, value) {
        state.item.test_id = value
    },
    setCourses(state, value) {
        state.item.courses = value
    },
    setLesson(state, value) {
        state.item.lesson = value
    },
    setTitle(state, value) {
        state.item.title = value
    },
    setDescription(state, value) {
        state.item.description = value
    },
    setIs_published(state, value) {
        state.item.is_published = value
    },
    setCoursesAll(state, value) {
        state.coursesAll = value
    },
    setLessonsAll(state, value) {
        state.lessonsAll = value
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
