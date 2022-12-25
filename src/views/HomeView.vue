<template>
    <div class="home">
        <v-container>
            <v-row>
                <v-col cols="12" offset-lg="4" lg="4" class="pa-0">
                    <v-card class="contact-list" tile outlined>
                        <v-card-text>
                            <p class="text-h5">
                                My Contact
                            </p>

                            <v-text-field
                                v-model="searchTerm"
                                label="Type Name or Number"
                                hide-details
                                solo
                                append-icon="mdi-magnify"
                                @input="search"
                            ></v-text-field>
                        </v-card-text>

                        <div v-if="filteredResult && filteredResult.length > 0">
                            <v-card v-for="item in filteredResult" :key="item.id" class="mx-4 mb-1 pa-1">
                                <v-list two-line class="pa-0">
                                    <v-list-item @click="viewContact(item)">
                                        <v-list-item-avatar class="my-0" tile size="40" color="grey">
                                            {{ intials(item) }}
                                        </v-list-item-avatar>

                                        <v-list-item-content>
                                            <v-list-item-title class="text-h6 blue--text mb-1 ">
                                                {{ fullName(item) }}
                                            </v-list-item-title>

                                            <v-list-item-subtitle>
                                                {{ item.phone }}
                                            </v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list>
                            </v-card>
                        </div>

                        <div v-else>
                            <v-card class="mx-4 mb-1 pa-1">
                                <v-list-item-content>
                                    <v-list-item-title class="text-h6 blue--text mb-1 text-center">
                                        No Records Found!
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-card>
                        </div>
                    </v-card>

                    <v-footer>
                        <v-btn fab color="primary" class="mx-auto fb" bottom center @click="newContact">
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                    </v-footer>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    name: "Home",
    components: {},
    data: function() {
        return {
            searchTerm: "",
            contacts: [],
            filteredResult: [],
        };
    },

    methods: {
        fullName: function(item) {
            let fullName =
                item.firstName.charAt(0).toUpperCase() +
                item.firstName.substring(1, item.firstName.length) +
                " " +
                item.lastName.charAt(0).toUpperCase() +
                item.lastName.substring(1, item.lastName.length);
            return fullName;
        },

        intials: function(item) {
            return item.firstName.charAt(0).toUpperCase() + item.lastName.charAt(0).toUpperCase();
        },

        search: function() {
            if (this.searchTerm != "") {
                let keyword = this.searchTerm.toLowerCase();
                this.filteredResult = this.contacts.filter((obj) => {
                    return (
                        obj.firstName.toLowerCase().includes(keyword) || obj.lastName.toLowerCase().includes(keyword) || obj.phone.includes(keyword)
                    );
                });
            } else {
                this.filteredResult = [...this.contacts];
            }
        },

        newContact: function() {
            this.$router.push({ name: "details", query: {} });
        },

        viewContact: function(item) {
            this.$router.push({ name: "details", query: item });
        },
    },

    mounted: function() {
        this.contacts = this.$store.getters.getContacts;
        console.log(this.contacts);
        this.filteredResult = [...this.contacts].sort((a, b) => {
            return a.firstName.toLowerCase() > b.firstName.toLowerCase() ? 1 : -1;
        });
        console.log(this.filteredResult);
    },
};
</script>

<style scoped>
.fb {
    margin-top: -36px;
    left: "50%";
    transform: "translateX(-50%)";
}
</style>
