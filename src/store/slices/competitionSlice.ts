import { ICompetition, IPrizesAndRewards, IRound } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import omit from "lodash.omit";
export enum CompetitionUiModeEnum {
  VIEW = 1,
  CREATE,
  UPDATE,
}

interface IUiControlsPayload<T> {
  mode: CompetitionUiModeEnum;
  recordToModify?: T;
}

interface CompetitionState {
  competition: (ICompetition & { id: string }) | null;
  uiControls: {
    basicInfoUi: IUiControlsPayload<ICompetition>;
    roundInfoUi: IUiControlsPayload<IRound>;
    prizesInfoUi: IUiControlsPayload<IPrizesAndRewards>;
    eligibility: IUiControlsPayload<string>;
  };
}

const initialState: CompetitionState = {
  competition: null,
  uiControls: {
    basicInfoUi: { mode: CompetitionUiModeEnum.VIEW },
    roundInfoUi: { mode: CompetitionUiModeEnum.VIEW },
    prizesInfoUi: { mode: CompetitionUiModeEnum.VIEW },
    eligibility: { mode: CompetitionUiModeEnum.VIEW },
  },
};

export type ICompetitionBasicInfo = Pick<ICompetition, "rounds">;

const competitionSlice = createSlice({
  name: "competition",
  initialState,
  reducers: {
    setCompetition(state, action: PayloadAction<ICompetition>) {
      state.competition = action.payload;
      state.uiControls = {
        ...state.uiControls,
        roundInfoUi: {
          mode: CompetitionUiModeEnum.VIEW,
          recordToModify: undefined,
        },
      };
    },
    updateCompetition(state, action: PayloadAction<Partial<ICompetition>>) {
      if (state.competition)
        state.competition = { ...state.competition, ...action.payload };
    },
    setRoundInfo(state, action: PayloadAction<IRound>) {
      state.uiControls = {
        ...state.uiControls,
        roundInfoUi: {
          mode: CompetitionUiModeEnum.VIEW,
          recordToModify: undefined,
        },
      };
      const existingRoundInfo = (state.competition as ICompetition).rounds.find(
        (round) => round.id === action.payload.id
      );
      if (existingRoundInfo) {
        (state.competition as ICompetition).rounds = [
          ...(state.competition as ICompetition).rounds.map((round) =>
            round.id === action.payload.id ? { ...action.payload } : round
          ),
        ];
      } else {
        (state.competition as ICompetition).rounds = [
          ...(state.competition as ICompetition)?.rounds,
          action.payload,
        ];
      }
    },
    deleteRoundInfo(state, action: PayloadAction<{ id: string }>) {
      if (state.competition?.rounds) {
        state.competition.rounds = [
          ...state.competition.rounds.filter(
            (round) => round.id !== action.payload.id
          ),
        ];
      }
    },
    setUiControlsBasicInfo(
      state,
      action: PayloadAction<IUiControlsPayload<ICompetition>>
    ) {
      const { mode, recordToModify } = action.payload;
      const cleanedObject = recordToModify
        ? (omit(recordToModify, ["__typename"]) as ICompetition)
        : undefined;
      console.log("Updating cleanedObject", cleanedObject);
      state.uiControls = {
        ...state.uiControls,
        basicInfoUi: {
          ...state.uiControls.basicInfoUi,
          mode,
          recordToModify: cleanedObject,
        },
      };
    },
    setUiControlsRounds(
      state,
      action: PayloadAction<IUiControlsPayload<IRound>>
    ) {
      const { mode, recordToModify } = action.payload;
      const cleanedObject = recordToModify
        ? (omit(recordToModify, ["__typename"]) as IRound)
        : undefined;
      state.uiControls = {
        ...state.uiControls,
        roundInfoUi: {
          ...state.uiControls.roundInfoUi,
          mode,
          recordToModify: cleanedObject,
        },
      };
    },
    setUiControlsPrizes(
      state,
      action: PayloadAction<
        IUiControlsPayload<IPrizesAndRewards> & { prizes?: IPrizesAndRewards[] }
      >
    ) {
      const { mode, recordToModify, prizes } = action.payload;
      const cleanedObject = recordToModify
        ? (omit(recordToModify, ["__typename"]) as IPrizesAndRewards)
        : undefined;
      state.uiControls = {
        ...state.uiControls,
        prizesInfoUi: {
          ...state.uiControls.prizesInfoUi,
          mode,
          recordToModify: cleanedObject,
        },
      };
      if (prizes)
        (state.competition as ICompetition).prizes = [
          ...(prizes || state.competition?.prizes || []),
        ];
    },
    setUiControlsEligibility(
      state,
      action: PayloadAction<
        IUiControlsPayload<string> & { eligibility?: string }
      >
    ) {
      console.log("setUiControlsEligibility", action.payload);
      const { mode, recordToModify, eligibility } = action.payload;
      if (state.competition && eligibility) {
        state.competition = {
          ...state.competition,
          eligibility: eligibility,
        };
      }
      state.uiControls = {
        ...state.uiControls,
        eligibility: {
          ...state.uiControls.eligibility,
          mode,
          recordToModify: recordToModify,
        },
      };
    },
  },
});

export const {
  setCompetition,
  updateCompetition,
  setRoundInfo,
  deleteRoundInfo,
  setUiControlsBasicInfo,
  setUiControlsRounds,
  setUiControlsPrizes,
  setUiControlsEligibility,
} = competitionSlice.actions;
export default competitionSlice.reducer;
