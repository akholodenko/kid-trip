import gql from "graphql-tag"

export const SIGNUP_MUTATION = gql`
    mutation SignupMutation($email: String!, $password: String!, $firstName: String!, $lastName: String!) {
        signup(email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
            token
        }
    }
`

export const LOGIN_MUTATION = gql`
    mutation LoginMutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token,
            user {
                id,
                firstName,
                lastName,
                email
            }
        }
    }
`