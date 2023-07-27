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
  return Math.floor(differenceInDays);
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
