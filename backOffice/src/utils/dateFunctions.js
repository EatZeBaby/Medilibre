// eslint-disable-next-line import/prefer-default-export
export const dateToString = (date) => {
  const newDate = new Date(date);
  return (
    `${newDate.getFullYear()}-${(`0${newDate.getMonth() + 1}`).substr(-2)}-${(`0${newDate.getDate()}`).substr(-2)}`
  );
};

export const getNextDays = (
  appointmentDelay,
  appointmentDuration,
  appointmentFrequency,
  futurAppointments,
  oppeningHours,
  oppeningDays,
) => {
  const days = [];
  // on recupere la liste des prochains jours (60)
  const today = Date.now();
  const startingDay = today + (appointmentDelay * 60000);
  // on cré une boucle de jours (+ 24h a chaque tour)
  for (let i = 0; i < 60; i += 1) {
    let day = new Date(startingDay + (86400000 * i));
    day = new Date(`${day.getFullYear()}-${(`0${day.getMonth() + 1}`).substr(-2)}-${day.getDate()} 00:00`);
    // on verifi si c'est un jour d'ouverture
    // on verifie si ce jour il y a des rendez-vous
    // on cré une variable isOpen qu'on initialise a false
    let isOpen = false;
    // on recupère la liste des rendez-vous du jour
    const dayAppointments = futurAppointments.filter((appointment) => {
      const startDay = day;
      const endDay = new Date(`${day.getFullYear()}-${(`0${day.getMonth() + 1}`).substr(-2)}-${day.getDate()} 23:59`);
      if ((appointment.startTime > startDay && appointment.endTime < endDay)
        || (appointment.startTime < startDay && appointment.endTime > endDay)
        || (appointment.startTime > startDay && appointment.startTime < endDay)
        || (appointment.endTime > startDay && appointment.endTime < endDay)
      ) {
        return true;
      }
      return false;
    });
    // on boucle sur la liste des horaires
    oppeningHours[day.getDay()].forEach((table) => {
      // pour chaque horaire on recupere le debut et la fin en timeStamp
      const start = new Date(`${day.getFullYear()}-${(`0${day.getMonth() + 1}`).substr(-2)}-${day.getDate()} ${table[0]}`);
      const end = new Date(`${day.getFullYear()}-${(`0${day.getMonth() + 1}`).substr(-2)}-${day.getDate()} ${table[1]}`);
      // on verifie chaque horaire de la plage d'horaire pour savoir s'il est libre
      const duration = appointmentDuration * 60000;
      // si il est libre alors on passe la variable isOpen a true
      for (
        let j = Date.parse(start);
        j < Date.parse(end) - duration;
        j += (appointmentFrequency * 60000
        )) {
        const now = Date.now();
        if (j < (now + (appointmentDelay * 60000))) {
          isOpen = false;
        }
        else {
          // on boucle les futur rendez-vous
          if ((dayAppointments.length < 1)) {
            isOpen = true;
          }
          let free = true;
          // le rendez-vous testé est - il dans un delai disponible
          dayAppointments.forEach((appointment) => {
            // le rendez-vous testté est itl disponible ?
            if (appointment.isHoliday) {
              console.log(j, appointment.startTime, (j + duration));
              if (
                ((j <= appointment.startTime) && (j + duration) > appointment.startTime)
                || ((j < appointment.endTime) && (j + duration) >= appointment.endTime)
                || ((j <= appointment.startTime)
                && (j + duration) >= appointment.endTime)
                || ((j >= appointment.startTime) && ((j < appointment.endTime)
                && (j + duration) < appointment.endTime)
                && (j + duration) >= appointment.startTime)
              ) {
                free = false;
              }
            }
            else if (
              ((j < appointment.starTime) && (j + duration) > appointment.starTime)
                || ((j < appointment.starTime) && (j + duration) > appointment.endTime)
                || ((j > appointment.starTime) && (j + duration) > appointment.endTime)
                || (((j > appointment.starTime) && (j < appointment.endTime)
                && ((j + duration) > appointment.startTime)
                && ((j + duration) < appointment.endTime)))
            ) {
              // on verifie si le rendez-vous est possible dans le delay prevu par le praticien
              free = false;
            }
          });
          if (free) {
            isOpen = true;
          }
        }
      }
    });
    // condition sur isOpen
    if (isOpen && oppeningDays[day.getDay()] === 1) {
      days.push(day);
    }
    day = new Date(startingDay + (86400000 * i));
  }
  return (days);
};

