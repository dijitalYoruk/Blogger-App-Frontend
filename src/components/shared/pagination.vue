<template>
    <div class="row justify-content-center mt-3">
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li :class="{disabled: currentPage == 1}" class="page-item">
                    <a class="page-link" @click="getPaginatedData(currentPage-1)">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li
                    v-for="page in totalPages"
                    :key="page"
                    :class="{active: page == currentPage}"
                    class="page-item"
                >
                    <a class="page-link" @click="getPaginatedData(page)">{{ page }}</a>
                </li>
                <li :class="{disabled: currentPage == totalPages}" class="page-item">
                    <a class="page-link" @click="getPaginatedData(currentPage+1)">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<style scope>
.page-item.active .page-link {
    z-index: 1;
    color: white;
    background-color: grey;
    border-color: darkgrey;
}
</style>


<script>
export default {
    props: ['currentPage', 'totalPages'],
    methods: {
        getPaginatedData(page) {
            this.$emit('getPaginatedData', page);
        }
    }
}
</script>