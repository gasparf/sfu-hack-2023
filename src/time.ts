import moment from "moment";

// Transorm the week from number to string
export const transform_week_to_string = (week) =>
  [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ][parseInt(week)];

// Transform the month from number to string
export const transform_month_to_string = (month) =>
  [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ][parseInt(month)];

// Extract the week from the date
export const get_week_of_date = (day, month, year) =>
  new Date(moment().year(year).month(month).date(day).toISOString()).getDay();

// Extract the week from date formatted scheme: DD-MM-YYYY
export const formatted_get_week_of_date = (date) => {
  const unformat = extract_data_from_date(date);
  return get_week_of_date(unformat[0], unformat[1], unformat[2]);
};

// Format date: DD-MM-YYYY
export const transform_date_to_string = (day, month, year) =>
  `${digitize(day)}-${digitize(month)}-${year}`;

// Unformat date
export function extract_data_from_date(date: string) {
  if (date.length !== 10)
    throw Error("Unvalid date format. Should be DD-MM-YYYY");

  return [
    date[0] + date[1],
    date[3] + date[4],
    date[6] + date[7] + date[8] + date[9],
  ];
}

// Get formatted today date: DD-MM-YYYY
export const todayDate = () => {
  const date = new Date();
  const id_date = transform_date_to_string(
    date.getDate(),
    date.getMonth(),
    date.getFullYear()
  );

  return id_date;
};

// Setup the required zeros for the date
export const digitize = (n) => ((n.toString().length < 2 && "0") || "") + n;