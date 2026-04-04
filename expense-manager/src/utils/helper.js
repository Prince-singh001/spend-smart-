export const validateEmail = (email) => {
  if (!email) return false;

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return regex.test(email.trim());
};

export const getInitials = (name) => {
  if (!name) return "";

  const words = name.trim().split(" ").filter(Boolean);
  let initials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }

  return initials.toUpperCase();
};

export const addThousandsSeparator = (num) => {
  if (num === null || num === undefined) return "";

  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const prepareExpenseBarChartData = (data = []) => {
  return data.map((item) => ({
    category: item?.category || "",
    amount: item?.amount || 0,
  }));
};

export const prepareIncomeBarChartData = (data = []) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );

  const chartData = sortedData.map((item) => ({
    month: new Date(item.date).toLocaleString("default", {
      month: "short",
    }),
    amount: item?.amount || 0,
    source: item?.source || item?.category || "",
  }));

  return chartData;
};
