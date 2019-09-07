<template>
    <div v-if="showComponent">
        <component-search @search="searchPosts"></component-search>
        <div class="row">
            <div v-for="(post, index) in posts" :key="index" class="col-12">
                <component-post :post="post"></component-post>
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

<script>
import Pagination from "../shared/pagination";
import PostSingle from "./postSingle"
import Search from "../shared/postSearch";

export default {
    data() {
        return {
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
        componentPost: PostSingle,
        componentSearch: Search
    }
};
</script>