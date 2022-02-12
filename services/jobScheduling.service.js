const schedule = require("node-schedule");
const {mailService} = require("../services/email.service")

module.exports.myjob = schedule.scheduleJob('*/5 * * * * *',async ()=>{
    mailService("amansehrawat218@gmail.com","Password Reset Link","asdasd")
}); 