import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Screen } from "../components/Screen";
import { TopBar } from "../components/TopBar";
import { ScribbleCard } from "../components/ScribbleCard";
import { ScribbleButton } from "../components/ScribbleButton";
import { useTheme } from "../theme/ThemeContext";
import { accentToColor, useAppData } from "../data/AppDataContext";
import type { RootStackParamList } from "../navigation/types";

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function NotesScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<Nav>();
  const { notes } = useAppData();

  return (
    <Screen>
      <TopBar
        title="Scribble Notes"
        leadingIcon="sticky-note-2"
        onMenu={() => navigation.navigate("Settings")}
        onAvatar={() => navigation.navigate("Settings")}
      />

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 48, gap: 16 }}>
        {notes.map((note, i) => (
          <Pressable
            key={note.id}
            onPress={() => navigation.navigate("NoteEditor", { id: note.id })}
          >
            <ScribbleCard
              bg={accentToColor[note.color]}
              rotate={i % 2 === 0 ? -1.5 : 1.5}
              padding={16}
            >
              {/* Tape decoration */}
              <View
                style={{
                  position: "absolute",
                  top: -8,
                  left: 20,
                  width: 46,
                  height: 20,
                  backgroundColor: theme.card,
                  opacity: 0.7,
                  borderWidth: 2,
                  borderColor: theme.line,
                  transform: [{ rotate: "-8deg" }],
                }}
              />
              <Text
                style={{
                  fontFamily: "Epilogue_800ExtraBold",
                  fontSize: 20,
                  color: theme.line,
                  marginBottom: 6,
                }}
              >
                {note.title}
              </Text>
              <Text
                numberOfLines={3}
                style={{
                  fontFamily: "PlusJakartaSans_400Regular",
                  fontSize: 15,
                  lineHeight: 22,
                  color: theme.line,
                }}
              >
                {note.body}
              </Text>
            </ScribbleCard>
          </Pressable>
        ))}
      </ScrollView>

      <View style={{ position: "absolute", right: 20, bottom: 24 }}>
        <ScribbleButton
          icon="add"
          bg={theme.secondary}
          color={theme.line}
          circle
          size={64}
          rotate={-5}
          shadowOffset={5}
          onPress={() => navigation.navigate("NoteEditor")}
        />
      </View>
    </Screen>
  );
}
