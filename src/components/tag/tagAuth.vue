<template>
    <div>
        <modal-tag-edit :editTag="editTag"></modal-tag-edit>
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card shadow mx-2 mt-5">
                    <div class="card-body">
                        <h5 class="text-center">Your Tags</h5>
                        <ul class="list-group list-group-flush">
                            <li v-for="(tag, index) in tags" :key="index" class="list-group-item">
                                <div class="row">
                                    <div class="col-auto mr-auto">{{ tag.name }}</div>
                                    <div class="col-auto ml-auto">
                                        <button
                                            @click="deleteTag(tag.id, index)"
                                            class="btn btn-sm btn-danger mx-1"
                                        >
                                            <i class="fas fa-trash-alt"></i>
                                        </button>
                                        <button
                                            @click="showEditTagModal(tag, index)"
                                            class="btn btn-sm btn-info mx-1"
                                        >
                                            <i class="fas fa-pencil-alt"></i>
                                        </button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <component-pagination
                            v-if="totalPages > 1"
                            @getPaginatedData="retrieveTags"
                            :totalPages="totalPages"
                            :currentPage="currentPage"
                        ></component-pagination>
                    </div>
                </div>
            </div>
            <div class="col-md-12">
                <div class="card shadow mt-3 mx-2">
                    <div class="card-body">
                        <div class="input-group">
                            <input
                                type="text"
                                class="form-control"
                                v-model="tagName"
                                placeholder="Tag name"
                            />
                            <div class="input-group-append">
                                <button
                                    @click="createTag()"
                                    class="btn btn-outline-dark"
                                    type="button"
                                >Create</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Pagination from "../shared/pagination";
import ModalEditTag from "./modals/tagEditModal";

export default {
    data() {
        return {
            tagName: "",
            editTag: {}
        };
    },
    created() {
        this.retrieveTags(1);
    },
    destroyed() {
        this.clearTags();
    },
    methods: {
        retrieveTags(page) {
            this.$store.dispatch("retrieveAuthTags", page);
        },
        clearTags() {
            this.$store.commit("clearAuthTags");
        },
        createTag() {
            this.$store
                .dispatch("createTag", this.tagName)
                .then(result => {
                    this.tagName = "";
                    this.$toastr.s("Tag succesfully created.");
                })
                .catch(error => {
                    this.$toastr.e(error.message);
                });
        },
        deleteTag(tag_id, tag_index) {
            this.$store.dispatch("deleteAuthTag", {
                tag_id,
                tag_index
            });
        },
        showEditTagModal(tag, tag_index) {
            this.editTag = JSON.parse(JSON.stringify(tag));
            this.editTag.index = tag_index;
            $("#tagEditModal").modal("show");
        }
    },
    computed: {
        tags() {
            return this.$store.getters.getAuthTags;
        },
        currentPage() {
            return this.$store.getters.getAuthTagsCurrentPage;
        },
        totalPages() {
            return this.$store.getters.getAuthTagsTotalPage;
        }
    },
    components: {
        componentPagination: Pagination,
        modalTagEdit: ModalEditTag
    }
};
</script>