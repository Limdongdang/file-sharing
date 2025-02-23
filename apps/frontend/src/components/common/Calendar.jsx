import { addDays } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';

const StyledDatePicker = styled(DatePicker)`
  width: auto;
  height: 24px;
  border-radius: 4px;
  border-width: 1px;
  padding: 4px;
  border-color: #303030;
  background-color: transparent;
  line-height: 100%;
`;

const Calendar = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onDateChange(date);
  }

  return (
    <StyledDatePicker
      locale={ko}
      dateFormat='yyyy.MM.dd'
      shouldCloseOnSelect
      className='datePicker'
      minDate={new Date()}
      maxDate={addDays(new Date(), 7)}
      selected={selectedDate}
      onChange={handleDateChange}
    />
  );
};

export default Calendar;