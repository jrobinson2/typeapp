import * as types from "../../constants";

export type SetThemeType = {
  type: typeof types.THEME_SET;
  payload: string;
};
export function setTheme(value: string): SetThemeType {
  return {
    type: types.THEME_SET,
    payload: value,
  };
}
