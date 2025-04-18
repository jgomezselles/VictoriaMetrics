import { getQueryStringValue } from "../../utils/query-string";

export interface AxisRange {
  [key: string]: [number, number]
}

export interface YaxisState {
  limits: {
    enable: boolean,
    range: AxisRange
  }
}

export interface GraphState {
  customStep: string
  yaxis: YaxisState
  isHistogram: boolean
  isEmptyHistogram: boolean
  /** when true, null data values will not cause line breaks */
  spanGaps: boolean
  openSettings: boolean
}

export type GraphAction =
  | { type: "TOGGLE_ENABLE_YAXIS_LIMITS" }
  | { type: "SET_YAXIS_LIMITS", payload: AxisRange }
  | { type: "SET_CUSTOM_STEP", payload: string}
  | { type: "SET_IS_HISTOGRAM", payload: boolean }
  | { type: "SET_IS_EMPTY_HISTOGRAM", payload: boolean }
  | { type: "SET_SPAN_GAPS", payload: boolean }
  | { type: "SET_OPEN_SETTINGS", payload: boolean }

export const initialGraphState: GraphState = {
  customStep: getQueryStringValue("g0.step_input", "") as string,
  yaxis: {
    limits: { enable: false, range: { "1": [0, 0] } }
  },
  isHistogram: false,
  isEmptyHistogram: false,
  spanGaps: false,
  openSettings: false
};

export function reducer(state: GraphState, action: GraphAction): GraphState {
  switch (action.type) {
    case "TOGGLE_ENABLE_YAXIS_LIMITS":
      return {
        ...state,
        yaxis: {
          ...state.yaxis,
          limits: {
            ...state.yaxis.limits,
            enable: !state.yaxis.limits.enable
          }
        }
      };
    case "SET_CUSTOM_STEP":
      return {
        ...state,
        customStep: action.payload
      };
    case "SET_YAXIS_LIMITS":
      return {
        ...state,
        yaxis: {
          ...state.yaxis,
          limits: {
            ...state.yaxis.limits,
            range: action.payload
          }
        }
      };
    case "SET_IS_HISTOGRAM":
      return {
        ...state,
        isHistogram: action.payload
      };
    case "SET_IS_EMPTY_HISTOGRAM":
      return {
        ...state,
        isEmptyHistogram: action.payload
      };
    case "SET_SPAN_GAPS":
      return {
        ...state,
        spanGaps: action.payload
      };
    case "SET_OPEN_SETTINGS":
      return {
        ...state,
        openSettings: action.payload
      };
    default:
      throw new Error();
  }
}
