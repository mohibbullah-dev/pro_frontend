const getRandomBg = () => {
  const colors = [
    "bg-[#f6b100]",
    "bg-[#025cca]",
    "bg-[#be3e3f]",
    "bg-[#02ca3a]",
    "bg-[#007E6E]",
  ];

  let color = colors[Math.floor(Math.random() * colors.length)];
  return color;
};

const getBgColor = () => {
  const colors = ["#8A0194", "#0D542B", "#71717B", "#82181A", "#193CB8"];

  const color = colors[Math.floor(Math.random() * colors.length)];

  return color;
};

const getAvaterName = (name) => {
  if (!name) return "";
  const avatar = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
  return avatar;
};

const formateDate = (date) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return `${months[date.getMonth()]} ${String(date.getDate()).padStart(
    2,
    "0"
  )}, ${date.getFullYear()}`;
};

const formatTime = (date) =>
  `${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes()
  ).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;

export { getRandomBg, getBgColor, getAvaterName, formateDate, formatTime };
