// export function displayDate(data) {
//     const date = new Date(parseInt(data));
//     const dateNow = new Date();
//     const yearDif = dateNow.getFullYear() - date.getFullYear();
//     if (yearDif === 0) {
//         const dayDif = dateNow.getDate() - date.getDate();
//         if (dayDif === 0) {
//             const hourDif = dateNow.getHours() - date.getHours();
//             if (hourDif === 0) {
//                 const minutesDif = dateNow.getMinutes() - date.getMinutes();

//                 if (minutesDif >= 0 && minutesDif < 5) return "1 минуту назад";
//                 if (minutesDif >= 5 && minutesDif < 10) return "5 минут назад";
//                 if (minutesDif >= 10 && minutesDif < 30) {
//                     return "10 минут назад";
//                 }
//                 return "30 минут назад";
//             }
//             return `${date.getHours()}:${date.getMinutes()}`;
//         }

//         return date.toLocaleString("default", { month: "long", day: "numeric" });
//     }
//     return (
//         date.getFullYear() + "." + (date.getMonth() + 1) + "_" + date.getDate()
//     );
// }
export function displayDate(ms) {
    const date = new Date(ms);
    const currentDate = new Date();

    const yearDiff = currentDate.getFullYear() - date.getFullYear();

    if (yearDiff === 0) {
        const monthDiff = currentDate.getMonth() - date.getMonth();

        if (monthDiff === 0) {
            const dayDiff = currentDate.getDate() - date.getDate();

            if (dayDiff === 0) {
                const hourDiff = Math.floor((currentDate - date) / 3600000);

                if (hourDiff === 0) {
                    const minuteDiff = Math.floor((currentDate - date) / 60000);

                    if (minuteDiff === 0) {
                        return "только что";
                    } else if (minuteDiff === 1) {
                        return "минуту назад";
                    } else if (minuteDiff <= 5) {
                        return `${minuteDiff} минуты назад`;
                    } else if (minuteDiff <= 10) {
                        return `${minuteDiff} минут назад`;
                    } else {
                        return `${minuteDiff} минут назад`;
                    }
                } else {
                    return `${hourDiff} часов назад`;
                }
            } else {
                return `${date.getDate()} ${getMonthName(
                    date.getMonth()
                )} ${formatYear(
                    date.getFullYear(),
                    currentDate.getFullYear()
                )}`;
            }
        } else {
            return `${date.getDate()} ${getMonthName(
                date.getMonth()
            )} ${formatYear(date.getFullYear(), currentDate.getFullYear())}`;
        }
    } else {
        return `${date.getDate()} ${getMonthName(
            date.getMonth()
        )} ${date.getFullYear()}`;
    }
}

function formatYear(year, currentYear) {
    return year === currentYear ? "" : year;
}

function getMonthName(month) {
    const monthNames = [
        "января",
        "февраля",
        "марта",
        "апреля",
        "мая",
        "июня",
        "июля",
        "августа",
        "сентября",
        "октября",
        "ноября",
        "декабря"
    ];

    return monthNames[month];
}
