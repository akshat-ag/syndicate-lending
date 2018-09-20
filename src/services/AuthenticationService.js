import axios from 'axios';
import _ from 'lodash';
import {users} from '../static/data/users.js';
class AuthenticationService {
    constructor() {
        this.loggedIn = false;
        this.pendingLoans = [];
        this.approvedLoans = [];
        this.pendingLoansBank = [];
        this.approvedLoansBank = [];
        this.synidcateLoansBank = [];
        this.pendingDrawdownsBank = [];
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
    setPendingLoans(pendingLoans) {
        this.pendingLoans = pendingLoans;
    }
    getPendingLoans(pendingLoans) {
        return this.pendingLoans;
    }
    setApprovedLoans(approvedLoans) {
        this.approvedLoans = approvedLoans;
    }
    getApprovedLoans(approvedLoans) {
        return this.approvedLoans;
    }
    makeNotifications() {
        let notifications = [];
        if(this.user.role === "borrower") { 
        let banksCount= [{name: 'citi', count: 0},{name: 'wells', count: 0},{name: 'jp', count: 0}]
        for(let i=0; i<this.pendingLoans.length; i++) {
            for(let j=0; j<this.pendingLoans[i].RoI.length; j++)
         if(this.pendingLoans[i].RoI[j].Status === "Rate Quoted") {
            var bank = _.find(banksCount,{ name : this.pendingLoans[i].RoI[j].BankName });
            bank.count++;
         }
        }
        for(let i=0; i<banksCount.length; i++) {
            if(banksCount[i].count > 0) {
                let name = banksCount[i].name;
                if(name === 'citi') {
                    name = 'CitiBank';
                } else if(name === 'wells') {
                    name = 'Wells Fargo';
                } else {
                    name = 'JP Morgan';
                };
                if (banksCount[i].count === 1)
                notifications.push(name + " has quoted bid for " + banksCount[i].count + " Application");
                else 
                notifications.push(name + " has quoted bids for " + banksCount[i].count + " Applications");
            }
        }
        let lengthApprovedLoans = this.approvedLoans.length;
        if(lengthApprovedLoans === 1) {
            let name = this.approvedLoans[0].ApprovedLA;
            if(name === 'citi') {
                name = 'CitiBank';
            } else if(name === 'wells') {
                name = 'Wells Fargo';
            } else {
                name = 'JP Morgan';
            };
            notifications.push(name + " has signed Information Memo " + this.approvedLoans[0].RequisitionNo);
        } else if(lengthApprovedLoans > 1) {
             notifications.push("Memo signed by banks for " + lengthApprovedLoans + " different Applications");
        }
        return notifications;
    } else if(this.user.role === "bank") {
        if(this.pendingLoansBank.length === 1)
        notifications.push( this.pendingLoansBank[0].RequisitionNo + " available for bidding");
        else if(this.pendingLoansBank.length > 1)
        notifications.push(this.pendingLoansBank.length + " new Requisitions available for bidding");
        if(this.approvedLoansBank.length === 1)
        notifications.push("Bid Accepted for " +  this.approvedLoansBank[0].RequisitionNo);
        else if(this.pendingLoansBank.length > 1)
        notifications.push(this.approvedLoansBank.length + " new Requisitions available for bidding");
        if(this.synidcateLoansBank.length === 1)
        notifications.push("Memo signature recieved for " + this.synidcateLoansBank[0].RequisitionNo);
        else if(this.pendingLoansBank.length > 1)
        notifications.push(this.synidcateLoansBank.length + " new Requisitions available for bidding");
        if(this.pendingDrawdownsBank.length === 1)
        notifications.push("Accept Drawdwon for " + this.pendingDrawdownsBank[0].LoanNo);  
        else if(this.pendingDrawdownsBank.length > 1)
        notifications.push(this.pendingDrawdownsBank.length + " new Loans available for Accepting Drawdwons");
        return notifications;
    }

    }
    getPendingActivities() {
        let notifications = [];let pendingActivity = [];
        if(this.user.role === "borrower") {
        let banksCount= [{name: 'citi', value: 'CitiBank'},{name: 'wells', value: 'Wells Fargo',count: 0},{name: 'jp', value: 'JP Morgan',count: 0}]
        for(let i=0; i<this.pendingLoans.length; i++) {
            let loan = {banksQuoted: []};
            loan.ReqNo = this.pendingLoans[i].RequisitionNo;
            loan.Status = this.pendingLoans[i].RequisitionStatus;
            for(let j=0; j<this.pendingLoans[i].RoI.length; j++) {
         if(this.pendingLoans[i].RoI[j].Status === "Rate Quoted") {
            var bank = _.find(banksCount,{ name : this.pendingLoans[i].RoI[j].BankName });
            loan.banksQuoted.push(bank.value)
         }
        }
        let objCopy = Object.assign({}, loan);
       notifications.push(objCopy);
        }
        for(let i=0; i<notifications.length; i++) {
            if(notifications[i].banksQuoted.length > 0) {
               pendingActivity.push(notifications[i]);
            }
        }
        return pendingActivity;
    } else if(this.user.role === "bank") {
        return this.pendingLoansBank;
    }
    }
    getApprovedActivities() {
        if(this.user.role === "borrower") {
            return this.approvedLoans;
        } else if(this.user.role === "bank") {
            return this.approvedLoansBank;
        }
    }
    getSyndicateActivities() {
        return this.synidcateLoansBank;
    }
    setPendingLoansBank(loans) {
        this.pendingLoansBank = loans;
    }
    setApprovedLoansBank(loans) {
        this.approvedLoansBank = loans;
    }
    setSynidcateLoansBank(loans) {
        this.synidcateLoansBank = loans;
    }
    setPendingDrawdownsBank(loans) {
        this.pendingDrawdownsBank = loans;
    }
    getPendingDrawdownsBankActivites() {
        return this.pendingDrawdownsBank;
    }
}
// let keyword will ensure that we are always throwing back the single class instance
export let AuthenticatedServiceInstance = new AuthenticationService();
