<template>
    <div class="mb-3">
        <div class="row justify-content-center">
            <div class="circular shadow">
                <img :src="imageUrl" />
            </div>
        </div>
        <div class="row mt-2 border-top border-bottom">
            <div class="col-4 border-right text-center">
                <router-link class="text-dark" :to="{name: 'auth.posts' }">
                    <strong>Posts</strong>
                </router-link>
                <br />
                {{ user.posts_count }}
            </div>
            <div class="col-4 border-right text-center">
                <router-link class="text-dark" :to="{name: 'auth.followings'}">
                    <strong>Following</strong>
                </router-link>
                <br />
                {{ user.followings_count }}
            </div>
            <div class="col-4 text-center">
                <router-link class="text-dark" :to="{name: 'auth.followers'}">
                    <strong>Followers</strong>
                </router-link>
                <br />
                {{ user.followers_count }}
            </div>
        </div>
    </div>
</template>

<style scoped>
.circular {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    position: relative;
    overflow: hidden;
}
.circular img {
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    max-width: 180px;
    max-height: 180px;
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}
input[type="file"] {
    display: none;
}
.custom-file-upload {
    display: inline-block;
    cursor: pointer;
    margin-right: 2px;
}
a {
    color: black;
    margin-left: 2px;
}
</style>

<script>
export default {
    created() {
        this.retrieveCurrentUser();
    },
    methods: {
        retrieveCurrentUser() {
            this.$store.dispatch("retrieveCurrentUser");
            this.changed = false;
        }
    },
    computed: {
        imageUrl() {
            if (this.changed) {
                return this.user.profile_image;
            } else {
                if (this.user.profile_image) {
                    return `http://127.0.0.1:8000/uploads/profiles/${this.user.profile_image}`;
                } else {
                    return `https://png.pngtree.com/svg/20170602/user_circle_1048392.png`;
                }
            }
        },
        user() {
            return this.$store.getters.getCurrentUser;
        }
    }
};
</script>