<template>
    <div class="card shadow mb-2">
        <div class="col-md-12">
            <div class="row my-2">
                <div class="col-lg-1 col-2 border-right">
                    <div class="row justify-content-center">
                        <div class="circular">
                            <img
                                style="width:50px;height:50px"
                                :src="getProfileImageUrl(user.profile_image)"
                            />
                        </div>
                    </div>
                </div>
                <div class="col-lg-11 col-10">
                    <div class="row border-bottom">
                        <div class="pr-0 pl-1 col-auto">
                            <h4>{{ user.name }}</h4>
                        </div>
                        <div class="col-auto ml-auto">
                            <button
                                v-if="!isUserFollowed(user.id)"
                                @click="followUser(user.id)"
                                class="btn btn-sm btn-outline-dark"
                            >Follow</button>
                            <button
                                v-else
                                @click="unfollowUser(user.id, index)"
                                class="btn btn-sm btn-dark"
                            >Unfollow</button>
                            <button class="btn btn-sm btn-dark mx-1">
                                <router-link
                                    class="text-light"
                                    :to="{name: 'user.posts', params: { id: user.id }}"
                                >
                                    <i class="fas fa-eye"></i>
                                </router-link>
                            </button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="pl-1 col-12 border-bottom">
                            <strong>Email:</strong>
                            {{ user.email }}
                        </div>
                        <div class="pl-1 col-12">
                            <strong>About:</strong>
                            {{ user.about }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['user', 'followers'],
    methods: {
        getProfileImageUrl(profile_image) {
            if (profile_image) {
                return `http://127.0.0.1:8000/uploads/profiles/${profile_image}`;
            } else {
                return `https://png.pngtree.com/svg/20170602/user_circle_1048392.png`;
            }
        },
        followUser(user_id) {
            this.$store
                .dispatch("followUser", user_id)
                .then(response => {
                    this.$store.commit("addFollowing", { id: user_id });
                })
                .catch(error => {
                    this.$toastr.e(error);
                });
        },
        unfollowUser(user_id, index) {
            this.$store
                .dispatch("unfollowUser", user_id)
                .then(response => {
                    this.$store.commit("deleteFollowing", user_id);
                })
                .catch(error => {
                    this.$toastr.e(error);
                });
        },
        isUserFollowed(id) {
            return this.followers.some(obj => obj.id == id);
        }
    }
};
</script>

<style scoped>
.circular {
    width: 50px;
    height: 50px;
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
</style>