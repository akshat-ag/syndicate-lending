import axios from 'axios';
import _ from 'lodash';
import {users} from '../static/data/users.js';
class AuthenticationService {
    constructor() {
        this.loggedIn = false;
        this.users = [{
            "id" : "1",
            "name" : "Mukesh Ambani",
            "organisationId" : "Reliance",
            "username" : "reliance",
            "password" : "reliance",
            "orgName" : "Reliance",
            "role" : "borrower"
        },{
            "id" : "2",
            "name" : "Patrick Sprows",
            "organisationId" : "citi",
            "username" : "citi",
            "password" : "citi",
            "orgName" : "CitiBank",
            "role" : "bank"
        },{
            "id" : "3",
            "name" : "Adam McLory",
            "organisationId" : "wells",
            "username" : "wells",
            "password" : "wells",
            "orgName" : "Wells Fargo",
            "role" : "bank"
        },{
            "id" : "4",
            "name" : "Billy Brown",
            "organisationId" : "jp",
            "username" : "jp",
            "password" : "jp",
            "orgName" : "JP Morgan",
            "role" : "bank"
        }
      ];
      this.user = {};
    }
    authenticate(postObj) {
        let user = _.find(this.users,{ username : postObj.username,password : postObj.password });
        let response;
        if(user !== undefined){
            response = { 
                success: true,
                currentUser : {
                    id : user.id,
                    username : user.username,
                    name : user.name,
                    orgId : user.organisationId,
                    orgName: user.orgName,
                    role : user.role
                } //load matched user
            }
            this.user = response.currentUser;
            this.loggedIn = true;
        } else {
            this.loggedIn = false;
            response = { success: false, error: "User not valid" };
        }
        return response;
        //
        
    }
    isLoggedIn() {
        return this.loggedIn;
    }
    toggleLogin() {
        this.loggedIn = !this.loggedIn;
    }
    getUserRole() {
        return this.user.role;
    }
    getUserInfo() {
        return this.user;
    }
}
// let keyword will ensure that we are always throwing back the single class instance
export let AuthenticatedServiceInstance = new AuthenticationService();
