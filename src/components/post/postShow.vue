<template>
    <div class="row mt-5">
        <div class="col-12">
            <div class="card shadow mx-2 mb-2">
                <div class="row my-2">
                    <div class="col-2 border-right">
                        <div class="row justify-content-center">
                            <div class="circular">
                                <img
                                    style="width:80px;height:80px"
                                    :src="getProfileImageUrl(post.owner.profile_image)"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="col-10">
                        <div class="row border-bottom">
                            <div class="col-auto">
                                <h4>{{ post.title }}</h4>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 border-bottom">
                                <strong>Description:</strong>
                                {{ post.description }}
                            </div>

                            <post-carousel
                                :post_images="post.post_images"
                                :post_images_count="post.post_images_count"
                                :id="0"
                            ></post-carousel>
                            <div class="col-12">{{ post.content }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PostCarousel from "../shared/postCarousel";

export default {
    data() {
        return {
            post: null
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
                    this.post = response;
                })
                .catch(error => {
                    this.$toastr.e(error);
                });
        },
        updatePost() {
            const formData = new FormData();
            formData.append("id", this.post.id);
            formData.append("title", this.post.title);
            formData.append("description", this.post.description);
            formData.append("content", this.post.content);
            for (
                let index = 0;
                index < this.post.new_post_images.length;
                index++
            ) {
                formData.append(
                    `post_images[${index}]`,
                    this.post.new_post_images[index]
                );
            }

            this.$store
                .dispatch("updatePost", {
                    formData: formData,
                    post_id: this.post.id
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
                    console.log(error);
                    this.$toastr.e(error);
                });
        },
        getProfileImageUrl(profile_image) {
            if (profile_image) {
                return `http://127.0.0.1:8000/uploads/profiles/${profile_image}`;
            } else {
                return `https://png.pngtree.com/svg/20170602/user_circle_1048392.png`;
            }
        }
    },
    components: {
        postCarousel: PostCarousel
    }
};
</script>

<style scoped>
.circular {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    position: relative;
    overflow: hidden;
}
.circular img {
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    max-width: 180px;
    max-height: 180px;
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}

hr.style13 {
    height: 10px;
    border: 0;
    box-shadow: 0 10px 10px -10px #8c8b8b inset;
}
</style>