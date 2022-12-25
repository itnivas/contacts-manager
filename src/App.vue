<template>
    <v-app>
        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<script>
import data from "@/assets/data.json";

export default {
    name: "App",

    data: () => ({
        //
    }),

    beforeMount: function() {
        this.$store.dispatch("setContacts", data.contacts);
    },
};
</script>

<style>
.contact-list {
    overflow-y: auto;
    height: calc(100vh - 30px);
    padding-bottom: 35px;
}
</style>
