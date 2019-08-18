import axios  from 'axios';

axios.defaults.headers.common = {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json"
};

const state = {
    access_token: localStorage.getItem('access_token') || null,
    user: localStorage.getItem('user') || null,
}

const mutations = {
    setAccessToken(state, payload) {
        state.access_token = payload.access_token;
        state.user = payload.user;
    }, 
    destroyToken(state) {
        state.access_token = null
    },
    setCurrentUser(state, payload) {
        state.user = payload;
    },
    initialiseAuth(state) {
        if (state.user) {
            state.user = JSON.parse(state.user);
        }
    }
}

const actions = {
    signUpUser({ commit }, payload) {
        return new Promise((resolve, reject) => {
            axios.post('/auth/signup', { 
                name: payload.name, 
                email: payload.email, 
                password: payload.password,
                password_confirmation: payload.password_confirmation
            })
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error.response.data);
            });
        });
    },
    signInUser({ commit }, payload) {
        return new Promise((resolve, reject) => {
            axios.post('/auth/login', { 
                email: payload.email, 
                password: payload.password 
            })
            .then(response => {
                const auth = response.data;
                localStorage.setItem('access_token', auth.access_token);
                localStorage.setItem('user', JSON.stringify(auth.user));
                commit('setAccessToken', auth);
                resolve(response);
            })
            .catch(error => {
                reject(error.response.data);
            });
        });
    },
    signOut({ commit, state }) {
        return new Promise((resolve, reject) => {
            axios.get('/auth/logout', {
                headers: {
                    'Authorization': `Bearer ${state.access_token}`
                }
            })
            .then(response => {
                localStorage.removeItem('access_token')
                commit('destroyToken') 
                resolve(response);           
            })
            .catch(error => {
                localStorage.removeItem('access_token')
                reject(error.response.data);           
            })  
        });
    },
    sendResetPasswordEmail({ commit, state }, payload) {
        return new Promise((resolve, reject) => {
            axios.post('/password/create', {
                email: payload.email
            })
            .then(response => {
                resolve(response);           
            })
            .catch(error => {
                reject(error.response.data);           
            })  
        });
    },
    resetPassword({ commit }, payload) {
        return new Promise((resolve, reject) => {
            axios.post('/password/reset', { 
                token: payload.token,
                email: payload.email, 
                password: payload.password,
                password_confirmation: payload.password_confirmation
            })
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error.response.data);
            });
        });
    },
    updateProfile({ commit, state }, payload) {
        return new Promise((resolve, reject) => {
            axios.post('/auth/profile',  payload,{
                headers: {
                    'Authorization': `Bearer ${state.access_token}`
                }
            })
            .then(response => {
                localStorage.setItem('user', JSON.stringify(response.data));
                commit('setCurrentUser', response.data);
                resolve(response.data); 
            })
            .catch(error => {
                reject(error.response.data);
            });
        });
    },
    deleteProfileImage({ rootState }) {
        return new Promise((resolve, reject) => {
            axios.delete('/auth/profileDelete', {
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
    retrieveCurrentUser({ state, commit }) {
        axios.get('/auth/user', {
            headers: {
                'Authorization': `Bearer ${state.access_token}`,
            }
        })
        .then(response => {
            localStorage.setItem('user', JSON.stringify(response.data));
            commit('setCurrentUser', response.data);
        })
        .catch(error => {
            reject(error.response.data);
        });
    }
}

const getters = {
    isUserSignedIn(state) {
        return state.access_token !== null;
    },
    getCurrentUser(state) {
        return state.user;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}