const mongoose = require('mongoose')

const rashtrapatiModel = new mongoose.Schema(
      {
            name : {
                  type : String,
                  required : true,
                  message : "Name is Required"
            },
            ID : {
                  type : String,
                  unique : true,
                  required : true,
                  message : "ID is Required"
            },
            party : {
                  type : String,
                  required : true,
                  message : "Party Name is Required"
            },
            state : {
                  type : String,
                  required : true,
                  message : "State name is Required"
            },
            voteCount : {
                  type : String
            },
            symbol : {
                  data: Buffer,
                  contentType: String
            },
            yourImage : {
                  data: Buffer,
                  contentType: String
            },
            // 
            members_voted:{
                  type: [Number] 
            }
            // ek letter propse ki 50 members ne ek candidate ka naam diya hoga
            // baaki inko hthakr 50 log accept krte hain ki wo candidate hoga
            // jb hogya khada toh sab vote kr sakte hain
      },
      {
            timestamps : true
      }
)

module.exports = mongoose.model("rashtrapatiDatabase", rashtrapatiModel);