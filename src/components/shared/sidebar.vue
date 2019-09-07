<template>
    <div class="card shadow mb-3">
        <div class="card-body">
            <profile-sidebar v-if="showProfile"></profile-sidebar>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    <router-link
                        active-class="active"
                        class="text-dark"
                        exact
                        :to="{name: 'auth.posts'}"
                    >Profile</router-link>
                </li>
                <li class="list-group-item">
                    <router-link
                        active-class="active"
                        class="text-dark"
                        exact
                        :to="{name: 'post.index'}"
                    >Posts</router-link>
                </li>
                <li class="list-group-item">
                    <router-link
                        active-class="active"
                        class="text-dark"
                        exact
                        :to="{name: 'user.index'}"
                    >Users</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import ProfileSidebar from "../auth/profileSidebar";

export default {
    components: {
        profileSidebar: ProfileSidebar
    },
    computed: {
        showProfile() {
            return this.$route.path === "/auth/profile/posts" 
                || this.$route.path === "/auth/profile/followings" 
                || this.$route.path === "/auth/profile/followers"
                ? false
                : true;
        }
    }
};
</script>