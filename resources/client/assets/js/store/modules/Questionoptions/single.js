function initialState() {
    return {
        item: {
            id: null,
            question_id: null,
            question: null,
            option_text: null,
            is_correct: false,
        },
        questionsAll: [],
        
        loading: false,
    }
}

const getters = {
    item: state => state.item,
    loading: state => state.loading,
    questionsAll: state => state.questionsAll,
    
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

            if (_.isEmpty(state.item.question)) {
                params.set('question_id', '')
            } else {
                params.set('question_id', state.item.question.id)
            }
            params.set('is_correct', state.item.is_correct ? 1 : 0)

            axios.post('/api/v1/questionoptions', params)
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

            if (_.isEmpty(state.item.question)) {
                params.set('question_id', '')
            } else {
                params.set('question_id', state.item.question.id)
            }
            params.set('is_correct', state.item.is_correct ? 1 : 0)

            axios.post('/api/v1/questionoptions/' + state.item.id, params)
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
        axios.get('/api/v1/questionoptions/' + id)
            .then(response => {
                commit('setItem', response.data.data)
            })

        dispatch('fetchQuestionsAll')
    },
    fetchQuestionsAll({ commit }) {
        axios.get('/api/v1/questions')
            .then(response => {
                commit('setQuestionsAll', response.data.data)
            })
    },
    setQuestion_id({ commit }, value) {
        commit('setQuestion_id', value)
    },
    setQuestion({ commit }, value) {
        commit('setQuestion', value)
    },
    setOption_text({ commit }, value) {
        commit('setOption_text', value)
    },
    setIs_correct({ commit }, value) {
        commit('setIs_correct', value)
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
    setQuestion(state, value) {
        state.item.question = value
    },
    setOption_text(state, value) {
        state.item.option_text = value
    },
    setIs_correct(state, value) {
        state.item.is_correct = value
    },
    setQuestionsAll(state, value) {
        state.questionsAll = value
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
