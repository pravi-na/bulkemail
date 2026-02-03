const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")
const app = express();
app.use(express.json());
app.use(cors())
const nodemailer = require("nodemailer");


mongoose.connect("mongodb+srv://pravina_27:27pravina1997@cluster0.ycichg6.mongodb.net/passkey?appName=Cluster0").then(() => console.log("db connected")).catch(() => console.log("db failed"))

var bulkmail = mongoose.model("bulkmail", {}, "bulmail")




app.get("/", function (req, res) {
     res.json({ message: "Backend running on Vercel" });
})

app.post("/sendemail", function (req, res) {
    var msg = req.body.msg;
    var file = req.body.file;

    bulkmail.find().then(function (retrivedata) {
        var authuser = retrivedata[0].toJSON();
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: authuser.user,
                pass: authuser.pass
            }
        })
        new Promise(async function (resolve, reject) {
            try {
                for (var i = 0; i < file.length; i++) {
                    await transporter.sendMail(
                        {
                            from: "27pravina1997@gmail.com",
                            to: file[i],
                            subject: "checking bulk mail",
                            text: msg
                        },
                        console.log("sent email to" + file[i])
                    )
                }
                resolve("success")
            }
            catch (err) {
                reject("failed")
            }
        }).then(function () {
            res.send(true)
        }).catch(function () {
            res.send(false)
        })
    })

})

// app.listen(5000, function () {
//     console.log("server started")
// })

export default app;
