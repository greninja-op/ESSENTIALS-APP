import React from "react";
import { Pressable, ScrollView, Switch, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";
import { Screen } from "../components/Screen";
import { ScribbleCard } from "../components/ScribbleCard";
import { ScribbleButton } from "../components/ScribbleButton";
import { useTheme } from "../theme/ThemeContext";
import { palette } from "../theme/colors";
import type { RootStackParamList } from "../navigation/types";

type Nav = NativeStackNavigationProp<RootStackParamList>;

function Row({
  icon,
  label,
  right,
}: {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  right: React.ReactNode;
}) {
  const { theme } = useTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 12,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <MaterialIcons name={icon} size={24} color={theme.onSurface} />
        <Text
          style={{
            fontFamily: "PlusJakartaSans_500Medium",
            fontSize: 16,
            color: theme.onSurface,
          }}
        >
          {label}
        </Text>
      </View>
      {right}
    </View>
  );
}

export function SettingsScreen() {
  const { theme, themeName, toggleTheme } = useTheme();
  const navigation = useNavigation<Nav>();
  const [reminders, setReminders] = React.useState(true);
  const [sounds, setSounds] = React.useState(false);

  return (
    <Screen edges={["top", "bottom"]}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
          padding: 16,
        }}
      >
        <ScribbleButton
          icon="arrow-back-ios-new"
          bg={theme.card}
          color={theme.onSurface}
          size={44}
          rotate={-3}
          onPress={() => navigation.goBack()}
        />
        <Text
          style={{
            fontFamily: "Epilogue_800ExtraBold",
            fontSize: 24,
            textTransform: "uppercase",
            color: theme.onSurface,
            transform: [{ rotate: "-1deg" }],
          }}
        >
          Settings
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, gap: 20 }}>
        <ScribbleCard bg={theme.card} padding={16} rotate={-1}>
          <Text
            style={{
              fontFamily: "SplineSans_700Bold",
              fontSize: 14,
              color: theme.onSurfaceVariant,
              marginBottom: 4,
            }}
          >
            APPEARANCE
          </Text>
          <Row
            icon="dark-mode"
            label="Dark mode"
            right={
              <Switch
                value={themeName === "dark"}
                onValueChange={toggleTheme}
                trackColor={{ true: palette.pink, false: "#ccc" }}
                thumbColor={palette.ink}
              />
            }
          />
        </ScribbleCard>

        <ScribbleCard bg={theme.card} padding={16} rotate={1}>
          <Text
            style={{
              fontFamily: "SplineSans_700Bold",
              fontSize: 14,
              color: theme.onSurfaceVariant,
              marginBottom: 4,
            }}
          >
            REMINDERS
          </Text>
          <Row
            icon="notifications-active"
            label="Event reminders"
            right={
              <Switch
                value={reminders}
                onValueChange={setReminders}
                trackColor={{ true: palette.cyan, false: "#ccc" }}
                thumbColor={palette.ink}
              />
            }
          />
          <Row
            icon="volume-up"
            label="Reminder sounds"
            right={
              <Switch
                value={sounds}
                onValueChange={setSounds}
                trackColor={{ true: palette.yellow, false: "#ccc" }}
                thumbColor={palette.ink}
              />
            }
          />
        </ScribbleCard>

        <Pressable style={{ alignItems: "center", marginTop: 8 }}>
          <Text
            style={{
              fontFamily: "PlusJakartaSans_500Medium",
              fontSize: 13,
              color: theme.onSurfaceVariant,
            }}
          >
            Essentials · Vibrant Scribble Calendar
          </Text>
        </Pressable>
      </ScrollView>
    </Screen>
  );
}
