const rashtrapatiModel = require('../Models/rashtrapatiModel.js')
const CryptoJS = require('crypto-js');

const updateRashtrapatiController = async(req, res) => {
      try {
            const {mem_voted, ID, voteCount} = req.body;
            
            const secretKey = process.env.key;
            const encryptedVoteCount = CryptoJS.AES.encrypt(voteCount, secretKey).toString();

            const rashtrapatiMember = await rashtrapatiModel.findOne({ID});
            const id  = rashtrapatiMember._id;
            const updatedData = await rashtrapatiMember.findByIdAndUpdate(
                  id,
                  {
                        voteCount: encryptedVoteCount || rashtrapatiMember.voteCount,
                        $push: { members_voted: mem_voted }
                  },
                  { new: true }
                );
                

            return res.status(200).send({
                  success : true,
                  message : "You have voted successfully for Rashtrapati Elections",
                  rashtrapatiMember
            })

      } catch (error) {
            console.log(error);
            return res.status(500).send({
                  success : false,
                  message : "Error in Rashtrapati Call stack",
                  error
            })
      }
}

module.exports = updateRashtrapatiController;