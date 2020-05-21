const formatOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
};

const Utils = {
  Date: {
    format: (d: Date, options?: Intl.DateTimeFormatOptions | undefined) => {
      return d.toLocaleTimeString("en-US", {
        ...formatOptions,
        ...options,
      });
    },

    formatShort: (d: Date): string => {
      const hours = d.getHours() % 12 || 12;
      const ampm = d.getHours() >= 12 ? "PM" : "AM";
      return (
        "" +
        (d.getMonth() + 1) +
        "/" +
        d.getDate() +
        "/" +
        d.getFullYear() +
        " " +
        hours +
        ":" +
        d.getMinutes() +
        " " +
        ampm
      );
    },
  },
};

export default Utils;
