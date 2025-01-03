import dayjs from "dayjs";

export const getGreetingMessage = () => {
  const hour = dayjs().hour();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
};