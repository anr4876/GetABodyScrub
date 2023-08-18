import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { startOfMonth, startOfWeek, addDays, endOfMonth, isSameDay, subMonths, addMonths, format, } from 'date-fns';

const Calendar = ({ onClose }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const renderHeader = () => {
        const dateFormat = 'yyyy년 M월';

        return (
            <View style={styles.header}>
                <TouchableOpacity onPress={prevMonth}>
                    <Text style={styles.headerText}>{'  <  '}</Text>
                </TouchableOpacity>
                <Text style={styles.headerTextday}>{format(selectedDate, dateFormat)}</Text>
                <TouchableOpacity onPress={nextMonth}>
                    <Text style={styles.headerText}>{'  >  '}</Text>
                </TouchableOpacity>
            </View>
        );
    };
    const renderDaysOfWeek = () => {
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        return (
            <View style={styles.daysOfWeek}>
                {days.map((day, index) => {
                    let dayOfWeekTextStyle = styles.dayOfWeekText;
                    if (index === 0) {
                        dayOfWeekTextStyle = styles.dayOfWeekTextSunday;
                    } else if (index === 6) {
                        dayOfWeekTextStyle = styles.dayOfWeekTextSaturday;
                    }
                    return (
                        <Text key={day} style={dayOfWeekTextStyle}>
                            {day}
                        </Text>
                    );
                })}
            </View>
        );
    };

    const getMonthDates = () => {
        const monthStart = startOfMonth(selectedDate);
        const monthEnd = endOfMonth(selectedDate);
        const startDate = startOfWeek(monthStart);
        const endDate = addDays(monthEnd, 6 - monthEnd.getDay());
        const dates = [];
        let currentDate = startDate;

        while (currentDate <= endDate) {
            dates.push(currentDate);
            currentDate = addDays(currentDate, 1);
        }
        return dates;
    };

    const handleDatePress = (date) => {
        setSelectedDate(date);
    };

    const prevMonth = () => {
        setSelectedDate(subMonths(selectedDate, 1));
    };

    const nextMonth = () => {
        setSelectedDate(addMonths(selectedDate, 1));
    };

    const getDayStyle = (date) => {
        if (isSameDay(selectedDate, date)) {
            return styles.selectedDay;
        } else {
            return styles.day;
        }
    };

    const renderMonthDates = () => {
        const monthDates = getMonthDates();
        return monthDates.map((date, i) => {
            const currentMonth = date.getMonth() === selectedDate.getMonth();
            const dateStyle = currentMonth ? {} : styles.textColor;

            return (
                <TouchableOpacity
                    key={i}
                    style={getDayStyle(date)}
                    onPress={() => handleDatePress(date)}>
                    <Text style={dateStyle}>{date.getDate()}</Text>
                </TouchableOpacity>
            );
        });
    };

    return (
        <View>
            <View style={styles.topbar}>
                <TouchableOpacity onPress={onClose}>
                    <Text>X</Text>
                </TouchableOpacity>
                <Text >날짜선택</Text>
                <Text >초기화</Text>
            </View>
            <View>{renderHeader()}
                <View style={styles.container}>
                    {renderDaysOfWeek()}
                    <View style={styles.calendarBody}>{renderMonthDates()}</View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    //
    container: {
        borderWidth: 2,
        borderColor: '#872F2F',
        borderRadius: 30,
        marginHorizontal: 20,
        paddingBottom: 30,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginBottom: 10,
    },
    // 년,월 글씨폰트크기
    headerTextday: {
        fontSize: 13,
    },
    headerText: {
        fontSize: 30,
    },
    // 월~금 한글표시
    daysOfWeek: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    // 전체 요일 비율
    dayOfWeekText: {
        width: '14.2%',
        height: 100,
        paddingVertical: 20,
        textAlign: 'center',

    },

    // 토요일
    dayOfWeekTextSunday: {
        width: '14.2%',
        height: 100,
        paddingVertical: 20,
        textAlign: 'center',
        color: 'red',
    },
    // 일요일
    dayOfWeekTextSaturday: {
        width: '14.2%',
        height: 100,
        paddingVertical: 20,
        textAlign: 'center',
        color: 'red',
    },
    // 전체 바디
    calendarBody: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    day: {
        backgroundColor: '#FFF',
        width: '14.28%',
        height: '5.00%',
        justifyContent: "center",
        aspectRatio: 1,
        alignItems: 'center',
    },
    fontStyleColorOut: {
        color: 'lightgray',
        backgroundColor: 'red',
    },
    selectedDay: {
        backgroundColor: '#DFCFCF',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,      // 박스의 너비를 설정하세요
        height: 40,     // 박스의 높이를 설정하세요
        //margin: 6,      // 박스 주위에 여백을 만드세요. 원하는 크기에 맞게 조정하세요.
    },
    textColor: {
        color: 'transparent',
    },
    topbar: {
        marginTop: 1,
        justifyContent: 'flex-start', // 맨 위로 정렬
        flexDirection: 'row',
        display: "flex",
        justifyContent: "space-around",
    }
});

export default Calendar;
