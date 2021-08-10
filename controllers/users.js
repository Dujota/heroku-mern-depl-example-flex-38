const User = require('../models/user');

async function signup(req, res) {
  const user = new User(req.body);
  try {
    await user.save();
    // TODO: Send back a JWT instead of the user
    // const token = createJWT(user)
    res.json({ user });
  } catch (err) {
    // Probably a duplicate email
    res.status(400).json(err);
  }
}

async function login(req, res){
  try {
    const user = await User.findOne({email:req.body.email})

    // when no user is found by email, exit with error - EARLY RETURN
    if (!user) return res.status(401).json({err: 'bad credentials'})

    const isMatch = user.password === req.body.password

      if(isMatch){
        // const token = createJWT(user);
        res.json({user})
      }else{

        // 401 --> unauthorized when the lookup succeeds but we dont end up with matching credentials
        return res.status(401).json({err: 'bad credentials'})
      }

  } catch (error) {
    // the mongoose lookup fails, we should respond to FE with a bad request
    return res.status(400).json(error)
  }
}



module.exports = {
  signup,
  login
};