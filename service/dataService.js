const jwt=require("jsonwebtoken")

const db=require('./db')


 userDetails= {
    1000: { username: "anu", acno: 1000, password: "abc123", balance: 0, transactions: [] },
    1001: { username: "subin", acno: 1001, password: "abc123", balance: 0, transactions: [] },
    1002: { username: "athif", acno: 1002, password: "abc123", balance: 0, transactions: [] },
    1003: { username: "anwar", acno: 1003, password: "abc123", balance: 0, transactions: [] },

  }


register =(acno, uname, psw)=>{
                         // store the resolved output of findOne in a variable user
return db.User.findOne({acno}).then(user=>{
//if acno present in db then get the object of that user else null response
  if(user){
    return {
      status:false,
      message:"user already present",
      statusCode:404
    }
   
  }
  else{
     newUser=new db.User({
      username:uname,
      acno,
      password:psw,
      balance:0,
      transactions:[]
     }) 
     newUser.save()
     return {
        
      status:true,
      message:"registration successfull",
      statusCode:200
    
  }
  }
})

} 
   

  login=(acno, psw)=>{

    return db.User.findOne({acno}).then(user=>{

      if(user){
        if(psw == user.password){
          return {
        
            status:true,
            message:"login successfull",
            statusCode:200,
            // currentUser,
            // currentAcno,
            // token
          
        }

        }
        else{
          return {
        
            status:false,
            message:"incurrect password",
            statusCode:404
          
        }
        }
      }
      else{

        return {
        
          status:false,
          message:"not registerd",
          statusCode:404
        
      }
      }
      
    })

    if (acno in userDetails) {
      if (psw == userDetails[acno]["password"]) {
        currentUser = userDetails[acno]["username"]
        currentAcno = acno

        const token=jwt.sign({acno},"superkey123")

        return {
        
          status:true,
          message:"login successfull",
          statusCode:200,
          currentUser,
          currentAcno,
          token
        
      }
      }
      else {
        return {
        
          status:false,
          message:"incurrect password",
          statusCode:404
        
      }
      }

    }
    else {
      return {
        
        status:false,
        message:"not registerd",
        statusCode:404
      
    }
    }
  }


  deposit=(acno, psw, amnt) =>{

    var amount = parseInt(amnt)

    if (acno in userDetails) {
      if (psw == userDetails[acno]["password"]) {
        userDetails[acno]["balance"] += amount
        console.log(userDetails);

        //add transaction details
        userDetails[acno]["transactions"].push(
          {
            Type: "Credit",
            Amount: amount
          }
        )

        return {
          status:true,
          message:`your account is creadited with amount ${amount} and the balance is ${userDetails[acno]["balance"]}`,
          statusCode:200
        }

      }
      else {
        return {
          status:false,
          message:"incurrect password",
          statusCode:404
        }
      }
    }
    else {
      return {
        status:false,
        message:"incurrect account number",
        statusCode:404
      }
    }

  }



  withdraw=(acno, psw, amnt) =>{

    var amount = parseInt(amnt)

    if (acno in userDetails) {
      if (psw == userDetails[acno]["password"]) {
        if (amount <= userDetails[acno]["balance"]) {
          userDetails[acno]["balance"] -= amount
          console.log(userDetails);


          //add transaction details
          userDetails[acno]["transactions"].push(
            {
              Type: "Debit",
              Amount: amount
            }
          )



          return  {
            status:true,
            message:`your account is debited with amount ${amount} and the balance is ${userDetails[acno]["balance"]}`,
            statusCode:200
          }
        }
        else {
          return{
        
            status:false,
            message:"insufficient balance",
            statusCode:404
          }
        }

      }
      else {
        return {
          
            status:false,
            message:"incurrect password",
            statusCode:404
          }
        
      }
    }
    else {
      return {
        
          status:false,
          message:"incurrect account number",
          statusCode:404
        }
      }
    }

  

    getTransaction=(acno) =>{
      return {
        status:true,
        transaction:userDetails[acno].transactions,
        statusCode:200
      }
    }









  module.exports={
    register,login,deposit,withdraw,getTransaction
  }