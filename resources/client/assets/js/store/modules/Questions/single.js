function initialState() {
    return {
        item: {
            id: null,
            question_id: null,
            test: null,
            question_text: null,
            question_image: [],
            uploaded_question_image: [],
            question_file: [],
            uploaded_question_file: [],
        },
        testsAll: [],
        
        loading: false,
    }
}

const getters = {
    item: state => state.item,
    loading: state => state.loading,
    testsAll: state => state.testsAll,
    
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

            if (_.isEmpty(state.item.test)) {
                params.set('test_id', '')
            } else {
                params.set('test_id', state.item.test.id)
            }
            params.set('uploaded_question_image', state.item.uploaded_question_image.map(o => o['id']))
            params.set('uploaded_question_file', state.item.uploaded_question_file.map(o => o['id']))

            axios.post('/api/v1/questions', params)
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

            if (_.isEmpty(state.item.test)) {
                params.set('test_id', '')
            } else {
                params.set('test_id', state.item.test.id)
            }
            params.set('uploaded_question_image', state.item.uploaded_question_image.map(o => o['id']))
            params.set('uploaded_question_file', state.item.uploaded_question_file.map(o => o['id']))

            axios.post('/api/v1/questions/' + state.item.id, params)
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
        axios.get('/api/v1/questions/' + id)
            .then(response => {
                commit('setItem', response.data.data)
            })

        dispatch('fetchTestsAll')
    },
    fetchTestsAll({ commit }) {
        axios.get('/api/v1/tests')
            .then(response => {
                commit('setTestsAll', response.data.data)
            })
    },
    setQuestion_id({ commit }, value) {
        commit('setQuestion_id', value)
    },
    setTest({ commit }, value) {
        commit('setTest', value)
    },
    setQuestion_text({ commit }, value) {
        commit('setQuestion_text', value)
    },
    setQuestion_image({ commit }, value) {
        commit('setQuestion_image', value)
    },
    destroyQuestion_image({ commit }, value) {
        commit('destroyQuestion_image', value)
    },
    destroyUploadedQuestionImage({ commit }, value) {
        commit('destroyUploadedQuestionImage', value)
    },
    setQuestion_file({ commit }, value) {
        commit('setQuestion_file', value)
    },
    destroyQuestion_file({ commit }, value) {
        commit('destroyQuestion_file', value)
    },
    destroyUploadedQuestionFile({ commit }, value) {
        commit('destroyUploadedQuestionFile', value)
    },
    resetState({ commit }) {
        commit('resetState')
    }
}

const mutations = {
    setItem(state, item) {
        state.item = item
    },
    setQuestion_id(state, value) {
        state.item.question_id = value
    },
    setTest(state, value) {
        state.item.test = value
    },
    setQuestion_text(state, value) {
        state.item.question_text = value
    },
    setQuestion_image(state, value) {
        for (let i in value) {
            let question_image = value[i];
            if (typeof question_image === "object") {
                state.item.question_image.push(question_image);
            }
        }
    },
    destroyQuestion_image(state, value) {
        for (let i in state.item.question_image) {
            if (i == value) {
                state.item.question_image.splice(i, 1);
            }
        }
    },
    destroyUploadedQuestionImage(state, value) {
        for (let i in state.item.uploaded_question_image) {
            let data = state.item.uploaded_question_image[i];
            if (data.id === value) {
                state.item.uploaded_question_image.splice(i, 1);
            }
        }
    },
    setQuestion_file(state, value) {
        for (let i in value) {
            let question_file = value[i];
            if (typeof question_file === "object") {
                state.item.question_file.push(question_file);
            }
        }
    },
    destroyQuestion_file(state, value) {
        for (let i in state.item.question_file) {
            if (i == value) {
                state.item.question_file.splice(i, 1);
            }
        }
    },
    destroyUploadedQuestionFile(state, value) {
        for (let i in state.item.uploaded_question_file) {
            let data = state.item.uploaded_question_file[i];
            if (data.id === value) {
                state.item.uploaded_question_file.splice(i, 1);
            }
        }
    },
    setTestsAll(state, value) {
        state.testsAll = value
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
