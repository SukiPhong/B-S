const  crypto = require ('crypto');
const token_Email=async(user)=>{
        const token = crypto.randomBytes(32).toString('hex');
          user.resetPwToken =crypto.createHash('sha256').update(token).digest('hex');
          user.resetPwExpiry=Date.now()+15*60*1000;
          await user.save()
          console.log(user.resetPwExpiry)
        return token;
    }

 module.exports=token_Email;