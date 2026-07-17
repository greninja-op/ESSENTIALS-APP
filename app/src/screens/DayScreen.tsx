import React from "react";
import { ScrollView, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";
import { Screen } from "../components/Screen";
import { TopBar } from "../components/TopBar";
import { ScribbleCard } from "../components/ScribbleCard";
import { ScribbleButton } from "../components/ScribbleButton";
import { useTheme } from "../theme/ThemeContext";
import { accentToColor, useAppData } from "../data/AppDataContext";
import { formatLongDate } from "../utils/date";
import type { RootStackParamList } from "../navigation/types";

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function DayScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<Nav>();
  const { selectedDate, eventsByDate, removeEvent } = useAppData();

  const dayEvents = eventsByDate(selectedDate).sort((a, b) =>
    (a.time ?? "").localeCompare(b.time ?? "")
  );

  return (
    <Screen>
      <TopBar
        title="My Day"
        leadingIcon="calendar-month"
        onMenu={() => navigation.navigate("Tabs", { screen: "Month" })}
        onAvatar={() => navigation.navigate("Settings")}
      />

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 48 }}>
        <Text
          style={{
            fontFamily: "Epilogue_800ExtraBold",
            fontSize: 30,
            color: theme.onSurface,
            transform: [{ rotate: "-1deg" }],
            marginBottom: 4,
          }}
        >
          {formatLongDate(selectedDate)}
        </Text>
        <Text
          style={{
            fontFamily: "PlusJakartaSans_500Medium",
            fontSize: 16,
            color: theme.onSurfaceVariant,
            marginBottom: 20,
          }}
        >
          {dayEvents.length === 0
            ? "Nothing scribbled yet."
            : `${dayEvents.length} thing${dayEvents.length > 1 ? "s" : ""} planned`}
        </Text>

        {dayEvents.length === 0 && (
          <ScribbleCard bg={theme.card} rotate={-1} padding={24}>
            <View style={{ alignItems: "center", gap: 8 }}>
              <MaterialIcons name="edit-note" size={48} color={theme.onSurfaceVariant} />
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_500Medium",
                  fontSize: 16,
                  color: theme.onSurfaceVariant,
                  textAlign: "center",
                }}
              >
                Tap the + button to scribble a new event.
              </Text>
            </View>
          </ScribbleCard>
        )}

        <View style={{ gap: 16 }}>
          {dayEvents.map((e, i) => (
            <ScribbleCard
              key={e.id}
              index={i}
              bg={theme.card}
              rotate={i % 2 === 0 ? -1 : 1}
              padding={0}
              style={{ overflow: "hidden" }}
            >
              <View style={{ flexDirection: "row", alignItems: "stretch" }}>
                <View
                  style={{
                    width: 12,
                    backgroundColor: accentToColor[e.color],
                    borderRightWidth: 3,
                    borderColor: theme.line,
                  }}
                />
                <View style={{ flex: 1, padding: 16, flexDirection: "row", alignItems: "center", gap: 12 }}>
                  <View
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 9999,
                      borderWidth: 3,
                      borderColor: theme.line,
                      backgroundColor: accentToColor[e.color],
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <MaterialIcons
                      name={(e.icon as any) ?? "event"}
                      size={22}
                      color={theme.line}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontFamily: "Epilogue_700Bold",
                        fontSize: 18,
                        color: theme.onSurface,
                      }}
                    >
                      {e.title}
                    </Text>
                    {e.time && (
                      <Text
                        style={{
                          fontFamily: "SplineSans_700Bold",
                          fontSize: 13,
                          color: theme.onSurfaceVariant,
                          marginTop: 2,
                        }}
                      >
                        {e.time}
                      </Text>
                    )}
                  </View>
                  <MaterialIcons
                    name="delete-outline"
                    size={24}
                    color={theme.onSurfaceVariant}
                    onPress={() => removeEvent(e.id)}
                  />
                </View>
              </View>
            </ScribbleCard>
          ))}
        </View>
      </ScrollView>

      <View style={{ position: "absolute", right: 20, bottom: 24 }}>
        <ScribbleButton
          icon="add"
          bg={theme.primary}
          color={theme.card}
          circle
          size={64}
          rotate={5}
          shadowOffset={5}
          onPress={() => navigation.navigate("NewEvent", { date: selectedDate })}
        />
      </View>
    </Screen>
  );
}
