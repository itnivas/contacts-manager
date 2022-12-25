<template>
    <div>
        <v-container>
            <v-row>
                <v-col cols="12" offset-lg="4" lg="4" class="pa-0">
                    <v-card class="contact-list" tile outlined>
                        <v-card-text>
                            <v-btn text primary @click="toHome"><v-icon>mdi-chevron-left</v-icon>Back</v-btn>
                        </v-card-text>

                        <div class="text-center mb-5">
                            <v-avatar color="white" size="100" class="shadow">
                                <span class="blue--text text-h3">{{ intials }}</span>
                            </v-avatar>
                        </div>

                        <v-card-text>
                            <v-form ref="form" v-model="valid">
                                <v-text-field
                                    ref="firstName"
                                    v-model="contact.firstName"
                                    label="First Name"
                                    placeholder="Placeholder"
                                    class="custom-label"
                                    :rules="nameRules"
                                    :disabled="!editMode && !newMode"
                                ></v-text-field>

                                <v-text-field
                                    ref="lastName"
                                    v-model="contact.lastName"
                                    label="Last Name"
                                    placeholder="Last Name"
                                    class="custom-label"
                                    :rules="nameRules"
                                    :disabled="!editMode && !newMode"
                                ></v-text-field>

                                <v-text-field
                                    ref="phone"
                                    v-model="contact.phone"
                                    label="Phone Number"
                                    placeholder="Placeholder"
                                    class="custom-label"
                                    :rules="numberRules"
                                    :disabled="!editMode && !newMode"
                                ></v-text-field>

                                <v-text-field
                                    ref="email"
                                    v-model="contact.email"
                                    label="Email Address"
                                    placeholder="Placeholder"
                                    class="custom-label"
                                    :rules="emailRules"
                                    :disabled="!editMode && !newMode"
                                ></v-text-field>
                            </v-form>
                        </v-card-text>
                    </v-card>

                    <v-footer>
                        <v-col v-if="editMode || newMode" class="text-center pa-0" cols="12">
                            <v-btn fab color="primary" class="fb mr-1" bottom center :disabled="!valid" @click="save">
                                <v-icon>mdi-content-save</v-icon>
                            </v-btn>
                        </v-col>

                        <v-col v-else class="text-center pa-0" cols="12">
                            <v-btn fab color="primary" class="fb mr-1" bottom center @click="editContact">
                                <v-icon>mdi-pencil-outline</v-icon>
                            </v-btn>

                            <v-btn fab color="red" class="fb ml-1" dark bottom center @click="deleteContact">
                                <v-icon>mdi-trash-can</v-icon>
                            </v-btn>
                        </v-col>
                    </v-footer>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            valid: true,
            contacts: [],
            contact: {},
            newMode: false,
            editMode: false,
            intials: "",
            nameRules: [(v) => !!v || "This field is required", (v) => (v && v.length <= 30) || "Name must be less than 30 characters"],
            numberRules: [
                (v) => !!v || "This field is required",
                (v) => /^\d+$/.test(v) || "This field accepts only numbers",
                (v) => String(v).length == 10 || "Length must be 10",
            ],
            emailRules: [
                (v) => !!v || "This field is required",
                (v) => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || "E-mail must be valid",
            ],
        };
    },

    methods: {
        toHome: function() {
            this.$router.push("/");
        },

        save: function() {
            if (this.editMode) {
                this.updateContact();
            } else {
                this.saveContact();
            }
        },

        editContact: function() {
            this.editMode = true;
            this.$refs.firstName.focus();
        },

        deleteContact: function() {
            let index = this.contacts.findIndex((obj) => obj.id == this.contact.id);
            this.contacts.splice(index, 1);
            this.toHome();
        },

        updateContact: function() {
            this.$refs.form.validate();
            let index = this.contacts.findIndex((obj) => obj.id == this.contact.id);
            this.contacts[index] = this.contact;
            this.toHome();
        },

        saveContact: function() {
            this.$refs.form.validate();
            this.contact["id"] = this.contacts[this.contacts.length - 1].id - 1 + 2;
            this.contacts.push(this.contact);
            this.toHome();
        },
    },

    mounted: function() {
        this.contacts = this.$store.getters.getContacts;
        this.contact = this.$route.query ? this.$route.query : {};

        if (this.contact.id) {
            this.intials = this.contact.firstName.charAt(0).toUpperCase() + this.contact.lastName.charAt(0).toUpperCase();
        } else {
            this.intials = "";
            this.newMode = true;
        }
    },

    beforeDestroy: function() {
        this.$store.dispatch("setContacts", this.contacts);
    },
};
</script>

<style scoped>
.fb {
    margin-top: -36px;
}

.shadow {
    box-shadow: 0px 0px 3px 2px rgb(0 0 0 / 20%), -4px 3px 5px 1px rgb(0 0 0 / 14%), 2px 1px 10px 5px rgb(0 0 0 / 12%);
}

.custom-label >>> .theme--light.v-text-field.v-input--is-disabled .v-input__slot::before {
    border-image: none !important;
}
</style>

<style>
.custom-label .v-label {
    color: #2b81d6 !important;
    font-weight: bold;
    opacity: 1;
}

.theme--light.v-text-field.v-input--is-disabled .v-input__slot::before {
    border-image: none !important;
}
</style>
