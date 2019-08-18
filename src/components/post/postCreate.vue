<template>
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card shadow mx-2">
                <div class="card-body">
                    <h5 class="card-title">Create Post</h5>
                    <div class="form-group">
                        <label for="titleInput">Title</label>
                        <input
                            type="text"
                            class="form-control"
                            id="titleInput"
                            placeholder="Title..."
                            v-model="title"
                        />
                    </div>
                    <div class="form-group">
                        <label for="titleInput">Description</label>
                        <input
                            type="text"
                            class="form-control"
                            id="descriptionInput"
                            placeholder="Description..."
                            v-model="description"
                        />
                    </div>
                    <div class="form-group">
                        <label for="contentInput">Content</label>
                        <textarea
                            type="text"
                            class="form-control"
                            id="contentInput"
                            placeholder="Content..."
                            v-model="content"
                            rows="10"
                        ></textarea>
                    </div>
                    <div class="form-group">
                        <div class="image-upload">
                            <label for="file-input">
                                <img
                                    src="http://simpleicon.com/wp-content/uploads/cloud-upload-1.png"
                                />
                                <strong>Upload Images</strong>
                            </label>

                            <input
                                type="file"
                                ref="file"
                                id="file-input"
                                class="form-control-file"
                                multiple
                                @change="showPostImages"
                            />
                        </div>
                    </div>
                    <div v-if="showImages" class="form-group">
                        <hr />
                        <div class="row">
                            <div
                                v-for="(post, index) in post_images"
                                :key="index"
                                @click="deleteImage(index)"
                                class="img-div col-md-2"
                            >
                                <img class="img-fluid post-image" :src="post.imageURL" alt />
                            </div>
                        </div>
                        <hr />
                    </div>

                    <button @click="createPost()" type="button" class="btn btn-outline-dark">Create</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.post-image {
    height: 100px;
    width: 100%;
}
.img-div {
    position: relative;
    display: inline-block;
}
.img-div:hover:after {
    content: "";
    position: absolute;
    left: 0px;
    top: 0px;
    bottom: 0px;
    width: 100%;
    background: url("https://cdn3.iconfinder.com/data/icons/web-ui-3/128/Close-2-512.png")
        center no-repeat;
    background-size: 50px;
}

.img-div:hover img {
    opacity: 0.4;
}

.image-upload > input {
    display: none;
}

.image-upload img {
    width: 50px;
    cursor: pointer;
}
</style>

<script>
export default {
    data() {
        return {
            title: "",
            description: "",
            content: "",
            post_images: []
        };
    },
    methods: {
        createPost() {
            const formData = new FormData();
            formData.append("title", this.title);
            formData.append("description", this.description);
            formData.append("content", this.content);

            for (let index = 0; index < this.post_images.length; index++) {
                formData.append(
                    `post_images[${index}]`,
                    this.post_images[index]
                );
            }

            this.$store
                .dispatch("createPost", formData)
                .then(response => {
                    this.$router.push({ name: "post.index" });
                    this.$toastr.s("Post succesfully created.");
                })
                .catch(error => {
                    this.$toastr.e(error);
                });
        },
        showPostImages() {
            this.post_images = [];
            const images = this.$refs.file.files;
            for (let index = 0; index < images.length; index++) {
                const imageURL = URL.createObjectURL(images[index]);
                images[index].imageURL = imageURL;
                this.post_images.push(images[index]);
            }
        },
        deleteImage(index) {
            this.post_images.splice(index, 1);
        }
    },
    computed: {
        showImages() {
            return this.post_images.length > 0;
        }
    }
};
</script>