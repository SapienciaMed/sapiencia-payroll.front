export function calculateDifferenceYear(
  dateInit: string | Date,
  dateEnd?: string | Date
) {
  const currentDate = dateEnd ? new Date(dateEnd) : new Date();
  const differenceInMilliseconds =
    currentDate.getTime() - new Date(dateInit).getTime();
  const differenceInYears =
    differenceInMilliseconds / (24 * 60 * 60 * 1000 * 365);
  return Math.floor(differenceInYears);
}

export function calculateDifferenceDays(
  dateInit: string | Date,
  dateEnd?: string | Date
) {
  const currentDate = dateEnd ? new Date(dateEnd) : new Date();
  const differenceInMilliseconds =
    currentDate.getTime() - new Date(dateInit).getTime();
  const differenceInDays = differenceInMilliseconds / (24 * 60 * 60 * 1000);
  return Math.floor(differenceInDays);}


  
  export function calculateBusinessDays(startDate, endDate, holidays = []) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const oneDay = 24 * 60 * 60 * 1000;
    let businessDays = 0;
  
    while (start < end) {
      if (isBusinessDay(start) && !holidays.some((holiday) => isSameDay(holiday, start))) {
        businessDays++;
      }
      start.setTime(start.getTime() + oneDay);
    }
    
    return businessDays;
  }
  
  function isSameDay(date, nextDate) {
    return (
      date.getFullYear() === nextDate.getFullYear() &&
      date.getMonth() === nextDate.getMonth() &&
      date.getDate() === nextDate.getDate()
      );
    }
    function isBusinessDay(date) {
      const dayOfWeek = date.getDay(); // 0 (Sunday) to 6 (Saturday)
      return dayOfWeek !== 0 && dayOfWeek !== 6; // Excludes weekends (Saturday and Sunday)
    }

export function calculateMayorEdad(birthDate) {
  const birthDateFormated = new Date(birthDate);

  const age = calculateDifferenceYear(birthDateFormated);

  return age >= 18;
}

export function calculateLimiteEdad(birthDate) {
  const birthDateFormated = new Date(birthDate);

  const age = calculateDifferenceYear(birthDateFormated);

  return age < 80;
}

export function formaterNumberToCurrency(number) {
  const formatter = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 2,
  });

  return formatter.format(number);
}


export function addBusinessDays(startDate, daysToAdd, holidays = []) {
  const oneDay = 24 * 60 * 60 * 1000; // Un día en milisegundos
  let currentDate = new Date(startDate);

  // const isWeekend = (date) => {
  //   const dayOfWeek = date.getDay();
  //   return dayOfWeek === 0 || dayOfWeek === 6; // 0: Domingo, 6: Sábado
  // };

  const isHoliday = (date) => {
    const formattedDate = date.toISOString().slice(0, 10); // Formatear fecha como 'AAAA-MM-DD'
    return holidays.includes(formattedDate);
  };

  let daysAdded = 0;

  while (daysAdded < daysToAdd) {
    currentDate.setTime(currentDate.getTime() + oneDay);
    if (isBusinessDay(currentDate) && !isHoliday(currentDate)) {
      daysAdded++;
    }
  }

  return currentDate;
};
