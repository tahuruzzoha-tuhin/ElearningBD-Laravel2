function initialState() {
    return {
        item: {
            id: null,
            company: null,
            first_name: null,
            last_name: null,
            phone1: null,
            phone2: null,
            email: null,
            skype: null,
            address: null,
        },
        contactcompaniesAll: [],
        
        loading: false,
    }
}

const getters = {
    item: state => state.item,
    loading: state => state.loading,
    contactcompaniesAll: state => state.contactcompaniesAll,
    
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

            if (_.isEmpty(state.item.company)) {
                params.set('company_id', '')
            } else {
                params.set('company_id', state.item.company.id)
            }

            axios.post('/api/v1/contacts', params)
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

            if (_.isEmpty(state.item.company)) {
                params.set('company_id', '')
            } else {
                params.set('company_id', state.item.company.id)
            }

            axios.post('/api/v1/contacts/' + state.item.id, params)
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
        axios.get('/api/v1/contacts/' + id)
            .then(response => {
                commit('setItem', response.data.data)
            })

        dispatch('fetchContactcompaniesAll')
    },
    fetchContactcompaniesAll({ commit }) {
        axios.get('/api/v1/contact-companies')
            .then(response => {
                commit('setContactcompaniesAll', response.data.data)
            })
    },
    setCompany({ commit }, value) {
        commit('setCompany', value)
    },
    setFirst_name({ commit }, value) {
        commit('setFirst_name', value)
    },
    setLast_name({ commit }, value) {
        commit('setLast_name', value)
    },
    setPhone1({ commit }, value) {
        commit('setPhone1', value)
    },
    setPhone2({ commit }, value) {
        commit('setPhone2', value)
    },
    setEmail({ commit }, value) {
        commit('setEmail', value)
    },
    setSkype({ commit }, value) {
        commit('setSkype', value)
    },
    setAddress({ commit }, value) {
        commit('setAddress', value)
    },
    resetState({ commit }) {
        commit('resetState')
    }
}

const mutations = {
    setItem(state, item) {
        state.item = item
    },
    setCompany(state, value) {
        state.item.company = value
    },
    setFirst_name(state, value) {
        state.item.first_name = value
    },
    setLast_name(state, value) {
        state.item.last_name = value
    },
    setPhone1(state, value) {
        state.item.phone1 = value
    },
    setPhone2(state, value) {
        state.item.phone2 = value
    },
    setEmail(state, value) {
        state.item.email = value
    },
    setSkype(state, value) {
        state.item.skype = value
    },
    setAddress(state, value) {
        state.item.address = value
    },
    setContactcompaniesAll(state, value) {
        state.contactcompaniesAll = value
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
