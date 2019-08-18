<template>
    <div>
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card shadow mx-2">
                    <div class="card-body">
                        <form>
                            <div class="row justify-content-center">
                                <div class="circular shadow">
                                    <img :src="imageUrl" />
                                </div>
                            </div>

                            <div class="row justify-content-center">
                                <label for="file-upload" class="custom-file-upload">
                                    <i class="fa fa-cloud-upload"></i>
                                </label>
                                <input
                                    type="file"
                                    ref="file"
                                    id="file-upload"
                                    class="form-control-file"
                                    @change="showProfileImage"
                                />
                                <a href @click.prevent="deleteProfileImage">
                                    <i class="fas fa-trash-alt"></i>
                                </a>
                            </div>
                            <div class="row mx-2 mt-2 border-top border-bottom">
                                <div class="col-4 border-right text-center">
                                    <router-link
                                        class="text-dark"
                                        :to="{name: 'auth.posts' }"
                                    >
                                        <strong>Posts</strong>
                                    </router-link>
                                    <br/>
                                    {{ user.posts_count }}
                                </div>
                                <div class="col-4 border-right text-center">
                                    <router-link
                                        class="text-dark"
                                        :to="{name: 'auth.followings'}"
                                    >
                                        <strong>Following</strong>
                                    </router-link>
                                    <br/>
                                    {{ user.followings_count }}
                                </div>
                                <div class="col-4 text-center">
                                    <router-link
                                        class="text-dark"
                                        :to="{name: 'auth.followers'}"
                                    >
                                        <strong>Followers</strong>
                                    </router-link>
                                    <br/>
                                    {{ user.followers_count }}
                                </div>
                            </div>
                            <br />
                            <div class="form-group">
                                <label for="nameInput">Name</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="nameInput"
                                    v-model="user.name"
                                />
                            </div>
                            <div class="form-group">
                                <label for="titleInput">Email</label>
                                <input
                                    type="email"
                                    class="form-control"
                                    id="descriptionInput"
                                    placeholder="Description..."
                                    v-model="user.email"
                                />
                            </div>
                            <div class="form-group">
                                <label for="contentInput">About</label>
                                <textarea
                                    type="text"
                                    class="form-control"
                                    id="contentInput"
                                    placeholder="Content..."
                                    v-model="user.about"
                                    rows="6"
                                ></textarea>
                            </div>
                            <button
                                @click="updateProfile()"
                                type="button"
                                class="btn btn-outline-dark"
                            >Update Profile</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data() {
        return {
            changed: false
        };
    },
    created() {
        this.retrieveCurrentUser();
    },
    methods: {
        updateProfile() {
            const formData = new FormData();
            formData.append("name", this.user.name);
            formData.append("about", this.user.about);
            formData.append("email", this.user.email);

            const image = this.$refs.file.files[0];
            if (image) {
                formData.append("profile_image", image);
            }

            this.$store
                .dispatch("updateProfile", formData)
                .then(response => {
                    this.retrieveCurrentUser();
                    this.$toastr.s("User succesfully updated.");
                })
                .catch(error => {
                    this.$toastr.e(error);
                });
        },
        showProfileImage() {
            const image = this.$refs.file.files[0];
            this.changed = true;
            const reader = new FileReader();
            reader.onload = event => {
                this.user.profile_image = event.target.result;
            };
            reader.readAsDataURL(image);
        },
        retrieveCurrentUser() {
            this.$store.dispatch("retrieveCurrentUser");
            this.changed = false;
        },
        deleteProfileImage() {
            this.$store
                .dispatch("deleteProfileImage")
                .then(response => {
                    this.$toastr.s("User Profile Image succesfully deleted.");
                    this.user.profile_image = null;
                    this.changed = false;
                })
                .catch(error => {
                    this.$toastr.e(error);
                });
        }
    },
    computed: {
        imageUrl() {
            if (this.changed) {
                return this.user.profile_image;
            } else {
                if (this.user.profile_image) {
                    return `http://127.0.0.1:8000/uploads/profiles/${this.user.profile_image}`;
                } else {
                    return `https://png.pngtree.com/svg/20170602/user_circle_1048392.png`;
                }
            }
        },
        user() {
            return this.$store.getters.getCurrentUser;
        }
    }
};
</script>

<style scoped>
.circular {
    width: 150px;
    height: 150px;
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
input[type="file"] {
    display: none;
}
.custom-file-upload {
    display: inline-block;
    cursor: pointer;
    margin-right: 2px;
}
a {
    color: black;
    margin-left: 2px;
}
</style>