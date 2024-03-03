import moment from "moment";

export function format(date: string, pattern = 'DD/MM/YYYY hh:mm') {
  return moment(date, ["MM-DD-YYYY", "YYYY-MM-DD"]).format(pattern);
}
