<template>
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card shadow mx-2 mt-5">
                <div class="card-body">
                    <ul class="list-group list-group-flush">
                        <li v-for="(tag, index) in tags"
                            :key="index"
                            class="list-group-item">
                                {{ tag.name }}
                        </li>
                    </ul>
                    <component-pagination 
                        v-if="totalPages > 1"
                        @getPaginatedData='retrieveTags' 
                        :totalPages='totalPages' 
                        :currentPage='currentPage'>
                    </component-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Pagination from '../shared/pagination'

export default {
    created() {
        this.retrieveTags(1);
    },
    destroyed() {
        this.clearTags();
    },
    methods: {
        retrieveTags(page) {
            this.$store.dispatch("retrieveAllTags", page);
        },
        clearTags() {
            this.$store.commit('clearAllTags');
        }
    },
    computed: {
        tags() {
            return this.$store.getters.getAllTags;
        },
        currentPage() {
            return this.$store.getters.getAllTagsCurrentPage;
        },
        totalPages() {
            return this.$store.getters.getAllTagsTotalPage;
        }
    },
    components: {
        componentPagination: Pagination
    }
};
</script>