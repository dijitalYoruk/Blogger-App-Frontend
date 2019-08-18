<template>
    <div class="row justify-content-center">
        <div class="col-lg-5 col-md-8 col-sm-10">
            <div class="card shadow my-5">
                <div class="card-body">
                    <h5 class="card-title">Forgot Password</h5>
                    <div>Please type your email address to reset password.</div>
                    <hr />
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
                                v-model="email"
                            />
                            <span class="invalid-feedback">{{ errors.first('email') }}</span>
                        </div>
                        <button type="submit" class="btn btn-outline-dark">Send password reset mail</button>
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
            isSubmitClicked: false
        };
    },
    methods: {
        validateBeforeSubmit() {
            this.isSubmitClicked = true;
            this.$validator.validateAll().then(result => {
                if (result) {
                    this.sendResetPasswordEmail();
                } else {
                    this.$toastr.e("Please fill the inputs correctly.");
                }
            });
        },
        sendResetPasswordEmail() {
            this.$store
                .dispatch("sendResetPasswordEmail", {
                    email: this.email
                })
                .then(result => {
                    this.$router.push({ name: "auth.signIn" });
                    this.$toastr.s("An email is sent to your address.");
                })
                .catch(error => {
                    this.$toastr.e(error.message);
                });
        }
    },
    computed: {
        isEmailValid() {
            return {
                "is-invalid": this.errors.has("email") && this.isSubmitClicked,
                "is-valid": !this.errors.has("email") && this.isSubmitClicked
            };
        }
    }
};
</script>