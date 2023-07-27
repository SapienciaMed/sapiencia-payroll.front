export function calculateDifferenceYear(dateInit: string | Date,dateEnd?:string | Date) {
    const currentDate = dateEnd ? new Date(dateEnd) : new Date();
    const differenceInMilliseconds =
      currentDate.getTime() - new Date(dateInit).getTime();
    const differenceInYears =
      differenceInMilliseconds / (24 * 60 * 60 * 1000 * 365);
    return Math.floor(differenceInYears);
  }

  export function calculateDifferenceDays(dateInit: string | Date,dateEnd?:string | Date) {
    const currentDate = dateEnd ? new Date(dateEnd) : new Date();
    const differenceInMilliseconds =
      currentDate.getTime() - new Date(dateInit).getTime();
    const differenceInDays =
      differenceInMilliseconds / (24 * 60 * 60 * 1000);
    return Math.floor(differenceInDays);
  }

  
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