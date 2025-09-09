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
