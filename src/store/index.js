import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        contacts: localStorage.getItem("contacts") || [],
    },
    getters: {
        getContacts: (state) => state.contacts,
    },
    mutations: {
        setContacts(state, contacts) {
            state.contacts = contacts;
            localStorage.setItem("contacts", contacts);
        },
    },
    actions: {
        setContacts: function({ commit }, contacts) {
            return new Promise(() => {
                commit("setContacts", contacts);
            });
        },
    },
    modules: {},
});
