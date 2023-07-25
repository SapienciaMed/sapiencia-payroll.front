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