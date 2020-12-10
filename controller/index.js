const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserModel = require('../model/user');

/**
 * @desc This method registers new Users
 * @route POST /api/auth/register-user
 * @access Public
 */
exports.eegistration = async (req, res) => {
  const {email, password} = req.body;
  try {
    // checking if user already registered
    let user = await UserModel.findOne({email});
    if (user) return res.status(400).json({error: 'Email already registered'}); 
    
    // creating new user
    user = new UserModel(req.body);
    user.hashedPassword = await bcrypt.hash(password, 12);

    // saving user to DB
    user = await user.save();
    
    // generating JWT and returning it as response
    jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: 86400}, 
      (error, token) => {
        if (error) throw(error.message);
        return res.json({token});
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({error: 'Something went wrong on Server'});
  }
}


/**
 * @desc This method authorize the user login
 * @route POST /api/auth/login
 * @access Public
 */
exports.login = async (req, res) => {
  const {email, password, type} = req.body;

  try {
    // retriving user data
    const user = await UserModel.findOne({email}).select('hashedPassword');

    // verifying user details
    if (!user) return res.status(400).json({error: 'Invalid email or password!'});
    if (!await bcrypt.compare(password, user.hashedPassword)) return res.status(400).json({error: 'Invalid email or password!'});

    // generating JWT and returning it as response
    jwt.sign({id: user._id, type}, process.env.JWT_SECRET, {expiresIn: 86400}, 
      (error, token) => {
        if (error) throw(error.message);
        return res.json({token});
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({error: 'Something went wrong'});
  }
}


/**
 * @desc Retrive user's information
 * @route GET /api/auth/profile
 * @access Private
 */
exports.profile = async (req, res) => {
  const id = req.user_id;

  try {
    // retriving user data
    const user = await UserModel.findById(id).select('-hashedPassword -updatedAt -__v');

    // verifying user details
    if (!user) return res.status(400).json({error: 'Invalid User ID!'});

    res.json({user});
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({error: 'Something went wrong'});
  }
}


/**
 * @desc Upate user's password
 * @route POST /api/auth/update-password
 * @access Private
 */
exports.updatePassword = async (req, res) => {
  const id = req.user_id;
  const {oldPassword, password} = req.body;

  try {
    // retriving user data
    const user = await UserModel.findById(id).select('hashedPassword');
    
    // verifying user details
    if (!user) return res.status(400).json({error: 'Invalid User Id!'});
    if (!await bcrypt.compare(oldPassword, user.hashedPassword)) return res.status(400).json({error: 'Incorrent Old Password!'});
    
    // Updating password
    user.hashedPassword = await bcrypt.hash(password, 12);

    // saving user data
    await user.save();

    // sending success msg as respose
    res.json({msg: 'Password Updated successfully!'});
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({error: 'Something went wrong'});
  }
}