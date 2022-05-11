import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FiClock, FiPower } from 'react-icons/fi';
import { isToday, format, parseISO, isAfter } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import enGB from 'date-fns/locale/en-GB';
import DayPicker, { DayModifiers } from 'react-day-picker';
import { Link } from 'react-router-dom';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import { io, Socket } from 'socket.io-client';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  Calendar,
  NextAppointment,
  Section,
  Appointment,
} from './styles';
import 'react-day-picker/lib/style.css';
import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';
import { useTheme } from '../../hooks/theme';
import api from '../../services/api';
import './styles.css';
import { useToast } from '../../hooks/toast';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

interface Appointment {
  id: string;
  date: string;
  hourFormatted: string;
  user: {
    name: string;
    avatar_url: string;
  };
}

let socket: Socket;

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const { theme, switchTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const { addToast } = useToast();

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) setSelectedDate(day);
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  const handleSelect = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      i18n.changeLanguage(event.target.value);
    },
    [i18n],
  );

  const disabledDays = useMemo(() => {
    const dates = monthAvailability
      .filter((monthDay) => monthDay.available === false)
      .map((monthDay) => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        return new Date(year, month, monthDay.day);
      });

    return dates;
  }, [currentMonth, monthAvailability]);

  const selectedDateAsText = useMemo(
    () =>
      format(
        selectedDate,
        `'${t('pages.dashboard.day')}' dd '${t('pages.dashboard.de')}' MMMM`,
        {
          locale: i18n.language === 'pt' ? ptBR : enGB,
        },
      ),
    [i18n.language, selectedDate, t],
  );
  const selectedWeekDay = useMemo(
    () =>
      format(selectedDate, 'cccc', {
        locale: i18n.language === 'pt' ? ptBR : enGB,
      }),
    [i18n.language, selectedDate],
  );

  const morningAppointments = useMemo(
    () =>
      appointments.filter(
        (appointment) => parseISO(appointment.date).getHours() < 12,
      ),
    [appointments],
  );
  const afternoonAppointments = useMemo(
    () =>
      appointments.filter(
        (appointment) => parseISO(appointment.date).getHours() >= 12,
      ),
    [appointments],
  );

  useEffect(() => {
    api
      .get(`/providers/${user.id}/month-availability`, {
        params: {
          month: currentMonth.getMonth() + 1,
          year: currentMonth.getFullYear(),
        },
      })
      .then((response) => {
        setMonthAvailability(response.data);
      });
  }, [currentMonth, user.id]);

  useEffect(() => {
    api
      .get<Appointment[]>(`/appointments/me`, {
        params: {
          day: selectedDate.getDate(),
          month: selectedDate.getMonth() + 1,
          year: selectedDate.getFullYear(),
        },
      })
      .then((response) => {
        const appointmentsFormatted = response.data.map((appointment) => ({
          ...appointment,
          hourFormatted: format(parseISO(appointment.date), 'HH:mm'),
        }));

        setAppointments(appointmentsFormatted);
      });
  }, [selectedDate]);

  const nextAppointment = useMemo(
    () =>
      appointments.find((appointment) =>
        isAfter(parseISO(appointment.date), new Date()),
      ),
    [appointments],
  );

  useEffect(() => {
    try {
      socket = io(`${process.env.REACT_APP_URL}`, {
        transports: ['websocket'],
      });

      socket.emit('RegisterUserIdAndSocketId', {
        user_id: user.id,
        plataform: 'website',
        date: Date.now(),
      });

      socket.on('Notification', (data) => {
        console.log(`----> ${data.message}`);

        addToast({
          type: 'info',
          title: 'teste',
          description: data.message,
        });
      });
    } catch (error) {
      console.log('erro no socket-io');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />
          <Profile>
            {user.avatar_url && <img src={user.avatar_url} alt={user.name} />}
            <div>
              <span>{t('pages.dashboard.welcome')},</span>
              <Link
                to="/profile"
                onClick={() => {
                  socket.disconnect();
                }}
              >
                <strong>{user.name}</strong>
              </Link>
            </div>
          </Profile>
          <div>
            <Toggle
              style={{ marginLeft: 19 }}
              className="dark-mode-toggle"
              checked={theme === 'dark'}
              onChange={switchTheme}
              icons={{ checked: '🔆', unchecked: '🌙' }}
              aria-label="Dark mode toggle"
            />
            <select onChange={handleSelect} name="language" id="language">
              <option
                selected={
                  i18n.language === `${t('commun.languages.portuguese.code')}`
                }
                value={t('commun.languages.portuguese.code')}
              >
                {t('commun.languages.portuguese.text')}
              </option>
              <option
                selected={
                  i18n.language === `${t('commun.languages.english.code')}`
                }
                value={t('commun.languages.english.code')}
              >
                {t('commun.languages.english.text')}
              </option>
            </select>
            <button type="button" onClick={signOut}>
              <FiPower />
            </button>
          </div>
        </HeaderContent>
      </Header>
      <Content>
        <Schedule>
          <h1>{t('pages.dashboard.title')}</h1>
          <p>
            {isToday(selectedDate) && <span>{t('pages.dashboard.today')}</span>}
            <span>{selectedDateAsText}</span>
            <span>{selectedWeekDay}</span>
          </p>

          {isToday(selectedDate) && nextAppointment && (
            <NextAppointment>
              <strong>{t('pages.dashboard.nextAppointment')}</strong>
              <div>
                <img
                  src={nextAppointment.user.avatar_url}
                  alt={nextAppointment.user.name}
                />
                <strong>{nextAppointment.user.name}</strong>
                <span>
                  <FiClock />
                  {nextAppointment.hourFormatted}
                </span>
              </div>
            </NextAppointment>
          )}

          <Section>
            <strong>{t('pages.dashboard.morning')}</strong>

            {morningAppointments.length === 0 && (
              <p>{t('pages.dashboard.noAppointment')}</p>
            )}

            {morningAppointments.map((appointment) => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.hourFormatted}
                </span>
                <div>
                  <img
                    src={appointment.user.avatar_url}
                    alt={appointment.user.name}
                  />
                  <strong>{appointment.user.name}</strong>
                </div>
              </Appointment>
            ))}
          </Section>
          <Section>
            <strong>{t('pages.dashboard.afternoon')}</strong>
            {afternoonAppointments.length === 0 && (
              <p>{t('pages.dashboard.noAppointment')}</p>
            )}

            {afternoonAppointments.map((appointment) => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.hourFormatted}
                </span>
                <div>
                  <img
                    src={appointment.user.avatar_url}
                    alt={appointment.user.name}
                  />
                  <strong>{appointment.user.name}</strong>
                </div>
              </Appointment>
            ))}
          </Section>
        </Schedule>
        <Calendar>
          <DayPicker
            locale={i18n.language}
            weekdaysShort={t('pages.dashboard.daysOfWeekFirstLetter', {
              returnObjects: true,
            })}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] },
            }}
            onMonthChange={handleMonthChange}
            selectedDays={selectedDate}
            onDayClick={handleDateChange}
            months={t('pages.dashboard.months', { returnObjects: true })}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;
