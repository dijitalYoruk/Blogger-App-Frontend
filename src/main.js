import Vue 		   from 'vue'
import App 		   from './App.vue'
import router 	   from './router'
import store 	   from './store'
import axious 	   from 'axios'
import toastr 	   from "vue-toastr"
import VeeValidate from 'vee-validate';


Vue.use(VeeValidate, {
	events: 'blur'
});

Vue.use(toastr, {
	defaultTimeout: 2000,
	defaultProgressBar: false,
	defaultProgressBarValue: 0,
	defaultType: "error",
	defaultPosition: "toast-bottom-left",
	defaultCloseOnHover: false,
	defaultClassNames: ["animated", "zoomInUp"]
});

Vue.config.productionTip = false
axious.defaults.baseURL = 'http://127.0.0.1:8000/api'

new Vue({
    router,
    store,

    beforeCreate() {
		store.commit('initialiseAuth');
	},

    render: h => h(App)
}).$mount('#app')