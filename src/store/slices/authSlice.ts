import { IUser } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserSubmissions {
  id: string;
  roundId: string;
  createdAt: Date;
  score: number;
  submittedContent: string;
  title: string; //@h this may be round title, not fuctional
}

interface AuthState {
  user: IUser | null;
  competitionInfo: {
    enrollIds: string[];
    submissions: UserSubmissions[];
  };
}

const initialState: AuthState = {
  user: null,
  competitionInfo: {
    enrollIds: [],
    submissions: [],
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser | null>) {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null; // Clear user data
    },
    setCompetitionInfo(
      state,
      action: PayloadAction<Partial<AuthState["competitionInfo"]>>
    ) {
      state.competitionInfo = { ...state.competitionInfo, ...action.payload };
    },
    updateEnrollIds(state, action: PayloadAction<{ enrollId: string }>) {
      state.competitionInfo.enrollIds = [
        ...state.competitionInfo.enrollIds,
        action.payload.enrollId,
      ];
    },
  },
});

export const { setUser, clearUser, updateEnrollIds, setCompetitionInfo } =
  authSlice.actions;
export default authSlice.reducer;
