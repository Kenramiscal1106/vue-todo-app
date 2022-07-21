import type { Date } from "./utils"

export function useLocalStorage(key:string) {
  const value = localStorage.getItem(key)
  const set = function(newValue:any) {localStorage.setItem(key, newValue)}
  return {
    value,
    set
  }
} 

export function useCurrentTime(): { hour12: Date; hour24: Date } {
  const time = new Date();
  const hour12: Date = {
    hour:
      time.getHours() > 12
        ? time.getHours() - 12
        : time.getHours() === 0
        ? 12
        : time.getHours(),
    minute: time.getMinutes(),
    seconds: time.getSeconds(),
    twelveHourSplit: function () {
      return time.getHours() < 12 ? "AM" : "PM";
    },
    timeString: function () {
      return `${this.hour}:${
        this.minute < 10 ? `0${this.minute}` : this.minute
      }:${this.seconds < 10 ? `0${this.seconds}` : this.seconds} ${
        typeof this.twelveHourSplit !== "undefined"
          ? this.twelveHourSplit()
          : ""
      }`;
    },
  };
  const hour24: Date = {
    hour: time.getHours(),
    minute: time.getMinutes(),
    seconds: time.getSeconds(),
    timeString: function () {
      return `${
        time.getHours() > 12 ? time.getHours() - 12 : time.getHours()
      }:${time.getMinutes()}:${time.getSeconds()}`;
    },
  };
  return {
    hour12,
    hour24,
  };
}