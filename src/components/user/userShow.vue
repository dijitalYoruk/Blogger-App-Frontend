<template>
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card shadow mt-5 mx-2">
                <div class="card-body">
                    <form v-if="user">
                        <div class="row justify-content-center">
                            <div class="circular shadow">
                                <img :src="getProfileImageUrl(user.profile_image)" />
                            </div>
                        </div>
                        <div class="row mx-3 mt-2 border-top border-bottom">
                            <div class="col-4 border-right text-center">
                                <router-link 
                                    class="text-dark" 
                                    :to="{name: 'user.posts', params: { id: user.id }}">
                                        <strong>Posts</strong>
                                </router-link>
                                <br>
                                {{ user.posts_count }}
                            </div>
                            <div class="col-4 border-right text-center">
                                <router-link 
                                    class="text-dark" 
                                    :to="{name: 'user.followings', params: { id: user.id }}">
                                        <strong>Following</strong>
                                </router-link>
                                <br>
                                {{ user.followings_count }}
                            </div>
                            <div class="col-4 text-center">
                                <router-link 
                                    class="text-dark" 
                                    :to="{name: 'user.followers', params: { id: user.id }}">
                                        <strong>Followers</strong>
                                </router-link>
                                <br>
                                {{ user.followers_count }}
                            </div>
                        </div>
                        <div class="row mx-3">
                            <div class="col-12 border-bottom">
                                <strong>Name:</strong> {{ user.name }}
                            </div>
                        </div>
                        <div class="row mx-3">
                            <div class="col-12 border-bottom">
                                <strong>Email:</strong> {{ user.email }}
                            </div>
                        </div>
                        <div class="row mx-3">
                            <div class="col-12">
                                <strong>About:</strong> {{ user.about }}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <post-user></post-user>
        </div>
    </div>
</template>

<script>
import PostUser   from "../post/postUser"

export default {
    data() {
        return {
            user: null
        }
    },
    created() {
        const id = this.$route.params.id;
        this.retrieveUser(id);
    },
    methods: {
        retrieveUser(id) {
            this.$store.dispatch("retrieveUser", id)
                .then(response => {
                    this.user = response;
                })
                .catch(error => {
                    this.$toastr.e(error);
                });
        },
        getProfileImageUrl(profile_image) {
            return `http://127.0.0.1:8000/uploads/profiles/${profile_image}`;
        }
    },
    components: {
        postUser: PostUser
    }
};
</script>

<style scoped>
.circular {
    width: 150px;
    height: 150px;
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

hr.style13 {
    height: 10px;
    border: 0;
    box-shadow: 0 10px 10px -10px #8c8b8b inset;
}
</style>