<template>
    <div class="row">
        <div class="col-12">
            <div class="card shadow mb-2 p-3">
                <div class="input-group">
                    <input
                        type="text"
                        class="form-control"
                        v-model="data"
                        placeholder="Search..."
                        aria-describedby="button-addon2"
                    />
                    <div class="input-group-append">
                        <button
                            class="btn btn-outline-dark"
                            type="button"
                            @click="search"
                            id="button-addon2"
                        >
                            <i class="fas fa-search"></i>
                        </button>
                    </div>
                    <div class="input-group-append">
                        <router-link 
                            :to="{name: 'post.create'}"
                            class="btn btn-outline-dark">
                                <i class="fas fa-plus-circle"></i>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            data: ""
        };
    },
    methods: {
        search() {
            return this.$emit("search", this.data);
        }
    }
};
</script>