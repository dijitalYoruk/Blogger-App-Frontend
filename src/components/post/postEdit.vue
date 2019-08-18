<template>
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card shadow mx-2">
                <div class="card-body">
                    <h5 class="card-title">Edit Post</h5>
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
                    <div v-if="new_post_images.length > 0" class="form-group">
                        <h5>New Post Images</h5>
                        <hr />
                        <div class="row">
                            <div
                                v-for="(post, index) in new_post_images"
                                :key="index"
                                @click="deleteNewImage(index)"
                                class="img-div col-md-2"
                            >
                                <img
                                    class="img-fluid img-thumbnail post-image"
                                    :src="post.imageURL"
                                    alt
                                />
                            </div>
                        </div>
                        <hr />
                    </div>

                    <div class="form-group" v-if="post_images.length > 0">
                        <h5>Post Images</h5>
                        <hr />
                        <div class="row">
                            <div
                                v-for="(post_image, index) in post_images"
                                :key="index"
                                class="col-md-2 img-div"
                                @click="deletePostImage(post_image.id, index)"
                            >
                                <img
                                    class="img-fluid post-image img-thumbnail"
                                    :src="getPostImageUrl(post_image.image_name)"
                                />
                            </div>
                        </div>
                        <hr />
                    </div>

                    <button type="button"
                        @click="updatePost()" 
                         class="btn btn-outline-dark">
                         Update
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
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
            id: 0,
            title: "",
            description: "",
            content: "",
            post_images: [],
            new_post_images: []
        };
    },
    created() {
        this.retrievePost();
    },
    methods: {
        retrievePost() {
            const id = this.$route.params.id;
            this.$store
                .dispatch("retrievePost", id)
                .then(response => {
                    this.id = response.id;
                    this.title = response.title;
                    this.description = response.description;
                    this.content = response.content;
                    this.post_images = response.post_images;
                })
                .catch(error => {
                    console.log(error);
                    this.$toastr.e(error);
                });
        },
        updatePost() {
            const formData = new FormData();
            formData.append("id", this.id);
            formData.append("title", this.title);
            formData.append("description", this.description);
            formData.append("content", this.content);
            for (let index = 0; index < this.new_post_images.length; index++) {
                formData.append(
                    `post_images[${index}]`,
                    this.new_post_images[index]
                );
            }

            this.$store
                .dispatch("updatePost", {
                    formData: formData,
                    post_id: this.id
                })
                .then(response => {
                    this.$toastr.s("Post succesfully updated.");
                    this.$router.go(-1);
                })
                .catch(error => {
                    this.$toastr.e(error);
                });
        },
        deleteNewImage(newImageIndex) {
            this.new_post_images.splice(newImageIndex, 1);
        },
        getPostImageUrl(post_image) {
            return `http://127.0.0.1:8000/uploads/posts/${post_image}`;
        },
        deletePostImage(postImageId, postImageIndex) {
            this.$store
                .dispatch("deletePostImage", postImageId)
                .then(response => {
                    this.$toastr.s("Post Image succesfully deleted.");
                    this.post_images.splice(postImageIndex, 1);
                })
                .catch(error => {
                    this.$toastr.e(error);
                });
        },
        showPostImages() {
            this.new_post_images = [];
            const images = this.$refs.file.files;
            for (let index = 0; index < images.length; index++) {
                const imageURL = URL.createObjectURL(images[index]);
                images[index].imageURL = imageURL;
                this.new_post_images.push(images[index]);
            }
        }
    }
};
</script>