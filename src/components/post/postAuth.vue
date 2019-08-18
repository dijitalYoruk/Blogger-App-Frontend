<template>
    <div v-show="showComponent">
        <component-search class="mt-5" @search="searchPosts"></component-search>
        <div class="row">
            <div v-for="(post, index) in posts" :key="index" class="col-12">
                <div class="card shadow mx-2 mt-2">
                    <div class="col-md-12">
                        <div class="row my-2">
                            <div class="col-2 border-right">
                                <div class="row justify-content-center">
                                    <div class="circular">
                                        <img style="width:80px;height:80px" :src="profile_image" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-10">
                                <div class="row border-bottom">
                                    <div class="col-auto">
                                        <h4>{{ post.title }}</h4>
                                    </div>
                                    <div class="col-auto ml-auto">
                                        <button
                                            @click="deletePost(post.id, index)"
                                            class="btn btn-sm btn-danger mx-1"
                                        >
                                            <i class="fas fa-trash-alt"></i>
                                        </button>
                                        <router-link
                                            :to="{ name: 'post.edit', params: { id: post.id }}"
                                        >
                                            <button class="btn btn-sm btn-info">
                                                <i class="fas fa-pen"></i>
                                            </button>
                                        </router-link>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 border-bottom">
                                        <strong>Description:</strong>
                                        {{ post.description }}
                                    </div>
                                    <div v-if="post.post_images_count" class="col-12 border-bottom">
                                        <div class="offset-1 col-10 offset-1">
                                            <div
                                                id="postSlider"
                                                class="carousel slide my-3"
                                                data-ride="carousel"
                                            >
                                                <ol class="carousel-indicators">
                                                    <li
                                                        v-for="(post_image, index) in post.post_images"
                                                        :key="index"
                                                        data-target="#postSlider"
                                                        :data-slide-to="index"
                                                        :class="{ 'active': index == 0}"
                                                    ></li>
                                                </ol>
                                                <div class="carousel-inner">
                                                    <div
                                                        v-for="(post_image, index) in post.post_images"
                                                        :key="index"
                                                        class="carousel-item"
                                                        :class="{ 'active': index == 0}"
                                                    >
                                                        <img
                                                            style="height:300px"
                                                            class="d-block rounded w-100"
                                                            :src="getPostImageUrl(post_image.image_name)"
                                                        />
                                                    </div>
                                                </div>
                                                <a
                                                    class="carousel-control-prev"
                                                    href="#postSlider"
                                                    role="button"
                                                    data-slide="prev"
                                                >
                                                    <span
                                                        class="carousel-control-prev-icon"
                                                        aria-hidden="true"
                                                    ></span>
                                                    <span class="sr-only">Previous</span>
                                                </a>
                                                <a
                                                    class="carousel-control-next"
                                                    href="#postSlider"
                                                    role="button"
                                                    data-slide="next"
                                                >
                                                    <span
                                                        class="carousel-control-next-icon"
                                                        aria-hidden="true"
                                                    ></span>
                                                    <span class="sr-only">Next</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
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
import Search from "../shared/search";

export default {
    data() {
        return {
            editPost: {},
            search: ""
        };
    },
    created() {
        this.retrievePosts(1);
    },
    destroyed() {
        this.clearPosts();
    },
    methods: {
        retrievePosts(page) {
            this.$store.dispatch("retrieveAuthPosts", {
                page,
                search: this.search
            });
        },
        clearPosts() {
            this.$store.commit("clearAuthPosts");
        },
        deletePost(post_id, post_index) {
            this.$store.dispatch("deleteAuthPost", {
                post_id,
                post_index
            });
        },
        getPostImageUrl(post_image) {
            return `http://127.0.0.1:8000/uploads/posts/${post_image}`;
        },
        getProfileImageUrl() {
            return `http://127.0.0.1:8000/uploads/profiles/${this.profile_image}`;
        },
        searchPosts(search) {
            this.search = search;
            this.retrievePosts(1);
        }
    },
    computed: {
        posts() {
            return this.$store.getters.getAuthPosts;
        },
        currentPage() {
            return this.$store.getters.getAuthPostsCurrentPage;
        },
        totalPages() {
            return this.$store.getters.getAuthPostsTotalPage;
        },
        profile_image() {
            const url = this.$store.getters.getCurrentUser.profile_image;
            if (url) {
                const bool = url.startsWith("data:image");
                if (bool) {
                    return url;
                } else {
                    return `http://127.0.0.1:8000/uploads/profiles/${this.$store.getters.getCurrentUser.profile_image}`;
                }
            } else {
                return `https://png.pngtree.com/svg/20170602/user_circle_1048392.png`;
            }
        },
        showComponent() {
            return this.posts.length > 0;
        }
    },
    components: {
        componentPagination: Pagination,
        componentPostEdit: PostEdit,
        componentSearch: Search
    }
};
</script>