export const getDayAppointments = (
  inheritCurrentDay,
  appointmentDelay,
  appointmentDuration,
  appointmentFrequency,
  futurAppointments,
  oppeningHours,
) => {
  const currentDay = new Date(inheritCurrentDay);
  // on part du jour selectionné
  const currentDayAppointments = [];
  // ON RECUPRÈRE LA LISTE DES RENDEZ-VOUS DU JOUR
  const dayAppointments = futurAppointments.filter((appointment) => {
    const startDay = currentDay;
    const endDay = new Date(`${startDay.getFullYear()}-${(`0${startDay.getMonth() + 1}`).substr(-2)}-${startDay.getDate()} 23:59`);
    if ((appointment.startTime > startDay && appointment.endTime < endDay)
      || (appointment.startTime < startDay && appointment.endTime > endDay)
      || (appointment.startTime > startDay && appointment.startTime < endDay)
      || (appointment.endTime > startDay && appointment.endTime < endDay)
    ) {
      return true;
    }
    return false;
  });

  oppeningHours[currentDay.getDay()].forEach((table) => {
    // pour chaque horaire on recupere le debut et la fin en timeStamp
    const start = new Date(`${currentDay.getFullYear()}-${(`0${currentDay.getMonth() + 1}`).substr(-2)}-${currentDay.getDate()} ${table[0]}`);
    const end = new Date(`${currentDay.getFullYear()}-${(`0${currentDay.getMonth() + 1}`).substr(-2)}-${currentDay.getDate()} ${table[1]}`);
    // on verifie chaque horaire de la plage d'horaire pour savoir s'il est libre
    const duration = appointmentDuration * 60000;
    for (
      let j = Date.parse(start);
      j < Date.parse(end) - duration;
      j += (appointmentFrequency * 60000)
    ) {
      // pour chaque horaire du jour testé
      // si horaire avant le delai
      const now = Date.now();
      if (j >= (now + (appointmentDelay * 60000))) {
        let free = true;
        dayAppointments.forEach((appointment) => {
          // le rendez-vous testté est itl disponible ?
          if (appointment.isHoliday) {
            if (
              ((j <= appointment.startTime) && ((j + duration) > appointment.startTime))
              || ((j < appointment.endTime) && ((j + duration) >= appointment.endTime))
              || ((j <= appointment.startTime) && (j + duration) >= appointment.endTime)
              || ((j >= appointment.startTime) && ((j < appointment.endTime)
              && (j + duration) < appointment.endTime)
              && (j + duration) >= appointment.startTime)
            ) {
              free = false;
            }
            console.log((appointment.starTime));
          }
          else if (
            ((j >= appointment.startTime)
            && (j < appointment.startTime + (appointmentFrequency * 60000)))
              || (((j + (appointmentFrequency + 60000)) > appointment.startTime)
              && ((j + (appointmentFrequency + 60000))
              <= appointment.startTime + (appointmentFrequency * 60000)))
              || ((j < appointment.startTime)
              && ((j + (appointmentFrequency + 60000))
              > (appointment.startTime + (appointmentFrequency * 60000))))
          ) {
            // on verifie si le endez-vous est possible dans le delay prevu par le praticien
            free = false;
          }
          console.log(j, appointment.startTime, (j + duration), free, appointment.isHoliday);
        });
        if (free) {
          currentDayAppointments.push(new Date(j));
        }
      }
    }
  });
  return (currentDayAppointments);
};
