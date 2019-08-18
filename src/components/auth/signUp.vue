<template>
    <div class="row justify-content-center">
        <div class="col-lg-5 col-md-8 col-sm-10">
            <div class="card shadow my-5">
                <div class="card-body">
                    <h5 class="card-title">Sign Up</h5>
                    <form @submit.prevent="validateBeforeSubmit()">
                        <div class="form-group">
                            <label for="nameInput">Name</label>
                            <input
                                v-validate="'required|min:3'"
                                type="text"
                                name="name"
                                :class="isNameValid"
                                class="form-control"
                                id="nameInput"
                                v-model="name"
                            />
                            <span class="invalid-feedback">
                                {{ errors.first('name') }}
                            </span>
                        </div>
                        <div class="form-group">
                            <label for="emailInput">Email</label>
                            <input
                                v-validate="'required|email'"
                                type="email"
                                name="email"
                                :class="isEmailValid"
                                class="form-control"
                                id="emailInput"
                                placeholder="example@gmail.com"
                                v-model="email"
                            />
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
                                :class="isPasswordValid"
                                class="form-control"
                                id="passwordInput"
                                v-model="password"
                            />
                            <span class="invalid-feedback">
                                {{ errors.first('password') }}
                            </span>
                        </div>
                        <div class="form-group">
                            <label for="passwordConfirmationInput">Password(Repeat)</label>
                            <input
                                v-validate="'required|min:10'"
                                type="password"
                                name="passwordConfirmation"
                                :class="isPasswordConfirmationValid"
                                class="form-control"
                                id="passwordConfirmationInput"
                                v-model="password_confirmation"
                            />
                            <span class="invalid-feedback">
                                {{ errors.first('passwordConfirmation') }}
                            </span>
                        </div>
                        <button
                            type="submit"
                            class="btn btn-outline-dark">
                                Sign Up
                        </button>
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
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
            isSubmitClicked: false
        };
    },
    methods: {
        validateBeforeSubmit() {
            this.isSubmitClicked = true;
            this.$validator.validateAll().then((result) => {
                if (result) {
                    if (this.password == this.password_confirmation) {
                        this.signUpUser() 
                    } else {
                       this.$toastr.e('Passwords does not match each other.');
                    }
                } else {
                    this.$toastr.e('Please fill the inputs correctly.');
                }
            })
        },
        signUpUser() {
            this.$store.dispatch("signUpUser", {
                name: this.name,
                email: this.email,
                password: this.password,
                password_confirmation: this.password_confirmation
            })
            .then(result => {
                this.$router.push({ name: "auth.signIn" });
                this.$toastr.s('Please Sign in.');
            }).catch(error => {
                this.$toastr.e(error.message);
            });
        }
    },
    computed: {
        isNameValid() {
            return { 
                'is-invalid': this.errors.has('name') && this.isSubmitClicked, 
                'is-valid':  !this.errors.has('name') && this.isSubmitClicked
            }
        }, 
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
        },
        isPasswordConfirmationValid() {
            return { 
                'is-invalid': this.errors.has('passwordConfirmation') && this.isSubmitClicked, 
                'is-valid':  !this.errors.has('passwordConfirmation') && this.isSubmitClicked
            }
        }
    }
};
</script>