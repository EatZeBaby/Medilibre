// fichier de test pour src/utils/selectors

// on importe la syntaxe should
import { should } from 'chai';

// import de la fonction à tester
import { getNextDays, getDayAppointments } from '../src/utils/dateFunctions';

// données de test pour les recettes => on met ce qu'on veut dedans
import { oppeningHours, oppeningDays } from './dateFunctionsData';

// spécificité de should : il faut l'exécuter une première fois pour pouvoir l'utiliser
should();

/* describe décrit un bloc de test, 2 paramètres :
  - un texte qui décrit le bloc
  - une callback qui permet d'exécuter les tests pour ce bloc
*/
const appointmentDelay = 1440;
const appointmentDuration = 30;
const appointmentFrequency = 30;
let futurAppointments = [{}];
const appointmentPeriod = 60;

describe('dateFunctions', () => {
  describe('function getNextDays', () => {
    it('is a function', () => {
      getNextDays.should.be.a('function');
    });

    it('return array', () => {
      const groupSessions = false;
      const groupSize = 1;
      const currentDate = new Date('2020/12/31 00:00');
      getNextDays(
        currentDate,
        appointmentDelay,
        appointmentDuration,
        appointmentFrequency,
        appointmentPeriod,
        futurAppointments,
        oppeningHours,
        oppeningDays,
        groupSessions,
        groupSize,
      ).should.be.an('array');
    });

    it('return good day list', () => {
      const groupSessions = false;
      const groupSize = 1;
      const currentDate = Date.parse(new Date('2020/12/31 00:01'));
      getNextDays(
        currentDate,
        appointmentDelay,
        appointmentDuration,
        appointmentFrequency,
        appointmentPeriod,
        futurAppointments,
        oppeningHours,
        oppeningDays,
        groupSessions,
        groupSize,
      ).should.be.deep.equal([
        new Date('2021/01/01 00:00'),
        new Date('2021/01/02 00:00'),
        new Date('2021/01/03 00:00'),
        new Date('2021/01/04 00:00'),
        new Date('2021/01/05 00:00'),
        new Date('2021/01/06 00:00'),
        new Date('2021/01/07 00:00'),
        new Date('2021/01/08 00:00'),
        new Date('2021/01/09 00:00'),
        new Date('2021/01/10 00:00'),
        new Date('2021/01/11 00:00'),
        new Date('2021/01/12 00:00'),
        new Date('2021/01/13 00:00'),
        new Date('2021/01/14 00:00'),
        new Date('2021/01/15 00:00'),
        new Date('2021/01/16 00:00'),
        new Date('2021/01/17 00:00'),
        new Date('2021/01/18 00:00'),
        new Date('2021/01/19 00:00'),
        new Date('2021/01/20 00:00'),
        new Date('2021/01/21 00:00'),
        new Date('2021/01/22 00:00'),
        new Date('2021/01/23 00:00'),
        new Date('2021/01/24 00:00'),
        new Date('2021/01/25 00:00'),
        new Date('2021/01/26 00:00'),
        new Date('2021/01/27 00:00'),
        new Date('2021/01/28 00:00'),
        new Date('2021/01/29 00:00'),
        new Date('2021/01/30 00:00'),
        new Date('2021/01/31 00:00'),
        new Date('2021/02/01 00:00'),
        new Date('2021/02/02 00:00'),
        new Date('2021/02/03 00:00'),
        new Date('2021/02/04 00:00'),
        new Date('2021/02/05 00:00'),
        new Date('2021/02/06 00:00'),
        new Date('2021/02/07 00:00'),
        new Date('2021/02/08 00:00'),
        new Date('2021/02/09 00:00'),
        new Date('2021/02/10 00:00'),
        new Date('2021/02/11 00:00'),
        new Date('2021/02/12 00:00'),
        new Date('2021/02/13 00:00'),
        new Date('2021/02/14 00:00'),
        new Date('2021/02/15 00:00'),
        new Date('2021/02/16 00:00'),
        new Date('2021/02/17 00:00'),
        new Date('2021/02/18 00:00'),
        new Date('2021/02/19 00:00'),
        new Date('2021/02/20 00:00'),
        new Date('2021/02/21 00:00'),
        new Date('2021/02/22 00:00'),
        new Date('2021/02/23 00:00'),
        new Date('2021/02/24 00:00'),
        new Date('2021/02/25 00:00'),
        new Date('2021/02/26 00:00'),
        new Date('2021/02/27 00:00'),
        new Date('2021/02/28 00:00'),
        new Date('2021/03/01 00:00'),
        new Date('2021/03/02 00:00'),
      ]);
    });

    it('return just oppenning days', () => {
      const groupSessions = false;
      const groupSize = 1;
      const currentDate = Date.parse(new Date('2020/12/31 00:01'));
      const newOppeningDays = ['0', '1', '1', '0', '1', '1', '0'];

      getNextDays(
        currentDate,
        appointmentDelay,
        appointmentDuration,
        appointmentFrequency,
        appointmentPeriod,
        futurAppointments,
        oppeningHours,
        newOppeningDays,
        groupSessions,
        groupSize,
      ).should.be.deep.equal([
        new Date('2021/01/01 00:00'),
        new Date('2021/01/04 00:00'),
        new Date('2021/01/05 00:00'),
        new Date('2021/01/07 00:00'),
        new Date('2021/01/08 00:00'),
        new Date('2021/01/11 00:00'),
        new Date('2021/01/12 00:00'),
        new Date('2021/01/14 00:00'),
        new Date('2021/01/15 00:00'),
        new Date('2021/01/18 00:00'),
        new Date('2021/01/19 00:00'),
        new Date('2021/01/21 00:00'),
        new Date('2021/01/22 00:00'),
        new Date('2021/01/25 00:00'),
        new Date('2021/01/26 00:00'),
        new Date('2021/01/28 00:00'),
        new Date('2021/01/29 00:00'),
        new Date('2021/02/01 00:00'),
        new Date('2021/02/02 00:00'),
        new Date('2021/02/04 00:00'),
        new Date('2021/02/05 00:00'),
        new Date('2021/02/08 00:00'),
        new Date('2021/02/09 00:00'),
        new Date('2021/02/11 00:00'),
        new Date('2021/02/12 00:00'),
        new Date('2021/02/15 00:00'),
        new Date('2021/02/16 00:00'),
        new Date('2021/02/18 00:00'),
        new Date('2021/02/19 00:00'),
        new Date('2021/02/22 00:00'),
        new Date('2021/02/23 00:00'),
        new Date('2021/02/25 00:00'),
        new Date('2021/02/26 00:00'),
        new Date('2021/03/01 00:00'),
        new Date('2021/03/02 00:00'),
      ]);
    });

    it('don\'t return holiday\'s day', () => {
      const groupSessions = false;
      const groupSize = 1;
      const currentDate = Date.parse(new Date('2020/12/31 00:01'));
      futurAppointments = [
        {
          free: false,
          isHoliday: true,
          startTime: Date.parse(new Date('2021/01/02 00:00')),
          endTime: Date.parse(new Date('2021/01/03 00:00')),
        },
      ];
      getNextDays(
        currentDate,
        appointmentDelay,
        appointmentDuration,
        appointmentFrequency,
        appointmentPeriod,
        futurAppointments,
        oppeningHours,
        oppeningDays,
        groupSessions,
        groupSize,
      ).should.be.deep.equal([
        new Date('2021/01/01 00:00'),
        new Date('2021/01/03 00:00'),
        new Date('2021/01/04 00:00'),
        new Date('2021/01/05 00:00'),
        new Date('2021/01/06 00:00'),
        new Date('2021/01/07 00:00'),
        new Date('2021/01/08 00:00'),
        new Date('2021/01/09 00:00'),
        new Date('2021/01/10 00:00'),
        new Date('2021/01/11 00:00'),
        new Date('2021/01/12 00:00'),
        new Date('2021/01/13 00:00'),
        new Date('2021/01/14 00:00'),
        new Date('2021/01/15 00:00'),
        new Date('2021/01/16 00:00'),
        new Date('2021/01/17 00:00'),
        new Date('2021/01/18 00:00'),
        new Date('2021/01/19 00:00'),
        new Date('2021/01/20 00:00'),
        new Date('2021/01/21 00:00'),
        new Date('2021/01/22 00:00'),
        new Date('2021/01/23 00:00'),
        new Date('2021/01/24 00:00'),
        new Date('2021/01/25 00:00'),
        new Date('2021/01/26 00:00'),
        new Date('2021/01/27 00:00'),
        new Date('2021/01/28 00:00'),
        new Date('2021/01/29 00:00'),
        new Date('2021/01/30 00:00'),
        new Date('2021/01/31 00:00'),
        new Date('2021/02/01 00:00'),
        new Date('2021/02/02 00:00'),
        new Date('2021/02/03 00:00'),
        new Date('2021/02/04 00:00'),
        new Date('2021/02/05 00:00'),
        new Date('2021/02/06 00:00'),
        new Date('2021/02/07 00:00'),
        new Date('2021/02/08 00:00'),
        new Date('2021/02/09 00:00'),
        new Date('2021/02/10 00:00'),
        new Date('2021/02/11 00:00'),
        new Date('2021/02/12 00:00'),
        new Date('2021/02/13 00:00'),
        new Date('2021/02/14 00:00'),
        new Date('2021/02/15 00:00'),
        new Date('2021/02/16 00:00'),
        new Date('2021/02/17 00:00'),
        new Date('2021/02/18 00:00'),
        new Date('2021/02/19 00:00'),
        new Date('2021/02/20 00:00'),
        new Date('2021/02/21 00:00'),
        new Date('2021/02/22 00:00'),
        new Date('2021/02/23 00:00'),
        new Date('2021/02/24 00:00'),
        new Date('2021/02/25 00:00'),
        new Date('2021/02/26 00:00'),
        new Date('2021/02/27 00:00'),
        new Date('2021/02/28 00:00'),
        new Date('2021/03/01 00:00'),
        new Date('2021/03/02 00:00'),
      ]);
    });

    it('don\'t return a full appointment\'s day', () => {
      const groupSessions = false;
      const groupSize = 1;
      const currentDate = Date.parse(new Date('2020/12/31 00:01'));
      futurAppointments = [
        {
          free: false,
          isHoliday: false,
          startTime: Date.parse(new Date('2021/01/02 00:00')),
          endTime: Date.parse(new Date('2021/01/03 00:00')),
        },
      ];
      getNextDays(
        currentDate,
        appointmentDelay,
        appointmentDuration,
        appointmentFrequency,
        appointmentPeriod,
        futurAppointments,
        oppeningHours,
        oppeningDays,
        groupSessions,
        groupSize,
      ).should.be.deep.equal([
        new Date('2021/01/01 00:00'),
        new Date('2021/01/03 00:00'),
        new Date('2021/01/04 00:00'),
        new Date('2021/01/05 00:00'),
        new Date('2021/01/06 00:00'),
        new Date('2021/01/07 00:00'),
        new Date('2021/01/08 00:00'),
        new Date('2021/01/09 00:00'),
        new Date('2021/01/10 00:00'),
        new Date('2021/01/11 00:00'),
        new Date('2021/01/12 00:00'),
        new Date('2021/01/13 00:00'),
        new Date('2021/01/14 00:00'),
        new Date('2021/01/15 00:00'),
        new Date('2021/01/16 00:00'),
        new Date('2021/01/17 00:00'),
        new Date('2021/01/18 00:00'),
        new Date('2021/01/19 00:00'),
        new Date('2021/01/20 00:00'),
        new Date('2021/01/21 00:00'),
        new Date('2021/01/22 00:00'),
        new Date('2021/01/23 00:00'),
        new Date('2021/01/24 00:00'),
        new Date('2021/01/25 00:00'),
        new Date('2021/01/26 00:00'),
        new Date('2021/01/27 00:00'),
        new Date('2021/01/28 00:00'),
        new Date('2021/01/29 00:00'),
        new Date('2021/01/30 00:00'),
        new Date('2021/01/31 00:00'),
        new Date('2021/02/01 00:00'),
        new Date('2021/02/02 00:00'),
        new Date('2021/02/03 00:00'),
        new Date('2021/02/04 00:00'),
        new Date('2021/02/05 00:00'),
        new Date('2021/02/06 00:00'),
        new Date('2021/02/07 00:00'),
        new Date('2021/02/08 00:00'),
        new Date('2021/02/09 00:00'),
        new Date('2021/02/10 00:00'),
        new Date('2021/02/11 00:00'),
        new Date('2021/02/12 00:00'),
        new Date('2021/02/13 00:00'),
        new Date('2021/02/14 00:00'),
        new Date('2021/02/15 00:00'),
        new Date('2021/02/16 00:00'),
        new Date('2021/02/17 00:00'),
        new Date('2021/02/18 00:00'),
        new Date('2021/02/19 00:00'),
        new Date('2021/02/20 00:00'),
        new Date('2021/02/21 00:00'),
        new Date('2021/02/22 00:00'),
        new Date('2021/02/23 00:00'),
        new Date('2021/02/24 00:00'),
        new Date('2021/02/25 00:00'),
        new Date('2021/02/26 00:00'),
        new Date('2021/02/27 00:00'),
        new Date('2021/02/28 00:00'),
        new Date('2021/03/01 00:00'),
        new Date('2021/03/02 00:00'),
      ]);
    });

    it('let the day open if group session allow and number is agree', () => {
      const groupSessions = true;
      const groupSize = 2;
      const currentDate = Date.parse(new Date('2020/12/31 00:01'));
      futurAppointments = [
        {
          free: false,
          isHoliday: false,
          startTime: Date.parse(new Date('2021/01/02 00:00')),
          endTime: Date.parse(new Date('2021/01/03 00:00')),
        },
      ];
      getNextDays(
        currentDate,
        appointmentDelay,
        appointmentDuration,
        appointmentFrequency,
        appointmentPeriod,
        futurAppointments,
        oppeningHours,
        oppeningDays,
        groupSessions,
        groupSize,
      ).should.be.deep.equal([
        new Date('2021/01/01 00:00'),
        new Date('2021/01/02 00:00'),
        new Date('2021/01/03 00:00'),
        new Date('2021/01/04 00:00'),
        new Date('2021/01/05 00:00'),
        new Date('2021/01/06 00:00'),
        new Date('2021/01/07 00:00'),
        new Date('2021/01/08 00:00'),
        new Date('2021/01/09 00:00'),
        new Date('2021/01/10 00:00'),
        new Date('2021/01/11 00:00'),
        new Date('2021/01/12 00:00'),
        new Date('2021/01/13 00:00'),
        new Date('2021/01/14 00:00'),
        new Date('2021/01/15 00:00'),
        new Date('2021/01/16 00:00'),
        new Date('2021/01/17 00:00'),
        new Date('2021/01/18 00:00'),
        new Date('2021/01/19 00:00'),
        new Date('2021/01/20 00:00'),
        new Date('2021/01/21 00:00'),
        new Date('2021/01/22 00:00'),
        new Date('2021/01/23 00:00'),
        new Date('2021/01/24 00:00'),
        new Date('2021/01/25 00:00'),
        new Date('2021/01/26 00:00'),
        new Date('2021/01/27 00:00'),
        new Date('2021/01/28 00:00'),
        new Date('2021/01/29 00:00'),
        new Date('2021/01/30 00:00'),
        new Date('2021/01/31 00:00'),
        new Date('2021/02/01 00:00'),
        new Date('2021/02/02 00:00'),
        new Date('2021/02/03 00:00'),
        new Date('2021/02/04 00:00'),
        new Date('2021/02/05 00:00'),
        new Date('2021/02/06 00:00'),
        new Date('2021/02/07 00:00'),
        new Date('2021/02/08 00:00'),
        new Date('2021/02/09 00:00'),
        new Date('2021/02/10 00:00'),
        new Date('2021/02/11 00:00'),
        new Date('2021/02/12 00:00'),
        new Date('2021/02/13 00:00'),
        new Date('2021/02/14 00:00'),
        new Date('2021/02/15 00:00'),
        new Date('2021/02/16 00:00'),
        new Date('2021/02/17 00:00'),
        new Date('2021/02/18 00:00'),
        new Date('2021/02/19 00:00'),
        new Date('2021/02/20 00:00'),
        new Date('2021/02/21 00:00'),
        new Date('2021/02/22 00:00'),
        new Date('2021/02/23 00:00'),
        new Date('2021/02/24 00:00'),
        new Date('2021/02/25 00:00'),
        new Date('2021/02/26 00:00'),
        new Date('2021/02/27 00:00'),
        new Date('2021/02/28 00:00'),
        new Date('2021/03/01 00:00'),
        new Date('2021/03/02 00:00'),
      ]);
    });

    it('session group allow but holiday block the day', () => {
      const groupSessions = true;
      const groupSize = 2;
      const currentDate = Date.parse(new Date('2020/12/31 00:01'));
      futurAppointments = [
        {
          free: false,
          isHoliday: true,
          startTime: Date.parse(new Date('2021/01/02 00:00')),
          endTime: Date.parse(new Date('2021/01/03 00:00')),
        },
      ];
      getNextDays(
        currentDate,
        appointmentDelay,
        appointmentDuration,
        appointmentFrequency,
        appointmentPeriod,
        futurAppointments,
        oppeningHours,
        oppeningDays,
        groupSessions,
        groupSize,
      ).should.be.deep.equal([
        new Date('2021/01/01 00:00'),
        new Date('2021/01/03 00:00'),
        new Date('2021/01/04 00:00'),
        new Date('2021/01/05 00:00'),
        new Date('2021/01/06 00:00'),
        new Date('2021/01/07 00:00'),
        new Date('2021/01/08 00:00'),
        new Date('2021/01/09 00:00'),
        new Date('2021/01/10 00:00'),
        new Date('2021/01/11 00:00'),
        new Date('2021/01/12 00:00'),
        new Date('2021/01/13 00:00'),
        new Date('2021/01/14 00:00'),
        new Date('2021/01/15 00:00'),
        new Date('2021/01/16 00:00'),
        new Date('2021/01/17 00:00'),
        new Date('2021/01/18 00:00'),
        new Date('2021/01/19 00:00'),
        new Date('2021/01/20 00:00'),
        new Date('2021/01/21 00:00'),
        new Date('2021/01/22 00:00'),
        new Date('2021/01/23 00:00'),
        new Date('2021/01/24 00:00'),
        new Date('2021/01/25 00:00'),
        new Date('2021/01/26 00:00'),
        new Date('2021/01/27 00:00'),
        new Date('2021/01/28 00:00'),
        new Date('2021/01/29 00:00'),
        new Date('2021/01/30 00:00'),
        new Date('2021/01/31 00:00'),
        new Date('2021/02/01 00:00'),
        new Date('2021/02/02 00:00'),
        new Date('2021/02/03 00:00'),
        new Date('2021/02/04 00:00'),
        new Date('2021/02/05 00:00'),
        new Date('2021/02/06 00:00'),
        new Date('2021/02/07 00:00'),
        new Date('2021/02/08 00:00'),
        new Date('2021/02/09 00:00'),
        new Date('2021/02/10 00:00'),
        new Date('2021/02/11 00:00'),
        new Date('2021/02/12 00:00'),
        new Date('2021/02/13 00:00'),
        new Date('2021/02/14 00:00'),
        new Date('2021/02/15 00:00'),
        new Date('2021/02/16 00:00'),
        new Date('2021/02/17 00:00'),
        new Date('2021/02/18 00:00'),
        new Date('2021/02/19 00:00'),
        new Date('2021/02/20 00:00'),
        new Date('2021/02/21 00:00'),
        new Date('2021/02/22 00:00'),
        new Date('2021/02/23 00:00'),
        new Date('2021/02/24 00:00'),
        new Date('2021/02/25 00:00'),
        new Date('2021/02/26 00:00'),
        new Date('2021/02/27 00:00'),
        new Date('2021/02/28 00:00'),
        new Date('2021/03/01 00:00'),
        new Date('2021/03/02 00:00'),
      ]);
    });
  });

  describe('function getDayAppointments', () => {
    it('is a function', () => {
      getDayAppointments.should.be.a('function');
    });
    it('return hours List', () => {
      const inheritCurrentDay = Date.parse('2030/01/01 00:01');
      futurAppointments = [
        {
          endTime: 1590399900000,
          free: false,
          isHoliday: false,
          startTime: 1590397200000,
        },
      ];
      const groupSessions = false;
      const groupSize = 1;
      getDayAppointments(
        inheritCurrentDay,
        appointmentDelay,
        appointmentDuration,
        appointmentFrequency,
        futurAppointments,
        oppeningHours,
        groupSessions,
        groupSize,
      ).should.be.deep.equal([
        new Date('2030/01/01 08:00'),
        new Date('2030/01/01 08:30'),
        new Date('2030/01/01 09:00'),
        new Date('2030/01/01 09:30'),
        new Date('2030/01/01 10:00'),
        new Date('2030/01/01 10:30'),
        new Date('2030/01/01 11:00'),
        new Date('2030/01/01 11:30'),
        new Date('2030/01/01 14:00'),
        new Date('2030/01/01 14:30'),
        new Date('2030/01/01 15:00'),
        new Date('2030/01/01 15:30'),
        new Date('2030/01/01 16:00'),
        new Date('2030/01/01 16:30'),
        new Date('2030/01/01 17:00'),
        new Date('2030/01/01 17:30'),
        new Date('2030/01/01 18:00'),
        new Date('2030/01/01 18:30'),
      ]);
    });
    it('do not return appointment time', () => {
      const inheritCurrentDay = Date.parse('2030/01/01 00:00');
      futurAppointments = [
        {
          free: false,
          isHoliday: false,
          startTime: Date.parse('2030/01/01 09:00'),
          endTime: Date.parse('2030/01/01 09:30'),
        },
      ];
      const groupSessions = false;
      const groupSize = 1;
      getDayAppointments(
        inheritCurrentDay,
        appointmentDelay,
        appointmentDuration,
        appointmentFrequency,
        futurAppointments,
        oppeningHours,
        groupSessions,
        groupSize,
      ).should.be.deep.equal([
        new Date('2030/01/01 08:00'),
        new Date('2030/01/01 08:30'),
        new Date('2030/01/01 09:30'),
        new Date('2030/01/01 10:00'),
        new Date('2030/01/01 10:30'),
        new Date('2030/01/01 11:00'),
        new Date('2030/01/01 11:30'),
        new Date('2030/01/01 14:00'),
        new Date('2030/01/01 14:30'),
        new Date('2030/01/01 15:00'),
        new Date('2030/01/01 15:30'),
        new Date('2030/01/01 16:00'),
        new Date('2030/01/01 16:30'),
        new Date('2030/01/01 17:00'),
        new Date('2030/01/01 17:30'),
        new Date('2030/01/01 18:00'),
        new Date('2030/01/01 18:30'),
      ]);
    });
    it('holidays block the days', () => {
      const inheritCurrentDay = Date.parse('2030/01/01 00:00');
      futurAppointments = [
        {
          free: false,
          isHoliday: true,
          startTime: Date.parse('2030/01/01 09:00'),
          endTime: Date.parse('2030/01/01 11:30'),
        },
      ];
      const groupSessions = false;
      const groupSize = 1;
      getDayAppointments(
        inheritCurrentDay,
        appointmentDelay,
        appointmentDuration,
        appointmentFrequency,
        futurAppointments,
        oppeningHours,
        groupSessions,
        groupSize,
      ).should.be.deep.equal([
        new Date('2030/01/01 08:00'),
        new Date('2030/01/01 08:30'),
        new Date('2030/01/01 11:30'),
        new Date('2030/01/01 14:00'),
        new Date('2030/01/01 14:30'),
        new Date('2030/01/01 15:00'),
        new Date('2030/01/01 15:30'),
        new Date('2030/01/01 16:00'),
        new Date('2030/01/01 16:30'),
        new Date('2030/01/01 17:00'),
        new Date('2030/01/01 17:30'),
        new Date('2030/01/01 18:00'),
        new Date('2030/01/01 18:30'),
      ]);
    });
    it('one appointment block two slots', () => {
      const inheritCurrentDay = Date.parse('2030/01/01 00:00');
      futurAppointments = [
        {
          free: false,
          isHoliday: false,
          startTime: Date.parse('2030/01/01 09:15'),
          endTime: Date.parse('2030/01/01 09:45'),
        },
      ];
      const groupSessions = false;
      const groupSize = 1;
      getDayAppointments(
        inheritCurrentDay,
        appointmentDelay,
        appointmentDuration,
        appointmentFrequency,
        futurAppointments,
        oppeningHours,
        groupSessions,
        groupSize,
      ).should.be.deep.equal([
        new Date('2030/01/01 08:00'),
        new Date('2030/01/01 08:30'),
        new Date('2030/01/01 10:00'),
        new Date('2030/01/01 10:30'),
        new Date('2030/01/01 11:00'),
        new Date('2030/01/01 11:30'),
        new Date('2030/01/01 14:00'),
        new Date('2030/01/01 14:30'),
        new Date('2030/01/01 15:00'),
        new Date('2030/01/01 15:30'),
        new Date('2030/01/01 16:00'),
        new Date('2030/01/01 16:30'),
        new Date('2030/01/01 17:00'),
        new Date('2030/01/01 17:30'),
        new Date('2030/01/01 18:00'),
        new Date('2030/01/01 18:30'),
      ]);
    });
    it('group size allow 2 patients in the same slot', () => {
      const inheritCurrentDay = Date.parse('2030/01/01 00:00');
      futurAppointments = [
        {
          free: false,
          isHoliday: false,
          startTime: Date.parse('2030/01/01 09:00'),
          endTime: Date.parse('2030/01/01 09:30'),
        },
      ];
      const groupSessions = true;
      const groupSize = 2;
      getDayAppointments(
        inheritCurrentDay,
        appointmentDelay,
        appointmentDuration,
        appointmentFrequency,
        futurAppointments,
        oppeningHours,
        groupSessions,
        groupSize,
      ).should.be.deep.equal([
        new Date('2030/01/01 08:00'),
        new Date('2030/01/01 08:30'),
        new Date('2030/01/01 09:00'),
        new Date('2030/01/01 09:30'),
        new Date('2030/01/01 10:00'),
        new Date('2030/01/01 10:30'),
        new Date('2030/01/01 11:00'),
        new Date('2030/01/01 11:30'),
        new Date('2030/01/01 14:00'),
        new Date('2030/01/01 14:30'),
        new Date('2030/01/01 15:00'),
        new Date('2030/01/01 15:30'),
        new Date('2030/01/01 16:00'),
        new Date('2030/01/01 16:30'),
        new Date('2030/01/01 17:00'),
        new Date('2030/01/01 17:30'),
        new Date('2030/01/01 18:00'),
        new Date('2030/01/01 18:30'),
      ]);
    });
    it('patient group size 2 block the slot', () => {
      const inheritCurrentDay = Date.parse('2030/01/01 00:00');
      futurAppointments = [
        {
          free: false,
          isHoliday: false,
          startTime: Date.parse('2030/01/01 09:00'),
          endTime: Date.parse('2030/01/01 09:30'),
        },
        {
          free: false,
          isHoliday: false,
          startTime: Date.parse('2030/01/01 09:00'),
          endTime: Date.parse('2030/01/01 09:30'),
        },
      ];
      const groupSessions = true;
      const groupSize = 2;
      getDayAppointments(
        inheritCurrentDay,
        appointmentDelay,
        appointmentDuration,
        appointmentFrequency,
        futurAppointments,
        oppeningHours,
        groupSessions,
        groupSize,
      ).should.be.deep.equal([
        new Date('2030/01/01 08:00'),
        new Date('2030/01/01 08:30'),
        new Date('2030/01/01 09:30'),
        new Date('2030/01/01 10:00'),
        new Date('2030/01/01 10:30'),
        new Date('2030/01/01 11:00'),
        new Date('2030/01/01 11:30'),
        new Date('2030/01/01 14:00'),
        new Date('2030/01/01 14:30'),
        new Date('2030/01/01 15:00'),
        new Date('2030/01/01 15:30'),
        new Date('2030/01/01 16:00'),
        new Date('2030/01/01 16:30'),
        new Date('2030/01/01 17:00'),
        new Date('2030/01/01 17:30'),
        new Date('2030/01/01 18:00'),
        new Date('2030/01/01 18:30'),
      ]);
    });
  });
});
