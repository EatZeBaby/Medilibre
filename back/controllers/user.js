const { userForgetPassword, newUserConfirmMail, modifyUserDatasMail } = require('./mail');
const UserForget = require('../models/userForget');

/* eslint-disable no-unused-vars */

const User = require('../models/user');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// method to check if user is logged
exports.checkIsLogged = (req, res, next) => {
  User.findOne({
    _id: req.body.userId,
  },
  {
    password: 0,
  }).then((user) => {
    if (!user) {
      res.status(401).json({
        error: 'utilisteur non trouvé !',
      });
    }
    else {
      res.status(200).json({
        user, 
      });
    }
  })
  .catch(() => {
    res.status(401).json({
      error: 'utilisateur non connecté',
    });
  });
}

//method to login
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email.trim().toLowerCase() })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          error: 'utilisateur non trouvé',
        });
      }
      bcrypt.compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({
              error: 'mot de passe incorrect',
            });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { UserId: user._id },
              'RANDOM_TOKEN_SECRET_KEY',
              { expiresIn: '24h' },
            )
          });
        })
        .catch((error) => {
          res.status(500).json({
            error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        error,
      });
    });
};

//method to signin
exports.signin = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        active: true,
        email: req.body.email.trim().toLowerCase(),
        password: hash,
        status: req.body.status,
        doctorId: [req.body.doctorId],
      });
      user.save()
        .then((user) => {
          res.status(201).json({
            message: 'Utilisateur bien créé.',
          });
          newUserConfirmMail(user);
        })
        .catch((error) => {
          res.status(400).json({
            error
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        error,
      });
    });

}

// method to create newUser
exports.createUser = (req, res, next) => {
  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    phone: req.body.phone,
    active: req.body.active,
    status: req.body.status,
    doctorId: [req.body.doctorId],
  });
  user.save().then(
    () => {
      res.status(201).json({
        user,
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error,
      });
    }
  );
};

// method to get one user (with password)
exports.getOneUser = (req, res, next) => {
  User.findOne({
    _id: req.params.id
  }).then(
    (user) => {
      res.status(200).json(user);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

// method to get one user without password
exports.getUserById = (req, res, next) => {
  User.findOne({
    _id: req.params.id,
  },
  {
    password: 0,
  }).then(
    (user) => {
      res.status(200).json(user);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

// method to modify user
exports.modifyUser = (req, res, next) => {
  const user = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    phone: req.body.phone,
  };
  User.updateOne({_id: req.userId}, user).then(
    () => {
      res.status(201).json({
        user,
      });
      modifyUserDatasMail(req.userId);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

// method to modify user ADMIN
exports.modifyUserAdmin = (req, res, next) => {
  const oldUser = User.find({_id: req.params.id});
  console.log ('old route');
  const user = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    phone: req.body.phone,
  };
  console.log(user);
  User.updateOne({_id: req.params.id}, user).then(
    () => {
      res.status(201).json({
        user,
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.modifyPassword = (req,res,next) => {
  console.log('modification du mot de passe');
  if (req.body.password.length > 5) {
    bcrypt.hash(req.body.password, 10)
      .then((hash) => {
        const user = new User({
          _id: req.userId,
          password: hash,
        });
        console.log('blob',user);
        User.updateOne({_id: req.userId}, user).then(
          () => {
            res.status(201).json({
              user,
            });
          }
        ).catch(
          (error) => {
            res.status(400).json({
              error: error
            });
          }
        );
      })
      .catch((error) => {
        res.status(400).json({
          error,
        })
      });
  }
  else {
    res.status(400).json({
      error: 'mot de passe trop court',
      password: req.body.password,
    });
  }
}

exports.forgotPassword = (req, res, next) => {
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      console.log(user);
      const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      const expirationDate = Date.now() + 3600000;
      const forget = new UserForget({
        email: req.body.email,
        token,
        expirationDate,
      });
      forget.save()
        .then(() => {
          console.log(req.body.url);
          userForgetPassword(req.body.email, token, req.body.url);
        });
      res.status(201).json({
        message: 'ok',
      });
    })
    .catch(() => {
      res.status(201).json({
        message: 'ok',
      });
    });
}

exports.renewPassword = (req, res, next) => {
  UserForget.findOne({
    token: req.body.renewToken,
  })
  .then((forget) => {
    const now = Date.now();
    if (now > forget.expirationDate) {
      res.status(400).json({ error: 'erreur'});
    }
    else {
      User.findOne({
        email: forget.email,
      })
        .then((user) => {
          console.log(user);
          if (user === null) {
            res.status(400).json({ error: 'erreur'});
          }
          bcrypt.hash(req.body.password, 10)
            .then((hash) => {
              User.updateOne({
                email: forget.email
              },
              {
                password: hash,
              })
              .then(() => {
                forget.delete();
                res.status(200).json({ error: 'erreur'});
              })
              .catch(() => {
                res.status(400).json({ error: 'erreur'});
              });
            }).catch(() => {
              res.status(400).json({ error: 'erreur'});
            });
        }).catch(() => {
          res.status(400).json({ error: 'erreur'});
        });
    }
  })
  .catch(() => {
    res.status(400).json({ error: 'erreur'});
  })
}

// method to delete user
exports.deleteUser = (req, res, next) => {
  User.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.getAllUsers = (req, res, next) => {
  User.find({
    doctorId: req.doctorId,
  }).then(
    (users) => {
      res.status(200).json(users);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};