import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootStackParamList, TabParamList } from "./types";
import { ScribbleTabBar } from "./ScribbleTabBar";
import { MonthScreen } from "../screens/MonthScreen";
import { DayScreen } from "../screens/DayScreen";
import { NotesScreen } from "../screens/NotesScreen";
import { AlertsScreen } from "../screens/AlertsScreen";
import { NewEventScreen } from "../screens/NewEventScreen";
import { NoteEditorScreen } from "../screens/NoteEditorScreen";
import { SettingsScreen } from "../screens/SettingsScreen";

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        // Cross-fade + shift content when switching tabs.
        animation: "shift",
      }}
      tabBar={(props) => <ScribbleTabBar {...props} />}
    >
      <Tab.Screen name="Month" component={MonthScreen} />
      <Tab.Screen name="Day" component={DayScreen} />
      <Tab.Screen name="Notes" component={NotesScreen} />
      <Tab.Screen name="Alerts" component={AlertsScreen} />
    </Tab.Navigator>
  );
}

export function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        animationDuration: 260,
      }}
    >
      <Stack.Screen name="Tabs" component={Tabs} />
      <Stack.Group
        screenOptions={{
          presentation: "modal",
          animation: "slide_from_bottom",
          gestureEnabled: true,
        }}
      >
        <Stack.Screen name="NewEvent" component={NewEventScreen} />
        <Stack.Screen name="NoteEditor" component={NoteEditorScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
