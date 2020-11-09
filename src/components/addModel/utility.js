export const getZipCode = (address) => {
  let zipCode = "";
  for (let i = 0; i < address.length; i++) {
    if (address[i].types[0] && "postal_code" === address[i].types[0]) {
      zipCode = address[i].long_name;
      return zipCode;
    }
  }
};

export const getState = (address) => {
  let state = "";
  for (let i = 0; i < address.length; i++) {
    if (
      address[i].types[0] &&
      "administrative_area_level_1" === address[i].types[0]
    ) {
      state = address[i].short_name;
      return state;
    }
  }
};

export const getCity = (address) => {
  let city = "";
  for (let i = 0; i < address.length; i++) {
    if (address[i].types[0] && "locality" === address[i].types[0]) {
      city = address[i].short_name;
      return city;
    }
  }
};

export const getShortAddress = (address) => {
  let shortAddress = "";
  let splittedArray = address.split(",");
  shortAddress = splittedArray[0];
  return shortAddress;
};
