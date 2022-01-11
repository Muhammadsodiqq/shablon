import nodemailer from "nodemailer";
async function mailer (email, code) {
    let transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user: 'adyollaruz@gmail.com',
            pass: 'password2021'
        }
    })
    
    const mailOptions = {
        from: 'adyollaruz@gmail.com', // sender address
        to: email, // list of receivers
        subject: 'your authentification code', // Subject line
        html: '<p>Your html here: </p> ' + `<strong>${code}</strong>`// plain text body
      };
      
      transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
     });
}

export default mailer;