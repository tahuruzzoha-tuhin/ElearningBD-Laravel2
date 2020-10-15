<template>
    <section class="content-wrapper" style="min-height: 960px;">
        <section class="content-header">
            <h1>Contacts</h1>
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
                                    <label for="company">Company *</label>
                                    <v-select
                                            name="company"
                                            label="name"
                                            @input="updateCompany"
                                            :value="item.company"
                                            :options="contactcompaniesAll"
                                            />
                                </div>
                                <div class="form-group">
                                    <label for="first_name">First name</label>
                                    <input
                                            type="text"
                                            class="form-control"
                                            name="first_name"
                                            placeholder="Enter First name"
                                            :value="item.first_name"
                                            @input="updateFirst_name"
                                            >
                                </div>
                                <div class="form-group">
                                    <label for="last_name">Last name</label>
                                    <input
                                            type="text"
                                            class="form-control"
                                            name="last_name"
                                            placeholder="Enter Last name"
                                            :value="item.last_name"
                                            @input="updateLast_name"
                                            >
                                </div>
                                <div class="form-group">
                                    <label for="phone1">Phone 1</label>
                                    <input
                                            type="text"
                                            class="form-control"
                                            name="phone1"
                                            placeholder="Enter Phone 1"
                                            :value="item.phone1"
                                            @input="updatePhone1"
                                            >
                                </div>
                                <div class="form-group">
                                    <label for="phone2">Phone 2</label>
                                    <input
                                            type="text"
                                            class="form-control"
                                            name="phone2"
                                            placeholder="Enter Phone 2"
                                            :value="item.phone2"
                                            @input="updatePhone2"
                                            >
                                </div>
                                <div class="form-group">
                                    <label for="email">Email</label>
                                    <input
                                            type="text"
                                            class="form-control"
                                            name="email"
                                            placeholder="Enter Email"
                                            :value="item.email"
                                            @input="updateEmail"
                                            >
                                </div>
                                <div class="form-group">
                                    <label for="skype">Skype</label>
                                    <input
                                            type="text"
                                            class="form-control"
                                            name="skype"
                                            placeholder="Enter Skype"
                                            :value="item.skype"
                                            @input="updateSkype"
                                            >
                                </div>
                                <div class="form-group">
                                    <label for="address">Address</label>
                                    <input
                                            type="text"
                                            class="form-control"
                                            name="address"
                                            placeholder="Enter Address"
                                            :value="item.address"
                                            @input="updateAddress"
                                            >
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
        ...mapGetters('ContactsSingle', ['item', 'loading', 'contactcompaniesAll']),
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
        ...mapActions('ContactsSingle', ['fetchData', 'updateData', 'resetState', 'setCompany', 'setFirst_name', 'setLast_name', 'setPhone1', 'setPhone2', 'setEmail', 'setSkype', 'setAddress']),
        updateCompany(value) {
            this.setCompany(value)
        },
        updateFirst_name(e) {
            this.setFirst_name(e.target.value)
        },
        updateLast_name(e) {
            this.setLast_name(e.target.value)
        },
        updatePhone1(e) {
            this.setPhone1(e.target.value)
        },
        updatePhone2(e) {
            this.setPhone2(e.target.value)
        },
        updateEmail(e) {
            this.setEmail(e.target.value)
        },
        updateSkype(e) {
            this.setSkype(e.target.value)
        },
        updateAddress(e) {
            this.setAddress(e.target.value)
        },
        submitForm() {
            this.updateData()
                .then(() => {
                    this.$router.push({ name: 'contacts.index' })
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
