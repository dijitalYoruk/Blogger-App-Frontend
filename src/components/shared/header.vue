<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">
            <img style="color:white" src="@/assets/icon.png" alt="" srcset="">
        </a>

        <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto">
                <li v-if="!isUserSignedIn" class="nav-item">
                    <router-link
                        class="nav-link"
                        active-class="active"
                        exact
                        :to="{name: 'auth.signIn'}"
                    >Sign In</router-link>
                </li>

                <li v-if="!isUserSignedIn" class="nav-item">
                    <router-link
                        class="nav-link"
                        active-class="active"
                        exact
                        :to="{name: 'auth.signUp'}"
                    >Sign Up</router-link>
                </li>

                <li v-if="isUserSignedIn" class="nav-item">
                    <a @click="signOut()" class="nav-link">Sign Out</a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<style>
</style>

<script>
export default {
    methods: {
        signOut() {
            this.$store
                .dispatch("signOut")
                .then(result => {
                    this.$router.push({ name: "auth.signIn" });
                    this.$toastr.s("Succesfully signed out.");
                })
                .catch(error => {
                    this.$toastr.e(error);
                });
        }
    },
    computed: {
        isUserSignedIn() {
            return this.$store.getters.isUserSignedIn;
        }
    }
};
</script>
