
export const onLogin = (uid, email) => {

    return{
        type: 'LOGIN_SUCCESS',
        payload: {
            uid,
            email
        }
    }
}

export const onLogout = () => {

    return {
        type: 'LOGOUT',
    }
}