import decode from "jwt-decode";

class AuthService {
    //retrieve data saved in token
    getProfile() {
        return decode(this.getToken());
    }

    //check if the user is still logged in
    loggedIn() {
        //checks if there is a saved token and it's still valid
        const token = this.getToken();
        //use type coersion to check if token is NOT undefined and the token is NOT expired
        return !!token && !this.isTokenExpired(token);
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    }

    //retrieve token from localStorage
    getToken() {
        //retrieves the user token from local storage
        return localStorage.getItem("id_token");
    }

    //set token to lS and reload page to homepage
    login(idToken) {
        //saves user token to lS
        localStorage.setItem("id_token", idToken);

        window.location.assign("/");
    }

    //clear token from lS and force logout with reload
    logout() {
        //Clear user token and profile data from lS
        localStorage.removeItem("id_token");
        //this will reload the page and reset the state of the application
        window.location.assign("/");
    }
}

export default new AuthService();
