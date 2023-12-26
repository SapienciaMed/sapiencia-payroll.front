import axios, { AxiosResponse, AxiosError } from "axios";

const token = localStorage.getItem("token");
// Realiza la petición POST utilizando Axios
export const postRequest = async (apiUrl, userData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      permissions: token,
    },
  };
  const res = await axios
    .post(`${process.env.urlApiPayroll}${apiUrl}`, userData, config)
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch((error: AxiosError) => {
      if (error.response) {
        console.error("Error de respuesta:", error.response.data);
        return error.response.data;
      } else if (error.request) {
        console.error("Error de solicitud:", error.request);
        return error.request;
      } else {
        console.error("Error:", error.message);
        return error.message;
      }
    });
  return res;
};
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
  const differenceInDays = differenceInMilliseconds / (24 * 60 * 60 * 1000) + 1;
  return Math.floor(differenceInDays);
}
//para meses de 30 dias
export function calculateDifferenceAdjustDays(
  dateInit: string | Date,
  dateEnd?: string | Date
) {
  // Convertir fechas a timestamps
  const timestampInicio = new Date(dateInit).getTime();
  const timestampFin = new Date(dateEnd).getTime();

  // Calcular la diferencia en milisegundos
  let diferenciaEnMilisegundos = timestampFin - timestampInicio;

  // Calcular la diferencia en días
  let diferenciaEnDias = Math.floor(
    diferenciaEnMilisegundos / (1000 * 60 * 60 * 24)
  );

  // Iterar sobre los días y restar 1 por cada día 31
  for (let i = 0; i <= diferenciaEnDias; i++) {
    const fechaActual = new Date(timestampInicio + i * 24 * 60 * 60 * 1000);
    const diaDelMes = fechaActual.getDate();

    if (diaDelMes === 31) {
      diferenciaEnDias--;
    }
  }

  return diferenciaEnDias;
}

export function calculateMonthBetweenDates(
  fechaInicioDate: string | Date,
  fechaFinDate: string | Date
): number {
  const dateStart = new Date(fechaInicioDate);
  const dateEnd = new Date(fechaFinDate);

  // Verifica si las cadenas de texto son fechas válidas
  if (isNaN(dateStart.getTime()) || isNaN(dateEnd.getTime())) {
    throw new Error("Formato de fecha no válido");
  }

  const yearInicio = dateStart.getFullYear();
  const monthInicio = dateStart.getMonth();
  const yearFin = dateEnd.getFullYear();
  const monthFin = dateEnd.getMonth();

  if (yearInicio === yearFin && monthInicio === monthFin) {
    return 1;
  }

  const meses = (yearFin - yearInicio) * 12 + (monthFin - monthInicio);

  return meses + 1;
}

export function addCalendarDays(date, daysToAdd, substractionOneDay = true) {
  if (substractionOneDay) {
    const oneDay = 24 * 60 * 60 * 1000;
    const inputDate = new Date(date);
    const newDate = new Date(inputDate.getTime() + (daysToAdd - 1) * oneDay);

    return newDate;
  } else {
    const oneDay = 24 * 60 * 60 * 1000;
    const inputDate = new Date(date);
    const newDate = new Date(inputDate.getTime() + daysToAdd * oneDay);

    return newDate;
  }
}

export function calculateBusinessDays(startDate, endDate, holidays = []) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const oneDay = 24 * 60 * 60 * 1000;
  let businessDays = 0;

  // Incluye el último día en el cálculo si es hábil y no es festivo
  while (start <= end) {
    if (
      isBusinessDay(start) &&
      !holidays.some((holiday) => isSameDay(holiday, start))
    ) {
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

export function formaterDate(date: string) {
  if (date) {
    let completeDate = date.split("T")[0];
    let year = completeDate.split("-")[0];
    let month = completeDate.split("-")[1];
    let day = completeDate.split("-")[2];

    return `${day}/${month}/${year}`;
  }
  return "";
}

export function addBusinessDays(startDate, daysToAdd, holidays = []) {
  const oneDay = 24 * 60 * 60 * 1000; // Un día en milisegundos
  let currentDate = new Date(startDate);

  const isHoliday = (date) => {
    const formattedDate = date.toISOString().slice(0, 10); // Formatear fecha como 'AAAA-MM-DD'
    return holidays.includes(formattedDate);
  };

  let daysAdded = 0;

  while (daysAdded < daysToAdd) {
    if (isBusinessDay(currentDate) && !isHoliday(currentDate)) {
      daysAdded++;
    }
    if (daysAdded < daysToAdd) {
      currentDate.setTime(currentDate.getTime() + oneDay);
    }
  }

  return currentDate;
}

export function removeEmptySpace(phrase: string) {
  if (!phrase) {
    return "";
  }
  const wordsArray = phrase.split(" ");
  return wordsArray.filter((word) => word !== "");
}

export function calculateIncrement(
  valueOriginal: number,
  percentageValue: number
) {
  const factorIncrement: number = percentageValue / 100;

  const increment: number = valueOriginal * factorIncrement;

  const newValue: number = valueOriginal + increment;

  return newValue;
}

export function caculatePorcentual(valueOriginal: number, valueNew: number) {
  const porcentajeAumento: number =
    ((valueNew - valueOriginal) / valueOriginal) * 100;

  return porcentajeAumento;
}

export function descargarArchivo(buffer: number[], nombreArchivo: string) {
  const bufferConvert = new Uint8Array(buffer); // Convierte el Array del búfer en Uint8Array
  const blob = new Blob([bufferConvert]);
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = nombreArchivo;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
}
