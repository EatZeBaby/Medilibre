/* eslint-disable no-unused-vars */

const Doctor = require('../models/doctor');
const AdminForget = require('../models/adminForget');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const mail = require('../controllers/mail');
const fileupload = require('express-fileupload');


exports.renewPassword = (req, res, next) => {
  console.log(req.body);
  AdminForget.findOne({
    token: req.body.renewToken,
  })
  .then((forget) => {
    const now = Date.now();
    if (now > forget.expirationDate) {
      res.status(400).json({ error: 'erreur'});
    }
    else {
      Doctor.findOne({
        email: forget.email,
      })
        .then((doctor) => {
          console.log(doctor);
          if (doctor === null) {
            res.status(400).json({ error: 'erreur'});
          }
          bcrypt.hash(req.body.password, 10)
            .then((hash) => {
              Doctor.updateOne({
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
  .catch((error) => {
    res.status(400).json({ 
      error: 'erreur',
      message: error,
    });
  })
}

exports.forgotPassword = (req, res, next) => {
  Doctor.findOne({
    email: req.body.email,
  })
    .then((doctor) => {
      const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      const expirationDate = Date.now() + 3600000;
      const forget = new AdminForget({
        email: req.body.email,
        token,
        expirationDate,
      });
      forget.save()
        .then(() => {
          mail.adminForgetPassword(req.body.email, token, req.body.url);
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

exports.uploadAvatar = (req, res, next) => {
  fileupload();
  const avatar = req.files.file;
  const path =  `${__dirname}/../avatar/${req.doctorId}.jpeg` ;
  avatar.mv(path, (error) => {
    if (error) {
      console.error(error)
      res.writeHead(500, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify({ status: 'error', message: error }))
      return
    }

    res.writeHead(200, {
      'Content-Type': 'application/json'
    })
    Doctor.updateOne({_id: req.doctorId} , { avatar: `/avatar/${req.doctorId}.jpeg` })
      .then((doctor) => {
        res.end(JSON.stringify({ status: 'success', path: `/avatar/${req.doctorId}.jpeg` }))
      })
  })



}

// method to check if user is logged
exports.checkIsLogged = (req, res, next) => {
  Doctor.findOne({
    _id: req.doctorId,
  },
  {
    password: 0,
  }).then((doctor) => {
    if (!doctor) {
      res.status(401).json({
        error: 'utilisteur non trouvé !',
      });
    }
    else {
      res.status(200).json({
        doctor, 
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
  console.log(req.body.email.trim().toLowerCase());
  Doctor.findOne({ email: req.body.email.trim().toLowerCase() })
    .then((doctor) => {
      if (!doctor) {
        return res.status(401).json({
          error: 'utilisateur non trouvé',
        });
      }
      bcrypt.compare(req.body.password, doctor.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({
              error: 'mot de passe incorrect',
            });
          }
          res.status(200).json({
            doctorId: doctor._id,
            token: jwt.sign(
              { doctorId: doctor._id },
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

// method to create parameter
exports.createDoctor = (req, res, next) => {
  Doctor.find({
    _id: req.doctorId,
    superAdmin: true,
  })
    .then((adminDoctor) => {
      if (adminDoctor) {
        bcrypt.hash(req.body.password, 10)
          .then((hash) => {
            const doctor = new Doctor({
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              job: req.body.job,
              civility: req.body.civility,
              appointmentFrequency: req.body.appointmentFrequency,
              appointmentDuration: req.body.appointmentDuration,
              appointmentDelay: req.body.appointmentDelay,
              oppeningHours: req.body.oppeningHours,
              oppeningDays: req.body.oppeningDays,
              password: hash,
              email: req.body.email,
              adress: req.body.adress,
              zip: req.body.zip,
              city: req.body.city,
              publicEmail: req.body.publicEmail,
              phone: req.body.phone,
              startPlanning: req.body.startPlanning,
              endPlanning: req.body.endPlanning,
              presentation: req.body.presentation,
              slug: req.body.slug,
              superAdmin: req.body.superAdmin,
              onlineAppointment: false,
            });
            console.log(hash);
            console.log(doctor);
            doctor.save().then(
              () => {
                res.status(201).json({
                  doctor,
                });
              }
            ).catch(
              (error) => {
                res.status(400).json({
                  error: error
                });
              }
            );
          }).catch((error) => {
            res.status(500).json({
              error,
            });
          });
      }
      else {
        res.status(500).json({
          error: 'erreur',
        });
      }
    });
};

// method to get one parameter
exports.getOneDoctor = (req, res, next) => {
  Doctor.findOne({
    _id: req.params.id
  }).then(
    (doctor) => {
      res.status(200).json(doctor);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

// method to get one doctor by id without password
exports.getDoctorById = (req, res, next) => {
  Doctor.findOne({
    _id: req.params.id
  },
  {
    password: 0,
    email: 0,
  }).then(
    (doctor) => {
      res.status(200).json(doctor);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

// method to get one doctor by id without password
exports.getDoctorBySlug = (req, res, next) => {
  Doctor.findOne({
    slug: req.params.slug
  },
  {
    password: 0,
    email: 0,
  }).then(
    (doctor) => {
      res.status(200).json(doctor);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

// method to modify parameter
exports.modifyDoctor = (req, res, next) => {
  const doctor = new Doctor({
    _id: req.params.id,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    job: req.body.job,
    civility: req.body.civility,
    appointmentFrequency: req.body.appointmentFrequency,
    appointmentDuration: req.body.appointmentDuration,
    appointmentDelay: req.body.appointmentDelay,
    oppeningHours: req.body.oppeningHours,
    oppeningDays: req.body.oppeningDays,
    email: req.body.email,
    adress: req.body.adress,
    zip: req.body.zip,
    city: req.body.city,
    publicEmail: req.body.publicEmail,
    phone: req.body.phone,
    startPlanning: req.body.startPlanning,
    endPlanning: req.body.endPlanning,
    presentation: req.body.presentation,
    onlineAppointment: req.body.onlineAppointment,
    groupSessions: req.body.groupSessions,
    groupSize: req.body.groupSize,
    appointmentPeriod: req.body.appointmentPeriod,
  });
  console.log(doctor);
  Doctor.updateOne({_id: req.params.id}, doctor).then(
    () => {
      res.status(201).json({
        doctor,
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
  if (req.body.password.length > 5) {
    bcrypt.hash(req.body.password, 10)
      .then((hash) => {
        const doctor = new Doctor({
          _id: req.params.id,
          password: hash,
        });
        console.log(doctor);
        Doctor.updateOne({_id: req.params.id}, doctor).then(
          () => {
            res.status(201).json({
              doctor,
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

// method to delete parameter
exports.deleteDoctor = (req, res, next) => {
  Doctor.deleteOne({_id: req.params.id}).then(
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

exports.getAllDoctors = (req, res, next) => {
  Doctor.find({},{
    password: 0,
    email: 0,
  }).then(
    (doctors) => {
      res.status(200).json(doctors);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};