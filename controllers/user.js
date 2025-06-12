const User = require("../models/user.js");

module.exports.RenderSignupFrom=(req,res)=>{
    res.render("users/signup.ejs")
};

module.exports.signUp =async(req,res)=>{
    try {let{username,email,password}= req.body;
    const newUser= new User({email,username});
    const registerUser= await User.register(newUser,password);
     req.login(registerUser,(err)=>{
      if(err){
        return next(err);
      }
      req.flash("success", "Welcome to WonderNest");
    res.redirect("/listings");
     });
    
} catch(e){
    req.flash("error",e.message);
    res.redirect("/signup")
}
};

module.exports.RenderLoginForm= (req,res)=>{
    res.render("users/login.ejs")
};

module.exports.Login=async (req, res) => {
    req.flash("success","Welcome to WonderNest!");
    let redirectUrl =res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl);
  };

module.exports.LogOut=(req,res,next)=>{
  req.logout((err)=>{
    if(err){
      return next(err);
    }
    req.flash("success", "You are logged out!");
    res.redirect("/listings");
  });
}  

