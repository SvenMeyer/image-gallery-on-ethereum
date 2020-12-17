// Action creators

/// @param url which goes into the inputURL field
export const setInputURL = url => {
  return {
    type: "SET_INPUT_URL",
    payload: url
  };
};

/// @param caption which goes into the inputCaption field
export const setInputCaption = caption => {
  return {
    type: "SET_INPUT_CAPTION",
    payload: caption
  };
};

/// @param url of item to be added
/// @param caption of item to be added
export const addItem = (url, caption) => {
  return {
    type: "ADD_ITEM",
    payload: { url, caption }
  };
};

/// @param ext is file extension to set filter for
/// @param status = true shows images with specified extension
export const setFilter = (ext, status) => {
  return {
    type: "SET_FILTER",
    payload: { [ext]: status }
  };
};

/// @param sort defines the sort order of the list
export const setSort = sort => {
  return {
    type: "SET_SORT",
    payload: sort
  };
};
