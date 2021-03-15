import * as types from "../../constants";

export type UserType = {
  id?: string;
  email?: string;
  name?: string;
};

export type AuthType = {
  user?: UserType | undefined;
};

export default function reducer(
  state = {},
  actions: UserType & { type: string }
): AuthType {
  switch (actions.type) {
    case types.AUTH_SIGN_IN_SUCCESS:
      return {
        ...state,
        user: {
          id: actions.id,
          email: actions.email,
          name: actions.name,
        },
      };

    case types.AUTH_SIGN_OUT:
      return {
        ...state,
        user: undefined,
      };

    default:
      return state;
  }
}
