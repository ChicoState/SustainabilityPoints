import Firebase, { db } from '../apis/Firebase.js'

export const UPDATE_EMAIL = 'UPDATE_EMAIL'
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD'
export const UPDATE_DISPLAYNAME = 'UPDATE_DISPLAYNAME'
export const UPDATE_ORGNAME = 'UPDATE_ORGNAME'
export const LOGIN = 'LOGIN'
export const SIGNUP = 'SIGNUP'
export const LOGINTOKEN = 'LOGINTOKEN'
export const SIGNOUT = 'SIGNOUT'

export const LoginToken = () => (
    {
        type: LOGINTOKEN
    }
);

export const SignOut = () => (
    {
        type: SIGNOUT
    }
);

export const updateEmail = email => {
    return {
        type: UPDATE_EMAIL,
        payload: email
    }
}

export const updatePassword = password => {
    return {
        type: UPDATE_PASSWORD,
        payload: password
    }
}

export const updateDisplayName = displayname => {
    return {
        type: UPDATE_DISPLAYNAME,
        payload: displayname
    }
}

export const updateOrgName = orgname => {
    return {
        type: UPDATE_ORGNAME,
        payload: orgname
    }
}

export const login = () => {
    return async (dispatch, getState) => {
        try {
            const { email, password } = getState().user
            const response = await Firebase.auth().signInWithEmailAndPassword(email, password)
            dispatch(getUser(response.user.uid))
        } catch (e) {
            alert(e)
        }
    }
}

export const getUser = uid => {
    return async (dispatch, getState) => {
        try {
            const user = await db
                .collection('users')
                .doc(uid)
                .get()

            dispatch({ type: LOGIN, payload: user.data() })
        } catch (e) {
            alert(e)
        }
    }
}

export const signup = () => {
    return async (dispatch, getState) => {
        try {
            const { email, password } = getState().user
            const response = await Firebase.auth().createUserWithEmailAndPassword(email, password)
            if (response.user.uid) {
                const user = {
                    uid: response.user.uid,
                    email: email,
                    points_current: 0,
                    points_lifetime: 0,
                    distance_today: 0,
                    last_logged_in: ""
                }

                db.collection('users')
                    .doc(response.user.uid)
                    .set(user)

                dispatch({ type: SIGNUP, payload: user })
            }
        } catch (e) {
            alert(e)
        }
    }
}

export const updateProfile = () => {
    return async (dispatch, getState) => {
        try {
            const { displayname, orgname, uid } = getState().user
            const user = {
                displayName: displayname,
                org_name: orgname,
            }

            db.collection('users')
                .doc(uid)
                .update(user)

            dispatch(getUser(uid))
        } catch (e) {
            alert(e)
        }
    }
}