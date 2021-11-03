const nodemailer = require('nodemailer')

// The credentials for the email account you want to send mail from. 
// const credentials = {
//   service:"gmail",
//   auth: {
//     // These environment variables will be pulled from the .env file
//     user: "toppythondev13579@gmail.com",
//     pass: "Kiranku123$"
//   }
// }
var transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  service: 'gmail',
  auth: {
    user: 'atomictasks@gmail.com',
    pass: 'palomojado2040'
  }
});
// Getting Nodemailer all setup with the credentials for when the 'sendEmail()'
// function is called.
// const transporter = nodemailer.createTransport(credentials)

// exporting an 'async' function here allows 'await' to be used
// as the return value of this function.
module.exports = async (to, content) => {

  // The from and to addresses for the email that is about to be sent.
  const contacts = {  
    from: "atomictasks@gmail.com",
    to
  }

  // Combining the content and contacts into a single object that can
  // be passed to Nodemailer.
  const email = Object.assign({}, content, contacts)

  // This file is imported into the controller as 'sendEmail'. Because 
  // 'transporter.sendMail()' below returns a promise we can write code like this
  // in the contoller when we are using the sendEmail() function.
  //
  //  sendEmail()
  //   .then(() => doSomethingElse())
  // 
  // If you are running into errors getting Nodemailer working, wrap the following 
  // line in a try/catch. Most likely is not loading the credentials properly in 
  // the .env file or failing to allow unsafe apps in your gmail settings.
  console.log(email, 123)
  await transporter.sendMail(email, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  })
}