import React, { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";
import { Screen } from "../components/Screen";
import { ScribbleCard } from "../components/ScribbleCard";
import { ScribbleButton } from "../components/ScribbleButton";
import { useTheme } from "../theme/ThemeContext";
import { AccentColor, accentToColor, useAppData } from "../data/AppDataContext";
import { formatLongDate } from "../utils/date";
import type { RootStackParamList } from "../navigation/types";

type Nav = NativeStackNavigationProp<RootStackParamList>;
type Rt = RouteProp<RootStackParamList, "NewEvent">;

const COLORS: AccentColor[] = ["pink", "cyan", "yellow", "mint"];
const ICONS: (keyof typeof MaterialIcons.glyphMap)[] = [
  "event", "local-cafe", "fitness-center", "cake", "work", "school", "flight", "favorite",
];

export function NewEventScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rt>();
  const { addEvent, selectedDate } = useAppData();

  const date = route.params?.date ?? selectedDate;
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [color, setColor] = useState<AccentColor>("pink");
  const [icon, setIcon] = useState<keyof typeof MaterialIcons.glyphMap>("event");

  const save = () => {
    addEvent({
      title: title.trim() || "Untitled event",
      date,
      time: time.trim() || undefined,
      color,
      icon,
    });
    navigation.goBack();
  };

  const labelStyle = {
    fontFamily: "SplineSans_700Bold",
    fontSize: 14,
    color: theme.onSurfaceVariant,
    marginBottom: 8,
  } as const;

  return (
    <Screen edges={["top", "bottom"]}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 16,
        }}
      >
        <ScribbleButton
          icon="close"
          bg={theme.card}
          color={theme.onSurface}
          size={44}
          rotate={-3}
          onPress={() => navigation.goBack()}
        />
        <Text
          style={{
            fontFamily: "Epilogue_800ExtraBold",
            fontSize: 20,
            textTransform: "uppercase",
            color: theme.onSurface,
            transform: [{ rotate: "-1deg" }],
          }}
        >
          New Event
        </Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, gap: 20 }}>
        <ScribbleCard bg={theme.card} padding={16} rotate={-1}>
          <Text style={labelStyle}>WHAT?</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Event title..."
            placeholderTextColor={theme.onSurfaceVariant}
            style={{
              fontFamily: "Epilogue_700Bold",
              fontSize: 20,
              color: theme.onSurface,
            }}
          />
        </ScribbleCard>

        <ScribbleCard bg={theme.secondaryFixed} padding={16} rotate={1}>
          <Text style={labelStyle}>WHEN?</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <MaterialIcons name="calendar-today" size={20} color={theme.line} />
            <Text
              style={{
                fontFamily: "Epilogue_700Bold",
                fontSize: 18,
                color: theme.line,
              }}
            >
              {formatLongDate(date)}
            </Text>
          </View>
          <View style={{ height: 12 }} />
          <Text style={labelStyle}>TIME (optional)</Text>
          <TextInput
            value={time}
            onChangeText={setTime}
            placeholder="e.g. 09:30 AM"
            placeholderTextColor="rgba(5,5,5,0.4)"
            style={{
              fontFamily: "SplineSans_700Bold",
              fontSize: 16,
              color: theme.line,
            }}
          />
        </ScribbleCard>

        {/* Color */}
        <View>
          <Text style={labelStyle}>COLOR</Text>
          <View style={{ flexDirection: "row", gap: 12 }}>
            {COLORS.map((c) => (
              <Pressable key={c} onPress={() => setColor(c)}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 9999,
                    backgroundColor: accentToColor[c],
                    borderWidth: color === c ? 4 : 2,
                    borderColor: theme.line,
                    boxShadow: color === c ? `2px 2px 0px ${theme.shadow}` : undefined,
                  }}
                />
              </Pressable>
            ))}
          </View>
        </View>

        {/* Icon */}
        <View>
          <Text style={labelStyle}>ICON</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
            {ICONS.map((ic) => (
              <Pressable key={ic} onPress={() => setIcon(ic)}>
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    backgroundColor: icon === ic ? theme.primary : theme.card,
                    borderWidth: 3,
                    borderColor: theme.line,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MaterialIcons name={ic} size={24} color={theme.line} />
                </View>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={{ alignItems: "center", marginTop: 8 }}>
          <ScribbleButton
            label="Scribble it!"
            icon="check"
            bg={theme.primary}
            color={theme.card}
            rotate={-2}
            shadowOffset={5}
            onPress={save}
          />
        </View>
      </ScrollView>
    </Screen>
  );
}
