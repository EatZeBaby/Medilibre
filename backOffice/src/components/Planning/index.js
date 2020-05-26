import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Calendar,
  momentLocalizer,
  Views,
} from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pt-br';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import Dialog from '@material-ui/core/Dialog';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import LuxonUtils from '@date-io/luxon';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';


import Modal from 'src/containers/Planning/Modal';
import ModifyModal from 'src/containers/Planning/ModifyModal';

import './planning.scss';

const DragAndDropCalendar = withDragAndDrop(Calendar);

moment.locale('fr');

const localizer = momentLocalizer(moment);

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

const Planning = ({
  getAllDoctorAppointments,
  appointments,
  setAdminPageFields,
  doctorDatas,
  openModal,
  openModifyModal,
  modifySelectedAppointment,
  loading,
}) => {
  useEffect(() => {
    getAllDoctorAppointments();
  }, []);

  const min = new Date(doctorDatas.startPlanning);
  const max = new Date(doctorDatas.endPlanning);
  const moveEvent = ({
    event,
    start,
    end,
    isAllDay: droppedOnAllDaySlot,
  }) => {
    const events = appointments;

    const idx = events.indexOf(event);
    let { allDay } = event;

    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true;
    }
    else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false;
    }
    const updatedEvent = {
      ...event,
      start,
      end,
      allDay,
    };
    const nextEvents = [...appointments];
    nextEvents.splice(idx, 1, updatedEvent);
    setAdminPageFields('appointments', nextEvents);
    setAdminPageFields('modifiedAppointmentStart', new Date(updatedEvent.start));
    setAdminPageFields('modifiedAppointmentEnd', new Date(updatedEvent.end));
    setAdminPageFields('modifiedAppointmentUserId', updatedEvent.userId);
    setAdminPageFields('modifiedAppointmentId', updatedEvent.id);
    modifySelectedAppointment();
  };

  const resizeEvent = ({
    event,
    start,
    end,
    isAllDay: droppedOnAllDaySlot,
  }) => {
    const events = appointments;
    let { allDay } = event;

    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true;
    }
    else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false;
    }
    const updatedEvent = {
      ...event,
      start,
      end,
      allDay,
    };
    const nextEvents = events.map((existingEvent) => (
      existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent
    ));

    setAdminPageFields('appointments', nextEvents);
    setAdminPageFields('modifiedAppointmentStart', new Date(updatedEvent.start));
    setAdminPageFields('modifiedAppointmentEnd', new Date(updatedEvent.end));
    setAdminPageFields('modifiedAppointmentUserId', updatedEvent.userId);
    setAdminPageFields('modifiedAppointmentId', updatedEvent.id);
    modifySelectedAppointment();
  };

  // eslint-disable-next-line no-unused-vars
  const eventStyle = (event, start, end) => {
    let backgroundColor = '#242a67';
    if (event.isHoliday) {
      backgroundColor = '#92140C';
    }
    if (event.isDomicile) {
      backgroundColor = '#505385';
    }
    const style = {
      backgroundColor,
      borderColor: '#fff',
      padding: '.3rem',
      textAlign: 'center',
    };
    return {
      style,
    };
  };

  return (
    <div className="planning">
      <div className="planning-calendar">
        {!loading && (
          <DragAndDropCalendar
            selectable
            resizable
            messages={{
              day: 'Jour',
              week: 'Semaine',
              today: 'Aujourd\'hui',
              previous: '<',
              next: '>',
            }}
            showMultiDayTimes
            onEventDrop={moveEvent}
            onEventResize={resizeEvent}
            eventPropGetter={eventStyle}
            localizer={localizer}
            views={['week', 'day']}
            step={doctorDatas.appointmentFrequency}
            timeslots={1}
            events={appointments}
            defaultView={Views.WEEK}
            startAccessor="start"
            endAccessor="end"
            min={min}
            max={max}
            onSelectSlot={({ start, end }) => {
              setAdminPageFields('newAppointmentStart', start);
              const dif = Date.parse(end) - Date.parse(start);
              if ((dif / 60000) < doctorDatas.appointmentDuration) {
                const newEnd = new Date(
                  Date.parse(start) + (doctorDatas.appointmentDuration * 60000),
                );
                setAdminPageFields('newAppointmentEnd', newEnd);
              }
              else {
                setAdminPageFields('newAppointmentEnd', end);
              }
              setAdminPageFields('openModal', true);
            }}
            onSelectEvent={(event) => {
              setAdminPageFields('selectedEvent', event);
              setAdminPageFields('openModifyModal', true);
            }}
          />

        )}
      </div>
      <Dialog
        open={openModal}
        onClose={() => {
          setAdminPageFields('openModal', false);
        }}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <MuiPickersUtilsProvider utils={LuxonUtils}>
          <Modal />
        </MuiPickersUtilsProvider>
      </Dialog>
      <Dialog
        open={openModifyModal}
        onClose={() => {
          setAdminPageFields('openModifyModal', false);
        }}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <MuiPickersUtilsProvider utils={LuxonUtils}>
          <ModifyModal />
        </MuiPickersUtilsProvider>
      </Dialog>

    </div>
  );
};

Planning.propTypes = {
  getAllDoctorAppointments: PropTypes.func.isRequired,
  appointments: PropTypes.array.isRequired,
  setAdminPageFields: PropTypes.func.isRequired,
  doctorDatas: PropTypes.object.isRequired,
  openModal: PropTypes.bool.isRequired,
  openModifyModal: PropTypes.bool.isRequired,
  modifySelectedAppointment: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Planning;
