export const formatPhoneNumber = (value) => {
  value = value.replace(/[^\d+]/g, "");

  if (value.startsWith("+7")) {
    value =
      "+7" +
      value
        .substring(2)
        .replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, " $1 $2 $3 $4");
  } else if (value.startsWith("7") || value.startsWith("8")) {
    value =
      "+7" +
      value
        .substring(1)
        .replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, " $1 $2 $3 $4");
  }

  return value;
};
