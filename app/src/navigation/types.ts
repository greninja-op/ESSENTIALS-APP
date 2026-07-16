import type { NavigatorScreenParams } from "@react-navigation/native";

export type TabParamList = {
  Month: undefined;
  Day: undefined;
  Notes: undefined;
  Alerts: undefined;
};

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList> | undefined;
  NewEvent: { date?: string } | undefined;
  NoteEditor: { id?: string } | undefined;
  Settings: undefined;
};
