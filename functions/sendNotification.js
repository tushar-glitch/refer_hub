const candidateModel = require('../models/candidatemodel')
const sendNotificationTocandidate = async (location, company, domain) => {
    const Obj = {
        location: location,
        company: company,
        domain:domain
    }
    var notToUser = []
    const allusers = await candidateModel.find()
    for (let i = 0; i < allusers.length; ++i){
        var l = false;
        var c = false;
        var d = false;
        var alldom = allusers[i].domain
        var allloc = allusers[i].location
        var allcom = allusers[i].companies
        for (let j = 0; j < alldom.length; ++j){
            if (alldom[j] == domain) {
                d = true;
            }
        }
        for (let j = 0; j < allloc.length; ++j){
            if (allloc[j] == location) {
                l = true;
            }
        }
        for (let j = 0; j < allcom.length; ++j){
            if (allcom[j] == company) {
                c = true;
            }
        }
        if (l && c && d) {
            await candidateModel.findOneAndUpdate(
                { email: allusers[i].email },
                { $set: { notification: Obj } },
                {new: true}
            )
        }
    }
    console.log(notToUser);
}
module.exports = {sendNotificationTocandidate}