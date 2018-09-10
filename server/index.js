const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
var fs = require("fs");
const CONFIG = require('./config');
const {_} = require("underscore");
const app = express();
const PORT = CONFIG.port || 4000;

app.use(express.static(__dirname + '/' + CONFIG.webDir));
app.use(express.static(__dirname + '/' + CONFIG.nodeDir));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
let usersData = {};
function getUsers(filepath){
   var file = fs.readFileSync(filepath, 'utf8');
    return JSON.parse(file);
}
//load users
usersData = getUsers('./server/data/users.json');
//Validate user login credentials 
app.post('/login', function (req, res) {
    let params = req.body,
        response = {},
        user = _.findWhere(usersData.users,{ username : params.username,password : params.password });

    
    //validate user credentials
    //const userOrgId=user.organisationId;
    // const orgsWithRole=_.where(usersData.organisations,{role:params.role})
    // const orgIdRoleSame=_.findWhere(orgsWithRole,{id:userOrgId});

    if(user !== undefined){
        response = { 
            success: true,
            currentUser : {
                id : user.id,
                username : user.username,
                name : user.name,
                orgId : user.organisationId,
                role : params.role
            } //load matched user
        }
    } else {
        response = { success: false, error: "User not valid" };
    }

    res.status(200).send(JSON.stringify(response));
});
// if you need api routes add them here
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Check out the app at http://localhost:${PORT}`);
});