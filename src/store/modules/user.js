import axios  from 'axios'
import toastr from 'vue-toastr'

axios.defaults.headers.common = {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json"
};

const state = {
    allUsers: [],
    allFollowings: [],
    allUsersCurrentPage: 1,
    allUsersTotalPage: 0
}

const mutations = {
    retrieveAllUsers(state, payload) {
        state.allUsers = payload.users.data;
        state.allUsersCurrentPage = payload.users.current_page;
        state.allUsersTotalPage = payload.users.last_page;
        state.allFollowings = payload.followings_ids;
    },
    clearAllUsers(state) {
        state.allUsers = [];
        state.allFollowings = [];
        state.allUsersCurrentPage = 1;
        state.allUsersTotalPage = 0;
    },
    deleteFollowing(state, payload) {
        state.allFollowings = state.allFollowings.filter(obj => { 
            return obj.id != payload 
        });
    },
    deleteUser(state, payload) {
        state.allUsers.splice(payload, 1);

    },
    addFollowing(state, payload) {
        state.allFollowings.push(payload);
    }
}

const actions = {
    retrieveAllUsers({ commit, rootState }, payload) {
        axios.get('/users', {
            headers: {
                'Authorization': `Bearer ${rootState.auth.access_token}`,
            },
            params: { 
                'page': payload.page,  
                'search': payload.search
            }
        })
        .then(response => {
            commit('retrieveAllUsers', response.data);
        })
        .catch(error => {
            toastr.e(error.response);
        });
    },
    retrieveUser({ commit, rootState }, payload) {
        return new Promise((resolve, reject) => {
            axios.get('/users/' + payload, {
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
    retrieveFollowers({ commit, rootState, state }, payload) {
        axios.get('/users/' + payload.id + '/followers', {
            headers: {
                'Authorization': `Bearer ${rootState.auth.access_token}`,
            },
            params: { 'page': payload.page }
        })
        .then(response => {
            commit('retrieveAllUsers', response.data);
        })
        .catch(error => {
            toastr.e(error.response)
        });
    },
    retrieveFollowings({ commit, rootState }, payload) {
        return new Promise((resolve, reject) => {
            axios.get('/users/' + payload.id + '/followings', {
                headers: {
                    'Authorization': `Bearer ${rootState.auth.access_token}`,
                },
                params: { 'page': payload.page }
            })
            .then(response => {
                commit('retrieveAllUsers', response.data);
                resolve(response.data);
            })
            .catch(error => {
                reject(error.response.data);
            });
        });
    },
    followUser({ commit, rootState }, payload) {
        return new Promise((resolve, reject) => {
            axios.post('users/' + payload + '/follow', {}, {
                headers: {
                    'Authorization': `Bearer ${rootState.auth.access_token}`,
                },
            })
            .then(response => {
                rootState.auth.user.followings_count++;
                resolve(response.data);
            })
            .catch(error => {
                reject(error.response);
            });
        });
    },
    unfollowUser({ commit, rootState }, payload) {
        return new Promise((resolve, reject) => {
            axios.post('/users/' + payload + '/unfollow', {}, {
                headers: {
                    'Authorization': `Bearer ${rootState.auth.access_token}`,
                }
            })
            .then(response => {
                rootState.auth.user.followings_count--;
                resolve(response.data);
            })
            .catch(error => {
                reject(error.response);
            });
        });
    }
}

const getters = {
    getAllUsers(state) {
        return state.allUsers;
    },
    getAllUsersCurrentPage() {
        return state.allUsersCurrentPage;
    },
    getAllUsersTotalPage() {
        return state.allUsersTotalPage;
    },
    getAllFollowerIds(state) {
        return state.allFollowings;
    },
}

export default {
    state,
    mutations,
    actions,
    getters
}