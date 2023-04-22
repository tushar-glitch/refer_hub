const candidateModel = require('../models/candidatemodel')
const sendNotificationTocandidate = async (location, company, domain) => {
    const Obj = {
        location: location,
        company: company,
        domain:domain
    }
    const allusers = await candidateModel.find(Obj)
    // console.log(allusers);
}
module.exports = {sendNotificationTocandidate}