<template>
    <div v-if="showComponent">
        <component-search @search="searchUsers"></component-search>
        <div class="row">
            <div v-for="(user, index) in users" :key="index" class="col-12">
                <div class="card shadow mx-2 mb-2">
                    <div class="col-md-12">
                        <div class="row my-2">
                            <div class="col-2 border-right">
                                <div class="row justify-content-center">
                                    <div class="circular">
                                        <img
                                            style="width:80px;height:80px"
                                            :src="getProfileImageUrl(user.profile_image)"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="col-10">
                                <div class="row border-bottom">
                                    <div class="col-auto">
                                        <h4>{{ user.name }}</h4>
                                    </div>
                                    <div class="col-auto ml-auto">
                                        <button
                                            v-if="!isUserFollowed(user.id)"
                                            @click="followUser(user.id)"
                                            class="btn btn-sm btn-outline-info"
                                        >Follow</button>
                                        <button
                                            v-else
                                            @click="unfollowUser(user.id, index)"
                                            class="btn btn-sm btn-info"
                                        >Unfollow</button>
                                        <button class="btn btn-sm btn-info mx-1">
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
                                    <div class="col-12 border-bottom">
                                        <strong>Email:</strong>
                                        {{ user.email }}
                                    </div>
                                    <div class="col-12">
                                        <strong>About:</strong>
                                        {{ user.about }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-12">
                <component-pagination
                    v-if="totalPages > 1"
                    @getPaginatedData="retrieveUsers"
                    :totalPages="totalPages"
                    :currentPage="currentPage"
                ></component-pagination>
            </div>
        </div>
    </div>
    <div v-else class="row">
    <div class="col-12">
        <div class="card shadow mx-2 mb-2 p-4">
            <strong>
                No users are available.
            </strong>
        </div>
    </div>
</div>
</template>

<script>
import Pagination from "../shared/pagination";
import Search     from "../shared/search";

export default {
    data() {
        return {
            search: ""
        };
    },
    created() {
        this.retrieveUsers(1);
    },
    destroyed() {
        this.clearUsers();
    },
    methods: {
        retrieveUsers(page) {
            this.$store.dispatch("retrieveAllUsers", {page, search: this.search});
        },
        clearUsers() {
            this.$store.commit("clearAllUsers");
        },
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
        },
        searchUsers(search) {
            this.search = search;
            this.retrieveUsers(1);
        }
    },
    computed: {
        users() {
            return this.$store.getters.getAllUsers;
        },
        followers() {
            return this.$store.getters.getAllFollowerIds;
        },
        currentPage() {
            return this.$store.getters.getAllUsersCurrentPage;
        },
        totalPages() {
            return this.$store.getters.getAllUsersTotalPage;
        },
        showComponent() {
            return this.users.length > 0;
        }
    },
    components: {
        componentPagination: Pagination,
        componentSearch: Search
    }
};
</script>

<style scoped>
.circular {
    width: 80px;
    height: 80px;
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