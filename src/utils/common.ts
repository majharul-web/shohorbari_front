// get a string and return capitalized string
export const toCapitalizeString = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// return api response success or failure
export const isSuccess = (status: any): boolean => {
  if (status >= 200 && status <= 209) {
    return true;
  } else return false;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "2-digit",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options).replace(",", "");
};
