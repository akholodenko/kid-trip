import { AUTH_TOKEN, USER_INFO } from "../constants";
import { graphql } from "react-apollo";
import { compose } from "recompose";
import { CURRENT_USER_QUERY } from "../graphql/userQueries";

export const isUserLoggedIn = () => !!localStorage.getItem(AUTH_TOKEN);

export const logoutUser = () => {
  localStorage.removeItem(AUTH_TOKEN);
  localStorage.removeItem(USER_INFO);
};

export const setUserInfo = (token, user) => {
  localStorage.setItem(AUTH_TOKEN, token);
  localStorage.setItem(USER_INFO, JSON.stringify(user));
};

export const getUserInfoFromStorage = () => {
  const userInfo = localStorage.getItem(USER_INFO);

  if (userInfo) {
    return JSON.parse(userInfo);
  } else {
    return {
      __typename: "User",
      id: null,
      firstName: null,
      lastName: null,
      email: null
    };
  }
};

export const withCurrentUser = WrappedComponent => {
  return compose(
    graphql(CURRENT_USER_QUERY, {
      props: ({ data: { currentUser } }) => ({
        currentUser
      })
    })
  )(WrappedComponent);
};

export const listenForOpenSignUpDialog = callback => {
  window.addEventListener("openSignUpModal", () => callback());
};
export const openSignUpDialog = () => {
  const event = new Event("openSignUpModal");
  window.dispatchEvent(event);
};
