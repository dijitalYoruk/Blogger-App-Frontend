import axios  from 'axios'
import toastr from 'vue-toastr'

axios.defaults.headers.common = {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json"
};

const state = {
    allPosts: [],
    allPostsCurrentPage: 1,
    allPostsTotalPage: 0,
    authPosts: [],
    authPostsCurrentPage: 1,
    authPostsTotalPage: 0,
}

const mutations = {
    createPost(state, payload) {
        state.posts.push(payload);
    },
    retrieveAllPosts(state, payload) {
        state.allPosts = payload.data;
        state.allPostsCurrentPage = payload.current_page;
        state.allPostsTotalPage = payload.last_page;
    },
    retrieveAuthPosts(state, payload) {
        state.authPosts = payload.data;
        state.authPostsCurrentPage = payload.current_page;
        state.authPostsTotalPage = payload.last_page;
    },
    clearAllPosts(state) {
        state.allPosts = [];
        state.allPostsCurrentPage = 1;
        state.allPostsTotalPage = 0;
    },
    clearAuthPosts(state) {
        state.authPosts = [];
        state.authPostsCurrentPage = 1;
        state.authPostsTotalPage = 0;
    },
    deleteAuthPost(state, payload) {
        state.authPosts.splice(payload, 1);
    },
    deletePost(state, payload) {
        state.allPosts.splice(payload, 1);
    }
}

const actions = {
    createPost({ commit, rootState }, payload) {
        return new Promise((resolve, reject) => {
            axios.post('/posts', payload, {
                headers: {
                    'Authorization': `Bearer ${rootState.auth.access_token}`,
                }
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error.response);
            });
        });
    },
    retrieveAllPosts({ commit, rootState }, payload) {
        axios.get('/posts', {
            headers: {
                'Authorization': `Bearer ${rootState.auth.access_token}`,
            },
            params: { 
                'page': payload.page,
                'search': payload.search
            }
        })
        .then(response => {
            commit('retrieveAllPosts', response.data);
        })
        .catch(error => {
            toastr.e(error.response)
        });
    },
    retrieveAuthPosts({ commit, rootState }, payload) {
        axios.get('/authposts', {
            headers: {
                'Authorization': `Bearer ${rootState.auth.access_token}`,
            },
            params: { 
                'page': payload.page,
                'search': payload.search             
            }
        })
        .then(response => {
            commit('retrieveAuthPosts', response.data);
        })
        .catch(error => {
            toastr.e(error.response)
        });
    },
    deleteAuthPost({ commit, rootState }, payload) {
        const url = '/posts/' + payload.post_id + '/delete';
        axios.delete(url, {
            headers: {
                'Authorization': `Bearer ${rootState.auth.access_token}`,
            }
        })
        .then(response => {
            rootState.auth.user.posts_count--;
            commit('deleteAuthPost', payload.post_index);
        })
        .catch(error => {
            toastr.e(error.response)
        });
    },
    deletePost({ commit, rootState }, payload) {
        const url = '/posts/' + payload.post_id + '/delete';
        axios.delete(url, {
            headers: {
                'Authorization': `Bearer ${rootState.auth.access_token}`,
            }
        })
        .then(response => {
            commit('deletePost', payload.post_index);
        })
        .catch(error => {
            toastr.e(error.response)
        });
    },
    retrievePost({ commit, rootState }, payload) {
        return new Promise((resolve, reject) => {
            axios.get('/posts/' + payload, {
                headers: {
                    'Authorization': `Bearer ${rootState.auth.access_token}`,
                }
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error.response.data);
            });
        });
    },
    retrieveUserPosts({ commit, rootState }, payload) {
        return new Promise((resolve, reject) => {
            axios.get('/users/' + payload.id + "/posts", {
                headers: {
                    'Authorization': `Bearer ${rootState.auth.access_token}`,
                },              
                params: { 
                    'page': payload.page,
                    'search': payload.search
                }
            })
            .then(response => {
                commit('retrieveAllPosts', response.data);
                resolve(response.data);
            })
            .catch(error => {
                reject(error.response);
            });
        });
    },
    updatePost({ commit, rootState }, payload) {
        return new Promise((resolve, reject) => {
            axios.post('/posts/' + payload.post_id, payload.formData, {
                headers: {
                    'Authorization': `Bearer ${rootState.auth.access_token}`,
                }
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error.response);
            });
        }); 
    },
    deletePostImage({ commit, rootState }, payload) {
        return new Promise((resolve, reject) => {
            axios.delete('postImages/' + payload, {
                headers: {
                    'Authorization': `Bearer ${rootState.auth.access_token}`,
                }
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error.response);
            });
        });
    }
}

const getters = {
    getAllPosts(state) {
        return state.allPosts;
    },
    getAllPostsCurrentPage() {
        return state.allPostsCurrentPage;
    },
    getAllPostsTotalPage() {
        return state.allPostsTotalPage;
    },
    getAuthPosts(state) {
        return state.authPosts;
    },
    getAuthPostsCurrentPage() {
        return state.authPostsCurrentPage;
    },
    getAuthPostsTotalPage() {
        return state.authPostsTotalPage;
    },
}

export default {
    state,
    mutations,
    actions,
    getters
}