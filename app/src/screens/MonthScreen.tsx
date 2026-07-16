import React, { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Screen } from "../components/Screen";
import { TopBar } from "../components/TopBar";
import { ScribbleCard } from "../components/ScribbleCard";
import { ScribbleButton } from "../components/ScribbleButton";
import { useTheme } from "../theme/ThemeContext";
import { accentToColor, useAppData } from "../data/AppDataContext";
import { MONTH_NAMES, WEEKDAYS, monthMatrix } from "../utils/date";
import type { RootStackParamList } from "../navigation/types";

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function MonthScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<Nav>();
  const { events, selectedDate, setSelectedDate } = useAppData();

  const [cursor, setCursor] = useState(() => {
    const [y, m] = selectedDate.split("-").map(Number);
    return { year: y, month: m - 1 };
  });

  const cells = monthMatrix(cursor.year, cursor.month);

  const changeMonth = (delta: number) => {
    setCursor((c) => {
      const d = new Date(c.year, c.month + delta, 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });
  };

  const openDay = (dateStr: string) => {
    setSelectedDate(dateStr);
    navigation.navigate("Tabs", { screen: "Day" });
  };

  return (
    <Screen>
      <TopBar
        title="My Scribbles"
        onMenu={() => navigation.navigate("Settings")}
        onAvatar={() => navigation.navigate("Settings")}
      />

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 48 }}>
        {/* Month header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 24,
          }}
        >
          <ScribbleButton
            icon="arrow-back-ios-new"
            bg={theme.card}
            color={theme.primary}
            rotate={-4}
            size={48}
            onPress={() => changeMonth(-1)}
          />

          <View style={{ alignItems: "center" }}>
            <View>
              <Text
                style={{
                  fontFamily: "Epilogue_800ExtraBold",
                  fontSize: 44,
                  color: theme.onSurface,
                  transform: [{ rotate: "2deg" }],
                }}
              >
                {MONTH_NAMES[cursor.month]}
              </Text>
              <View
                style={{
                  position: "absolute",
                  bottom: 6,
                  left: 0,
                  right: 0,
                  height: 10,
                  backgroundColor: theme.secondaryFixed,
                  zIndex: -1,
                  transform: [{ rotate: "-2deg" }],
                }}
              />
            </View>
            <ScribbleCard
              bg={theme.card}
              borderWidth={2}
              shadowOffset={0}
              padding={0}
              rotate={-1}
              style={{ paddingHorizontal: 16, paddingVertical: 4, marginTop: 8 }}
            >
              <Text
                style={{
                  fontFamily: "SplineSans_700Bold",
                  fontSize: 14,
                  color: theme.onSurfaceVariant,
                }}
              >
                {cursor.year}
              </Text>
            </ScribbleCard>
          </View>

          <ScribbleButton
            icon="arrow-forward-ios"
            bg={theme.card}
            color={theme.primary}
            rotate={4}
            size={48}
            onPress={() => changeMonth(1)}
          />
        </View>

        {/* Calendar card */}
        <ScribbleCard bg={theme.card} shadowOffset={8} padding={16}>
          {/* Weekday row */}
          <View style={{ flexDirection: "row", marginBottom: 12 }}>
            {WEEKDAYS.map((wd, i) => (
              <View key={wd} style={{ flex: 1, alignItems: "center" }}>
                <Text
                  style={{
                    fontFamily: "Epilogue_700Bold",
                    fontSize: 13,
                    paddingBottom: 6,
                    color: i === 0 || i === 6 ? theme.primary : theme.onSurface,
                    transform: [{ rotate: `${(i % 3) - 1}deg` }],
                  }}
                >
                  {wd}
                </Text>
              </View>
            ))}
          </View>

          {/* Day grid */}
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {cells.map((cell) => {
              const dayEvents = events.filter((e) => e.date === cell.dateStr);
              const isSelected = cell.dateStr === selectedDate && cell.inMonth;
              const hasEvents = dayEvents.length > 0;

              let bg = theme.card;
              if (!cell.inMonth) bg = theme.surfaceContainerHigh;
              else if (isSelected) bg = theme.secondaryFixed;
              else if (hasEvents) bg = theme.primaryFixed;

              return (
                <View
                  key={cell.dateStr + cell.day}
                  style={{ width: `${100 / 7}%`, padding: 3 }}
                >
                  <Pressable
                    onPress={() => cell.inMonth && openDay(cell.dateStr)}
                    style={{
                      aspectRatio: 1,
                      backgroundColor: bg,
                      borderColor: theme.line,
                      borderWidth: cell.inMonth ? 3 : 2,
                      borderTopLeftRadius: 4,
                      borderTopRightRadius: 10,
                      borderBottomRightRadius: 5,
                      borderBottomLeftRadius: 9,
                      opacity: cell.inMonth ? 1 : 0.45,
                      padding: 4,
                      justifyContent: "space-between",
                      transform: isSelected ? [{ rotate: "2deg" }] : undefined,
                      boxShadow: isSelected ? `3px 3px 0px ${theme.shadow}` : undefined,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: cell.inMonth
                          ? "Epilogue_700Bold"
                          : "SplineSans_700Bold",
                        fontSize: cell.inMonth ? 15 : 11,
                        color: theme.onSurface,
                      }}
                    >
                      {cell.day}
                    </Text>
                    {hasEvents && (
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                          gap: 3,
                        }}
                      >
                        {dayEvents.slice(0, 3).map((e) => (
                          <View
                            key={e.id}
                            style={{
                              width: 7,
                              height: 7,
                              borderRadius: 9999,
                              backgroundColor: accentToColor[e.color],
                              borderWidth: 1,
                              borderColor: theme.line,
                            }}
                          />
                        ))}
                      </View>
                    )}
                  </Pressable>
                </View>
              );
            })}
          </View>
        </ScribbleCard>
      </ScrollView>

      {/* Floating add button */}
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
