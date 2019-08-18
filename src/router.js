// packages
import Vue 	  from 'vue'
import Router from 'vue-router'
import store  from './store.js'

// components
import Post 		  	  from './components/post/post.vue'
import PostCreate 	  	  from './components/post/postCreate.vue'
import PostEdit 	  	  from './components/post/postEdit.vue'
import PostIndex 	  	  from './components/post/postIndex.vue'
import PostAuth 	  	  from './components/post/postAuth.vue'
import PostUser 	  	  from './components/post/postUser.vue'
import PostShow 	  	  from './components/post/postShow.vue'
import Auth 		  	  from './components/auth/auth.vue'
import AuthSignIn 	  	  from './components/auth/signIn.vue'
import AuthSignUp 	  	  from './components/auth/signUp.vue'
import ForgotPassword 	  from './components/auth/forgotPassword.vue'
import Profile        	  from './components/auth/profile.vue'
import ResetPassword  	  from './components/auth/resetPassword.vue'
import User 		  	  from './components/user/user.vue'
import UserIndex 	  	  from './components/user/userIndex.vue'
import UserShow 	  	  from './components/user/userShow.vue'
import UserFollowers  	  from './components/user/userFollowers.vue'
import UserFollowing  	  from './components/user/userFollowing.vue'
import UserAuthFollowing  from './components/user/userAuthFollowing.vue'
import UserAuthFollowers  from './components/user/userAuthFollowers.vue'
import UserProfile    	  from './components/user/userProfile.vue'

Vue.use(Router)

const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: "/posts",
			component: Post,
			children: [
				{
					path: "",
					name: "post.index",
					component: PostIndex
				},
				{
					path: "create",
					name: "post.create",
					component: PostCreate
				},
				{
					path: ":id/edit",
					name: "post.edit",
					component: PostEdit
				},
				{
					path: "auth",
					name: "post.auth",
					component: PostAuth
				},
				{
					path: ":id",
					name: "post.show",
					component: PostShow
				}
			],
			meta: {
				requiresAuth: true
			}
		},
		{
			path: "/users",
			component: User,
			children: [
				{
					path: "",
					name: "user.index",
					component: UserIndex
				}
			],
			meta: {
				requiresAuth: true
			}
		},
		{
			path: "/users/profile",
			component: UserProfile,
			children: [
				{
					path: ":id/followers",
					name: "user.followers",
					component: UserFollowers
				},
				{
					path: ":id/followings",
					name: "user.followings",
					component: UserFollowing
				},
				{
					path: ":id/posts",
					name: "user.posts",
					component: PostUser
				}
			],
			meta: {
				requiresAuth: true
			}
		},
		{
			path: "/auth/profile",
			component: Profile,
			children: [
				{
					path: "followers",
					name: "auth.followers",
					component: UserAuthFollowers
				},
				{
					path: "followings",
					name: "auth.followings",
					component: UserAuthFollowing
				},
				{
					path: "posts",
					name: "auth.posts",
					component: PostAuth
				}
			],
			meta: {
				requiresAuth: true,
				hideProfile: true
			}
		},
		{
			path: "/auth",
			component: Auth,
			children: [
				{
					path: "signIn",
					name: "auth.signIn",
					component: AuthSignIn,
					meta: {
						requiresVisitor: true
					}
				},
				{
					path: "signUp",
					name: "auth.signUp",
					component: AuthSignUp,
					meta: {
						requiresVisitor: true
					}
				},
				{
					path: "forgotPassword",
					name: "auth.forgotPassword",
					component: ForgotPassword,
					meta: {
						requiresVisitor: true
					}
				},
				{
					path: "resetPassword",
					name: "auth.resetPassword",
					component: ResetPassword,
					meta: {
						requiresVisitor: true
					}
				},
				{
					path: "profile",
					name: "auth.profile",
					component: Profile,
					meta: {
						requiresAuth: true
					}
				}
			],
		}
	]
})

router.beforeEach((to, from, next) => {
	const requiresAuth 	  = to.matched.some(record => record.meta.requiresAuth);
	const requiresVisitor = to.matched.some(record => record.meta.requiresVisitor);

	if (requiresAuth && !store.getters.isUserSignedIn) {
		next('/auth/signIn');
	} 
	else if (requiresVisitor && store.getters.isUserSignedIn) {
		next('/post');
	} 
	else {
		next();
	}
});

export default router;