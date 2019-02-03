import { AUTH_TOKEN, USER_INFO } from "../constants"

export const isUserLoggedIn = () => !!localStorage.getItem(AUTH_TOKEN)

export const logoutUser = () => {
	localStorage.removeItem(AUTH_TOKEN)
	localStorage.removeItem(USER_INFO)
}

export const setUserInfo = (token, user) => {
	localStorage.setItem(AUTH_TOKEN, token)
	localStorage.setItem(USER_INFO, JSON.stringify(user))
}

export const getUserInfo = () => {
	const userInfo = localStorage.getItem(USER_INFO)

	if (userInfo) {
		return JSON.parse(userInfo)
	} else {
		return {
			__typename: 'User',
			id: null,
			firstName: null,
			lastName: null,
			email: null,
		}
	}
}