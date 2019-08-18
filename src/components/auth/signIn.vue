<template>
    <div class="row justify-content-center">
        <div class="col-lg-5 col-md-8 col-sm-10">
            <div class="card shadow my-5">
                <div class="card-body">
                    <h5 class="card-title">Sign In</h5>
                    <form @submit.prevent="validateBeforeSubmit()">
                        <div class="form-group">
                            <label for="emailInput">Email</label>
                            <input
                                v-validate="'required|email'"
                                name="email"
                                type="email"
                                class="form-control"
                                :class="isEmailValid"
                                id="emailInput"
                                placeholder="example@gmail.com"
                                v-model="email"/>
                            <span class="invalid-feedback">
                                {{ errors.first('email') }}
                            </span>
                        </div>
                        <div class="form-group">
                            <label for="passwordInput">Password</label>
                            <input
                                v-validate="'required|min:10'"
                                type="password"
                                name="password"
                                class="form-control"
                                id="passwordInput"
                                :class="isPasswordValid"
                                v-model="password"/>
                            <span class="invalid-feedback">
                                {{ errors.first('password') }}
                            </span>
                        </div>
                        <button type="submit" class="btn btn-outline-dark">Sign In</button>
                        <router-link :to="{name:'auth.forgotPassword'}" class="mx-2 text-dark">Forgot Password?</router-link>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: "",
            password: "",
            isSubmitClicked: false
        };
    },
    methods: {
        validateBeforeSubmit() {
            this.isSubmitClicked = true;
            this.$validator.validateAll().then((result) => {
                if (result) {
                    this.signInUser()
                } else {
                    this.$toastr.e('Please fill the inputs correctly.');
                }
            })
        },
        signInUser() {
            this.$store
                .dispatch("signInUser", {
                    email: this.email,
                    password: this.password
                })
                .then(result => {
					this.$router.push({ name: "post.index" });
					this.$toastr.s('Welcome');
                })
                .catch(error => {
					this.$toastr.e(error.message);
                });
		}
    },
    computed: {
        isEmailValid() {
            return { 
                'is-invalid': this.errors.has('email') && this.isSubmitClicked, 
                'is-valid':  !this.errors.has('email') && this.isSubmitClicked
            }
        }, 
        isPasswordValid() {
            return { 
                'is-invalid': this.errors.has('password') && this.isSubmitClicked, 
                'is-valid':  !this.errors.has('password') && this.isSubmitClicked
            }
        }
    }
};
</script>