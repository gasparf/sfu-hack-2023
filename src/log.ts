import { digitize } from "./time";

const log = (i: string, m: any) => {
  return;
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const milliseconds = date.getMilliseconds();
  const format =
    digitize(hours) +
    ":" +
    digitize(minutes) +
    ":" +
    digitize(seconds) +
    ":" +
    digitize(milliseconds);

  console.log("%c" + "[" + format + "]" + i, "color: green;");
  console.log(m);
};

export default log;
