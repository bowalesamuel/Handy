const INITIAL_STATE = {
  section: "latest",
  data: [],
};

const sectionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "TOGGLE_SECTION":
      console.log("Changing");
      return {
        ...state,
        section: action.data,
      };

    case "API_DATA":
      console.log("Saving");
      return {
        ...state,
        data: action.data,
      };
    case "FAVORITE":
      console.log("Liked...");
      return {
        ...state,
        data: data.map((item) =>
          item.id == action.id ? { ...item, like: !item.like } : item
        ),
      };
    default:
      return state;
  }

  return state;
};

export default sectionReducer;
