import React from "react";
import { ScrollView, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";
import { Screen } from "../components/Screen";
import { TopBar } from "../components/TopBar";
import { ScribbleCard } from "../components/ScribbleCard";
import { useTheme } from "../theme/ThemeContext";
import { accentToColor, useAppData } from "../data/AppDataContext";
import { formatLongDate } from "../utils/date";
import type { RootStackParamList } from "../navigation/types";

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function AlertsScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<Nav>();
  const { events } = useAppData();

  const upcoming = [...events].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <Screen>
      <TopBar
        title="Scribble Alerts"
        leadingIcon="notifications"
        onMenu={() => navigation.navigate("Settings")}
        onAvatar={() => navigation.navigate("Settings")}
      />

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 48, gap: 16 }}>
        <Text
          style={{
            fontFamily: "PlusJakartaSans_500Medium",
            fontSize: 16,
            color: theme.onSurfaceVariant,
            marginBottom: 4,
          }}
        >
          {upcoming.length} reminder{upcoming.length === 1 ? "" : "s"} on your wall
        </Text>

        {upcoming.map((e, i) => (
          <ScribbleCard
            key={e.id}
            index={i}
            bg={theme.card}
            rotate={i % 2 === 0 ? 1 : -1}
            padding={16}
            shadowOffset={5}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 12,
                  backgroundColor: accentToColor[e.color],
                  borderWidth: 3,
                  borderColor: theme.line,
                  alignItems: "center",
                  justifyContent: "center",
                  transform: [{ rotate: "-4deg" }],
                }}
              >
                <MaterialIcons name="alarm" size={26} color={theme.line} />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: "Epilogue_700Bold",
                    fontSize: 17,
                    color: theme.onSurface,
                  }}
                >
                  {e.title}
                </Text>
                <Text
                  style={{
                    fontFamily: "PlusJakartaSans_400Regular",
                    fontSize: 14,
                    color: theme.onSurfaceVariant,
                    marginTop: 2,
                  }}
                >
                  {formatLongDate(e.date)}
                  {e.time ? ` · ${e.time}` : ""}
                </Text>
              </View>
            </View>
          </ScribbleCard>
        ))}
      </ScrollView>
    </Screen>
  );
}
