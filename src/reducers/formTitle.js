const initialState = {
};

export default function title (state = initialState, action) {

  switch (action.type) {
    case 'INPUT_FIELD_CHANGED':
      return {...state, name: action.payload };

    default:
      return state;
  }

}