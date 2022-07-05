export type Date = {
  timeString: Function;
  hour: number;
  minute: number;
  seconds: number;
  twelveHourSplit?: Function;
};
export function pastDeadline(todoDeadline: string, currentTime: Date): boolean {
  if (todoDeadline === "") {
    return false;
  }
  function convertTo24HourFormat(todoDeadline: string): string {
    const AMorPM = todoDeadline.match(/(A|P)/gi)?.join();
    const removedAMPM = todoDeadline.replace(/(A|P)m$/gi, "");
    const time = removedAMPM.match(/\d+/gi);
    let hour, minute;
    if (time && typeof AMorPM !== "undefined") {
      hour = parseInt(time[0]);
      minute = time[1];
      if (AMorPM.toLowerCase() === "p" && hour < 12) {
        hour += 12;
      } else if (AMorPM.toLowerCase() === "a" && hour === 12) {
        hour = 0;
      }
    }
    return `${hour}:${minute}`;
  }
  function decompose(todoDeadline: string): {
    hour: number;
    minute: number;
    totalMinutes: number;
  } {
    let hour, minute;
    const hourMinuteArray = todoDeadline.match(/\d+/gi);
    if (hourMinuteArray) {
      [hour, minute] = hourMinuteArray;
    }
    if (typeof hour !== "undefined" && typeof minute !== "undefined") {
      const totalMinutes = parseInt(hour) * 60 + parseInt(minute);
      return {
        hour: parseInt(hour),
        minute: parseInt(minute),
        totalMinutes,
      };
    }
    return {
      hour: NaN,
      minute: NaN,
      totalMinutes: NaN,
    };
  }
  const convertedFormat =
    todoDeadline.search(/(A|P)m$/gi) !== -1
      ? convertTo24HourFormat(todoDeadline)
      : todoDeadline;
  const decomposeConvertedFormat = decompose(convertedFormat);
  if (
    currentTime.hour * 60 + currentTime.minute >=
    decomposeConvertedFormat.totalMinutes
  ) {
    return true;
  }
  return false;
}
export function currentTime(): { hour12: Date; hour24: Date } {
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
export const markAllAsUndone = (todoItems: { value: Todo[] }) => {
  return todoItems.value.map((todo: Todo) => {
    return {
      text: todo.text,
      deadline: todo.deadline,
      done: false,
      id: todo.id,
    };
  });
};
export const markAllAsDone = (todoItems: { value: Todo[] }): Todo[] => {
  return todoItems.value.map((todo: Todo) => {
    return {
      text: todo.text,
      deadline: todo.deadline,
      done: true,
      id: todo.id,
    };
  });
};
export type Todo = {
  deadline: string;
  done: boolean;
  id: number;
  text: string;
};
export interface LabelObject {
  hueSat:string,
  text:string,
}