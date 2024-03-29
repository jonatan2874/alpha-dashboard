import { types } from "./types/types";

export const appReducer = (state, action) => {
  const { right_bar } = state; // Desestructurar state.right_bar
  const { type, payload } = action; // Desestructurar action.type y action.payload

  switch (type) {
    case types.right_bar.change:
      return {
        ...state,
        right_bar: {
          ...right_bar,
          show: true,
          content: payload.content,
        },
      };

    case types.right_bar.show:
      return {
        ...state,
        right_bar: {
          ...right_bar,
          show: !right_bar.show,
        },
      };

    // ALERT
    case types.alert.show:
      return {
        ...state,
        alert: {
          show: true,
          content: payload.content
        }
      }

    case types.alert.hide:
      return {
        ...state,
        alert: {
          ...alert,
          show: false
        }
      }

    // Otras acciones (si es necesario)

    default:
      return state;
  }
};
