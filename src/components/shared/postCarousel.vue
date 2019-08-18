<template>
    <div v-if="post_images_count" class="col-12 border-bottom">
        <div class="offset-1 col-10 offset-1">
            <div :id="postSliderId" class="carousel slide my-3" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li
                        v-for="(post_image, index) in post_images"
                        :key="index"
                        :data-target="postSliderHref"
                        :data-slide-to="index"
                        :class="{'active': index == 0}"
                    ></li>
                </ol>
                <div class="carousel-inner">
                    <div
                        v-for="(post_image, index) in post_images"
                        :key="index"
                        class="carousel-item"
                        :class="{ 'active': index == 0}"
                    >
                        <img
                            style="height:300px"
                            class="d-block rounded w-100"
                            :src="getPostImageUrl(post_image.image_name)"
                        />
                    </div>
                </div>
                <a class="carousel-control-prev" :href="postSliderHref" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" :href="postSliderHref" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
           
        </div>
    </div>
</template>

<script>
export default {
    props: ["post_images_count", "post_images", "id"],
    methods: {
        getPostImageUrl(post_image) {
            return `http://127.0.0.1:8000/uploads/posts/${post_image}`;
        },
    },
    computed: {
        postSliderId() {
            return `postSlider${this.id}`
        },
        postSliderHref() {
            return `#postSlider${this.id}`
        }
    }
}
</script>