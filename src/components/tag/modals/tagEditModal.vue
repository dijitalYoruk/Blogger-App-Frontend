<template>
    <div class="modal fade" tabindex="-1" role="dialog" id="tagEditModal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Update Tag</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="input-group">
                        <input 
                            type="text" 
                            class="form-control" 
                            v-model="editTag.name" 
                            placeholder="Tag name"/>
                        <div class="input-group-append">
                            <button 
                            @click="updateTag"
                                class="btn btn-outline-dark" 
                                type="button">
                                    Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['editTag'],
    methods: {
        updateTag() {
            this.$store.dispatch('editAuthTag', this.editTag);
            $('#tagEditModal').modal('hide');
        }
    }

}
</script>