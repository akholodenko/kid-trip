import Routes from '../routes'

export const isHomepage = location => location.pathname === Routes.home

export const encodeUserId = userId => btoa(userId * 999999999)

export const decodeUserId = encodedUserId => atob(encodedUserId) / 999999999
