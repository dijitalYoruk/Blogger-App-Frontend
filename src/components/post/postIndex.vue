<template>
    <div v-if="showComponent">
        <component-search @search="searchPosts"></component-search>
        <div class="row">
            <div v-for="(post, index) in posts" :key="index" class="col-12">
                <div class="card shadow mx-2 mb-2">
                    <div class="col-md-12">
                        <div class="row my-2">
                            <div class="col-2 border-right">
                                <div class="row justify-content-center">
                                    <div class="circular">
                                        <img
                                            style="width:80px;height:80px"
                                            :src="getProfileImageUrl(post.owner.profile_image)"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="col-10">
                                <div class="row border-bottom">
                                    <div class="col-auto">
                                        <h4>{{ post.title }}</h4>
                                    </div>
                                    <div
                                        v-if="doesPostBelongsToCurrentUser(post.owner.id)"
                                        class="col-auto ml-auto"
                                    >
                                        <button
                                            @click="deletePost(post.id, index)"
                                            class="btn btn-sm btn-dark"
                                        >
                                            <i class="fas fa-trash-alt"></i>
                                        </button>
                                        <router-link
                                            :to="{ name: 'post.edit', params: { id: post.id }}"
                                        >
                                            <button class="btn btn-sm btn-dark mx-1">
                                                <i class="fas fa-pen"></i>
                                            </button>
                                        </router-link>
                                    </div>
                                    <div v-else class="col-auto ml-auto">
                                        <button class="btn btn-sm btn-dark mx-1">
                                            <router-link
                                                class="text-light"
                                                :to="{name: 'post.show', params: { id: post.id }}"
                                            >
                                                <i class="fas fa-eye"></i>
                                            </router-link>
                                        </button>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 border-bottom">
                                        <strong>Description:</strong>
                                        {{ post.description }}
                                    </div>
                                    <post-carousel
                                        :post_images="post.post_images"
                                        :post_images_count="post.post_images_count"
                                        :id="index"
                                    ></post-carousel>
                                    <div class="col-12">{{ post.content }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-12">
                <component-pagination
                    v-if="totalPages > 1"
                    @getPaginatedData="retrievePosts"
                    :totalPages="totalPages"
                    :currentPage="currentPage"
                ></component-pagination>
            </div>
        </div>
    </div>
    <div v-else class="row">
        <div class="col-12">
            <div class="card shadow mx-2 mb-2 p-4">
                <strong>No Posts are available.</strong>
            </div>
        </div>
    </div>
</template>

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

<script>
import Pagination from "../shared/pagination";
import PostEdit from "./postEdit";
import PostCarousel from "../shared/postCarousel";
import Search from "../shared/postSearch";

export default {
    data() {
        return {
            editPost: {},
            search: ""
        };
    },
    created() {
        this.retrievePosts(1, this.search);
    },
    destroyed() {
        this.clearPosts();
    },
    methods: {
        retrievePosts(page) {
            this.$store.dispatch("retrieveAllPosts", {
                page,
                search: this.search
            });
        },
        clearPosts() {
            this.$store.commit("clearAllPosts");
        },
        deletePost(post_id, post_index) {
            this.$store.dispatch("deletePost", { post_id, post_index });
        },
        getPostImageUrl(post_image) {
            return `http://127.0.0.1:8000/uploads/posts/${post_image}`;
        },
        getProfileImageUrl(profile_image) {
            if (profile_image) {
                return `http://127.0.0.1:8000/uploads/profiles/${profile_image}`;
            } else {
                return `https://png.pngtree.com/svg/20170602/user_circle_1048392.png`;
            }
        },
        doesPostBelongsToCurrentUser(postUserId) {
            return postUserId == this.currentUser.id;
        },
        searchPosts(search) {
            this.search = search;
            this.retrievePosts(1, this.search);
        }
    },
    computed: {
        posts() {
            return this.$store.getters.getAllPosts;
        },
        currentPage() {
            return this.$store.getters.getAllPostsCurrentPage;
        },
        totalPages() {
            return this.$store.getters.getAllPostsTotalPage;
        },
        currentUser() {
            return this.$store.getters.getCurrentUser;
        },
        showComponent() {
            return this.posts.length > 0;
        }
    },
    components: {
        componentPagination: Pagination,
        componentPostEdit: PostEdit,
        postCarousel: PostCarousel,
        componentSearch: Search
    }
};
</script>