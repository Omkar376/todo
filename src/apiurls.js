const BaseUrl = "https://apptodo0376.herokuapp.com";

export const Urls = {
  Todos: {
    GetAll: `${BaseUrl}/todoitem/`,
    GetDetails: `${BaseUrl}/details/`,
    Post : `${BaseUrl}/todoitem/`,
    Put : `${BaseUrl}/todoitem/`,
    Delete: `${BaseUrl}/delete/`
  },
  Buckets : `${BaseUrl}/buckets/`,
  Signup : `${BaseUrl}/rest-auth/registration/`,
  Login : `${BaseUrl}/rest-auth/login/`

}