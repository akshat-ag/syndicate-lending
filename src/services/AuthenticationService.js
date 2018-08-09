class AuthenticationService {
    constructor() {
        this.loggedIn = false;
    }
    authenticate() {
        this.loggedIn = true;
    }
    isLoggedIn() {
        return this.loggedIn;
    }
    toggleLogin() {
        this.loggedIn = !this.loggedIn;
    }
}
// let keyword will ensure that we are always throwing back the single class instance
export let AuthenticatedServiceInstance = new AuthenticationService();
