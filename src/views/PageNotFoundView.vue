<template>
    <div>
        <v-container>
            <v-row>
                <v-col cols="12" offset-lg="4" lg="4" class="pa-0">
                    <v-card class="contact-list" tile outlined>
                        <v-card-text>
                            <v-btn text primary @click="toHome"><v-icon>mdi-chevron-left</v-icon>Home</v-btn>
                        </v-card-text>
                        <v-list-item-content>
                            <v-list-item-title class="text-h6 blue--text mb-1 text-center">
                                Page Not Found!
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    methods: {
        toHome: function() {
            this.$router.push("/");
        },
    },
};
</script>
