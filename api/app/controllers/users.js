const { Users } = require('../../models');
const error = require('debug')('api:error');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// FOR TESTING ONLY
// exports.getUsers = async (req, res) => {
//   // run find all function
//   const users = await Users.findAll();

//   res.json(users);
// };

// register users
exports.registerUsers = async (req, res) => {
  // retrieve user data from body
  let {
    // eslint-disable-next-line prefer-const
    name,
    email,
    password,
    zipcode
  } = req.body;
  try {
    // Error response handling
    if (!name) {
      return res.status(400).json({
        namenotfound: 'Name cannot be left blank.'
      });
    }
    if (!email) {
      return res.status(400).json({
        emailnotfound: 'Email cannot be left blank.'
      });
    }
    if (!password) {
      return res.status(400).json({
        passwordnotfound: 'Password cannot be left blank.'
      });
    }

    // convert email to lowercase to keep consistent value between database and user input
    email = email.toLowerCase();
    // use bcrypt to hash the password
    password = await bcrypt.hash(password, 11);

    // send user data to the database to be saved
    const user = await Users.create({
      name,
      email,
      password,
      zipcode
    });
    const token = jwt.sign({ id: user.id }, process.env.SECRET);
    res.json({ token, loggedIn: true });
  } catch (e) {
    // log the error
    error(e);
    const errors = e.errors.map(err => err.message);
    // send an unauthorized response if something above fails to work.
    res.status(401).json({ errors, loggedIn: false });
  }
};

exports.loginUsers = async (req, res) => {
  // Form validation
  const { email, password } = req.body;
  const [user] = await Users.findAll({ where: { email } });
  // Check if user exists
  if (!user) {
    return res
      .status(403)
      .json({ emailnotfound: 'Username not found.', loggedIn: false });
  }

  bcrypt.compare(password, user.password).then(response => {
    if (!response) {
      res.status(403).json({ loggedIn: false });
    }
  });
  const token = jwt.sign(
    { id: user.id, name: user.name, zipcode: user.zipcode },
    process.env.SECRET
  );
  res.json({ token, loggedIn: true });

  // check password
  // bcrypt.compare(password, user.password).then(isMatch => {
  //   if (isMatch) {
  //     // Create JWT Payload
  //     const payload = {
  //       id: user.id,
  //       name: user.name
  //     };
  //     // Sign token
  //     jwt.sign(
  //       { id: user.id },
  //       keys.secretOrKey,
  //       {
  //         expiresIn: 31459798
  //       },
  //       (err, token) => {
  //         res.json({
  //           success: true,
  //           token: 'Bearer ' + token,
  //           loggedIn: true
  //         });
  //       }
  //     );
  //   } else {
  //     return res
  //       .status(400)
  //       .json({ passwordincorrect: 'Password is incorrect.' });
  //   }
  //   // res.json({ token, loggedIn: true });
  // });
};

// forgot password
