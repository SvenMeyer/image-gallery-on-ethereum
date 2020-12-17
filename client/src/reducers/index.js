import { combineReducers } from "redux";

const imagesReducer = (images = [], action) => {
  if (action.type === "ADD_IMAGE") {
    return [...images, action.payload];
  } else return images;
};

const inputURLReducer = (url = "", action) => {
  if (action.type === "SET_INPUT_URL") {
    return action.payload;
  } else return url;
};

const inputCaptionReducer = (caption = "", action) => {
  if (action.type === "SET_INPUT_CAPTION") {
    return action.payload;
  } else return caption;
};

const filterReducer = (
  filterList = { jpg: true, png: true, gif: true, mp4: true },
  action
) => {
  if (action.type === "SET_FILTER") {
    return { ...filterList, ...action.payload }; // update filter selection
  } else return filterList;
};

const sortReducer = (sort = null, action) => {
  if (action.type === "SET_SORT") {
    return action.payload;
  } else return sort;
};

export default combineReducers({
  images: imagesReducer,
  filters: filterReducer,
  sort: sortReducer,
  inputURL: inputURLReducer,
  inputCaption: inputCaptionReducer
});
