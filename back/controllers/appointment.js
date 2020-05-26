/* eslint-disable no-unused-vars */
const { appointmentConfirmMail, appointmentCancelMail } = require('./mail');

const Appointment = require('../models/appointment');
const User = require('../models/user');

// method to create appointment
exports.createAppointment = (req, res, next) => {
  User.findOne({ 
    _id: req.body.userId,
    doctorId: req.body.doctorId,
   })
    .then((user) => {
      console.log(user);
      if (!user) {
        console.log('not user');
        User.updateOne({
          _id: req.body.userId,
        },
        {
         $push: { doctorId: req.body.doctorId }, 
        }).then((user) => {
          console.log(user);
        });
      }
    });
  console.log(req.body);
  const appointment = new Appointment({
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    free: req.body.free,
    userId: req.body.userId,
    isHoliday: req.body.isHoliday,
    doctorId: req.body.doctorId,
    isDomicile: req.body.isDomicile,
  });
  appointmentConfirmMail(appointment, req.body.userId);
  appointment.save().then(
    () => {
      res.status(201).json({
        appointment,
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error,
        body: req.body,
      });
    }
  );
};

// method to get user appointment
exports.getUserAppointment = (req, res, next) => {
  const userId = req.userId;
  Appointment.find({
    userId,
  }).sort({ startTime: -1 })
  .then((appointments) => {
    res.status(200).json(appointments);
  })
};

// method to get one appointment
exports.getOneAppointment = (req, res, next) => {
  Appointment.findOne({
    _id: req.params.id
  }).then(
    (appointment) => {
      res.status(200).json(appointment);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

// method to modify appointment
exports.modifyAppointment = (req, res, next) => {
  const appointement = new Appointment({
    _id: req.params.id,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    free: req.body.free,
    userId: req.body.userId
  });
  Appointment.updateOne({_id: req.params.id}, appointement).then(
    () => {
      res.status(201).json({
        appointement,
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

// method to delete appointment
exports.deleteAppointment = (req, res, next) => {
  Appointment.findOne({ _id: req.params.id })
    .then((appointment) => {
      Appointment.deleteOne({
        _id: req.params.id,
        userId: req.userId,
      }).then(
        () => {
          appointmentCancelMail(appointment, req.userId);
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
    });
};

// method to delete appointment
exports.deleteAppointmentAdmin = (req, res, next) => {
  Appointment.findOne({ _id: req.params.id })
    .then((appointment) => {
      Appointment.deleteOne({
        _id: req.params.id,
      }).then(
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
    });
};

// method to get all appointments
exports.getAllAppointments = (req, res, next) => {
  Appointment.find({
    doctorId: req.doctorId,
  }).then(
    (appointments) => {
      res.status(200).json(appointments);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

// method to get the futur free appointments 
exports.getAllFuturAppointments = (req,res, next) => {
  Appointment.find({
    startTime: { $gt : req.params.dateTime },
    free: false,
    doctorId: req.params.doctorId,
  }, {
    userId: 0,
  }).then(
    (appointments) => {
      res.status(200).json(appointments);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
}