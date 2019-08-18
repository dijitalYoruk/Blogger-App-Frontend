<template>
    <div id="app">
        <app-header class="mb-5"></app-header>
        <div v-if="isUserSignedIn" class="container mb-5">
			<div class="row">
				<div class="col-md-4">
					<sidebar></sidebar>
				</div>
				<div class="col-md-8">
            		<router-view></router-view>
				</div>
			</div>
        </div>
		<div v-else class="container mb-5">
            <router-view></router-view>
		</div>
    </div>
</template>

<script>
import Header  from "./components/shared/header";
import Footer  from "./components/shared/footer";
import Sidebar from "./components/shared/sidebar";

export default {
    components: {
        appHeader: Header,
		appFooter: Footer,
		sidebar: Sidebar,
	},
	computed: {
		isUserSignedIn() {
			return this.$store.getters.isUserSignedIn;
		}

	}
};
</script>
