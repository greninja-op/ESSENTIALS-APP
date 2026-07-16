import React, { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";
import { Screen } from "../components/Screen";
import { ScribbleCard } from "../components/ScribbleCard";
import { ScribbleButton } from "../components/ScribbleButton";
import { useTheme } from "../theme/ThemeContext";
import {
  AccentColor,
  accentToColor,
  useAppData,
} from "../data/AppDataContext";
import type { RootStackParamList } from "../navigation/types";

type Nav = NativeStackNavigationProp<RootStackParamList>;
type Rt = RouteProp<RootStackParamList, "NoteEditor">;

const COLORS: AccentColor[] = ["pink", "cyan", "yellow", "mint"];

export function NoteEditorScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rt>();
  const { notes, addNote, updateNote, removeNote } = useAppData();

  const existing = route.params?.id
    ? notes.find((n) => n.id === route.params?.id)
    : undefined;

  const [title, setTitle] = useState(existing?.title ?? "");
  const [body, setBody] = useState(existing?.body ?? "");
  const [color, setColor] = useState<AccentColor>(existing?.color ?? "yellow");

  const save = () => {
    const trimmed = title.trim() || "Untitled scribble";
    if (existing) {
      updateNote(existing.id, { title: trimmed, body, color });
    } else {
      addNote({ title: trimmed, body, color });
    }
    navigation.goBack();
  };

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
          {existing ? "Edit Note" : "New Note"}
        </Text>
        <ScribbleButton
          icon="check"
          bg={theme.secondary}
          color={theme.line}
          size={44}
          rotate={3}
          onPress={save}
        />
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, gap: 20 }}>
        {/* Color picker */}
        <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
          <Text
            style={{
              fontFamily: "SplineSans_700Bold",
              fontSize: 14,
              color: theme.onSurfaceVariant,
            }}
          >
            COLOR
          </Text>
          {COLORS.map((c) => (
            <Pressable key={c} onPress={() => setColor(c)}>
              <View
                style={{
                  width: 34,
                  height: 34,
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

        <ScribbleCard bg={accentToColor[color]} padding={16} shadowOffset={6}>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Note title..."
            placeholderTextColor="rgba(5,5,5,0.4)"
            style={{
              fontFamily: "Epilogue_800ExtraBold",
              fontSize: 22,
              color: theme.line,
              marginBottom: 8,
            }}
          />
          <View
            style={{
              height: 3,
              backgroundColor: theme.line,
              marginBottom: 12,
              opacity: 0.5,
            }}
          />
          <TextInput
            value={body}
            onChangeText={setBody}
            placeholder="Start scribbling your thoughts here..."
            placeholderTextColor="rgba(5,5,5,0.4)"
            multiline
            style={{
              fontFamily: "PlusJakartaSans_400Regular",
              fontSize: 16,
              lineHeight: 24,
              color: theme.line,
              minHeight: 220,
              textAlignVertical: "top",
            }}
          />
        </ScribbleCard>

        {existing && (
          <Pressable
            onPress={() => {
              removeNote(existing.id);
              navigation.goBack();
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              paddingVertical: 8,
            }}
          >
            <MaterialIcons name="delete-outline" size={20} color={theme.onSurfaceVariant} />
            <Text
              style={{
                fontFamily: "SplineSans_700Bold",
                fontSize: 14,
                color: theme.onSurfaceVariant,
              }}
            >
              Delete note
            </Text>
          </Pressable>
        )}
      </ScrollView>
    </Screen>
  );
}
