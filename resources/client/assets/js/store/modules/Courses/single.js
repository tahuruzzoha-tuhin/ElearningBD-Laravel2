function initialState() {
    return {
        item: {
            id: null,
            user_id: null,
            teacher: null,
            title: null,
            description: null,
            price: null,
            thumbnail: [],
            uploaded_thumbnail: [],
            is_published: false,
            students: [],
        },
        permissionsAll: [],
        usersAll: [],
        
        loading: false,
    }
}

const getters = {
    item: state => state.item,
    loading: state => state.loading,
    permissionsAll: state => state.permissionsAll,
    usersAll: state => state.usersAll,
    
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

            if (_.isEmpty(state.item.teacher)) {
                params.set('teacher_id', '')
            } else {
                params.set('teacher_id', state.item.teacher.id)
            }
            params.set('uploaded_thumbnail', state.item.uploaded_thumbnail.map(o => o['id']))
            params.set('is_published', state.item.is_published ? 1 : 0)
            if (_.isEmpty(state.item.students)) {
                params.delete('students')
            } else {
                for (let index in state.item.students) {
                    params.set('students['+index+']', state.item.students[index].id)
                }
            }

            axios.post('/api/v1/courses', params)
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

            if (_.isEmpty(state.item.teacher)) {
                params.set('teacher_id', '')
            } else {
                params.set('teacher_id', state.item.teacher.id)
            }
            params.set('uploaded_thumbnail', state.item.uploaded_thumbnail.map(o => o['id']))
            params.set('is_published', state.item.is_published ? 1 : 0)
            if (_.isEmpty(state.item.students)) {
                params.delete('students')
            } else {
                for (let index in state.item.students) {
                    params.set('students['+index+']', state.item.students[index].id)
                }
            }

            axios.post('/api/v1/courses/' + state.item.id, params)
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
        axios.get('/api/v1/courses/' + id)
            .then(response => {
                commit('setItem', response.data.data)
            })

        dispatch('fetchPermissionsAll')
    dispatch('fetchUsersAll')
    },
    fetchPermissionsAll({ commit }) {
        axios.get('/api/v1/permissions')
            .then(response => {
                commit('setPermissionsAll', response.data.data)
            })
    },
    fetchUsersAll({ commit }) {
        axios.get('/api/v1/users')
            .then(response => {
                commit('setUsersAll', response.data.data)
            })
    },
    setUser_id({ commit }, value) {
        commit('setUser_id', value)
    },
    setTeacher({ commit }, value) {
        commit('setTeacher', value)
    },
    setTitle({ commit }, value) {
        commit('setTitle', value)
    },
    setDescription({ commit }, value) {
        commit('setDescription', value)
    },
    setPrice({ commit }, value) {
        commit('setPrice', value)
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
    setIs_published({ commit }, value) {
        commit('setIs_published', value)
    },
    setStudents({ commit }, value) {
        commit('setStudents', value)
    },
    resetState({ commit }) {
        commit('resetState')
    }
}

const mutations = {
    setItem(state, item) {
        state.item = item
    },
    setUser_id(state, value) {
        state.item.user_id = value
    },
    setTeacher(state, value) {
        state.item.teacher = value
    },
    setTitle(state, value) {
        state.item.title = value
    },
    setDescription(state, value) {
        state.item.description = value
    },
    setPrice(state, value) {
        state.item.price = value
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
    setIs_published(state, value) {
        state.item.is_published = value
    },
    setStudents(state, value) {
        state.item.students = value
    },
    setPermissionsAll(state, value) {
        state.permissionsAll = value
    },
    setUsersAll(state, value) {
        state.usersAll = value
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
