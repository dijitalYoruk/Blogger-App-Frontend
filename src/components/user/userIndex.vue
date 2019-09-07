<template>
    <div v-if="showComponent">
        <component-search @search="searchUsers"></component-search>
        <div class="row">
            <div v-for="(user, index) in users" :key="index" class="col-12">
                <component-user :user="user" :followers="followers"></component-user>
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
import UserSingle from "./userSingle"

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
        componentSearch: Search,
        componentUser: UserSingle
    }
};
</script>

