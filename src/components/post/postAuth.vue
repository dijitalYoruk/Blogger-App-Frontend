<template>
    <div v-show="showComponent">
        <component-search class="mt-5" @search="searchPosts"></component-search>
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
</template>

<script>
import Pagination from "../shared/pagination";
import PostEdit from "./postEdit";
import Search from "../shared/search";
import PostSingle from "./postSingle"


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
            this.$store.dispatch("retrieveAuthPosts", {
                page,
                search: this.search
            });
        },
        clearPosts() {
            this.$store.commit("clearAuthPosts");
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
        showComponent() {
            return this.posts.length > 0;
        }
    },
    components: {
        componentPagination: Pagination,
        componentPostEdit: PostEdit,
        componentPost: PostSingle,
        componentSearch: Search
    }
};
</script>