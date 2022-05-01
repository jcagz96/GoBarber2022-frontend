import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div``;

export const Header = styled.div`
  padding: 32px 0;
  background: ${(props) => props.theme.colors.secundary};
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  > img {
    height: 80px;
  }
  > div + div {
    margin-left: auto;
    display: flex;
    align-items: center;

    > div {
      margin: 10px;
    }
  }

  button {
    background: transparent;
    border: 0;
    svg {
      color: ${(props) => props.theme.colors.secondaryText};
      width: 20px;
      height: 20px;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: ${(props) => props.theme.colors.primaryText};
    }

    a {
      text-decoration: none;
      color: ${(props) => props.theme.colors.accent};

      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
`;
export const Schedule = styled.div`
  flex: 1;
  margin-right: 120px;

  hi {
    font-size: 36px;
  }

  p {
    margin-top: 8px;
    color: ${(props) => props.theme.colors.accent};

    span + span {
      margin-left: 8px;
      padding-left: 8px;
      border-left: 1px solid ${(props) => props.theme.colors.accent};
    }
  }
`;

export const NextAppointment = styled.aside`
  margin-top: 64px;

  strong {
    color: ${(props) => props.theme.colors.secondaryText};
    font-size: 20px;
    font-weight: 400;
  }

  div {
    background: ${(props) => props.theme.colors.divider};
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-top: 24px;
    position: relative;

    &::before {
      position: absolute;
      height: 80%;
      width: 1px;
      left: 0;
      top: 10%;
      content: '';
      background: ${(props) => props.theme.colors.accent};
    }

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }

    > strong {
      margin-left: 24px;
      color: ${(props) => props.theme.colors.text};
    }

    span {
      margin-left: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${(props) => props.theme.colors.secondaryText};
      svg {
        color: ${(props) => props.theme.colors.accent};
        margin-right: 8px;
      }
    }
  }
`;

export const Section = styled.section`
  margin-top: 48px;

  > strong {
    color: ${(props) => props.theme.colors.secondaryText};
    font-size: 20px;
    line-height: 26px;
    border-bottom: 1px solid ${(props) => props.theme.colors.divider};
    display: block;
    padding-bottom: 16px;
    margin-bottom: 16px;
  }
  > p {
    color: ${(props) => props.theme.colors.secondaryText};
  }
`;

export const Appointment = styled.div`
  display: flex;
  align-items: center;

  & + div {
    margin-top: 16px;
  }

  span {
    margin-left: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${(props) => props.theme.colors.secondaryText};
    width: 70px;
    svg {
      color: ${(props) => props.theme.colors.accent};
      margin-right: 8px;
    }
  }
  div {
    flex: 1;
    background: ${(props) => props.theme.colors.divider};
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-left: 24px;
    position: relative;

    img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
    }

    > strong {
      margin-left: 24px;
      color: ${(props) => props.theme.colors.text};
      font-size: 20px;
    }
  }
`;

export const Calendar = styled.aside`
  width: 380px;
  .DayPicker {
    background: ${(props) => props.theme.colors.secundary};
    border-radius: 10px;
  }
  .DayPicker-wrapper {
    padding-bottom: 0;
  }
  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }
  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px;
  }
  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }
  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: ${(props) => props.theme.colors.divider};
    border-radius: 10px;
    color: ${(props) => props.theme.colors.text};
  }
  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${(props) => shade(0.2, props.theme.colors.divider)};
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }
  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: ${(props) => props.theme.colors.accent} !important;
    border-radius: 10px;
    color: ${(props) => props.theme.colors.third} !important;
  }
`;
