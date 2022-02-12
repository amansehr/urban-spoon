const nodemailer = require('nodemailer')

module.exports.mailService = (mailId,subject,text) => {
    const transporter = nodemailer.createTransport({
        service : "gmail",
        auth:{
            user : process.env.EMAILID,
            pass : process.env.PASSWORD
        }
    })
    
    const mailOptions = {
        from: "amansehrawat218@gmail.com",
        to : mailId,
        subject : subject,
        text: text
    }
    transporter.sendMail(mailOptions,(err,result) => {
        if(err){
            console.log(err)
            return res.send({
                msg : "Technical Issue"
            })
        }
        console.log(result)
        return res.send({
            msg : "Check Mail"
        })
    })
}