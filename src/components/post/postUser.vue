<template>
    <div class="mt-5" v-if="showComponent">
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
                                                        :class="{'active': index == 0}"
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

<script>
import Pagination from "../shared/pagination";
import Search from "../shared/search";

export default {
    data() {
        return {
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
            const id = this.$route.params.id;
            this.$store.dispatch("retrieveUserPosts", { page, id, search: this.search });
        },
        clearPosts() {
            this.$store.commit("clearAllPosts");
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
        searchPosts(search) {
            this.search = search;
            this.retrievePosts(1);
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
        showComponent() {
            return this.posts.length > 0;
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