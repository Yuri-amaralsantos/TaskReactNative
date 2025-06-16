import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

type Task = {
  id: string;
  text: string;
  description?: string;
  done: boolean;
  favorite: boolean;
  status: "pendente" | "completo";
};

type Props = {
  task: Task;
  onToggleDone: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
};

export default function TaskItem({
  task,
  onToggleDone,
  onDelete,
  onToggleFavorite,
}: Props) {
  return (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() => onToggleDone(task.id)}
        style={styles.content}
      >
        <Text style={[styles.text, task.done && styles.done]}>{task.text}</Text>
        {task.description ? (
          <Text style={[styles.description, task.done && styles.done]}>
            {task.description}
          </Text>
        ) : null}
        <Text
          style={[
            styles.status,
            task.status === "completo"
              ? styles.statusComplete
              : styles.statusPending,
          ]}
        >
          {task.status === "completo" ? "✅ Completo" : "⌛ Pendente"}
        </Text>
      </TouchableOpacity>

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onToggleFavorite(task.id)}>
          <Text style={[styles.icon, task.favorite && styles.favorite]}>★</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onDelete(task.id)}>
          <Text style={styles.icon}>🗑</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  content: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
  },
  description: {
    marginTop: 4,
    fontSize: 14,
    color: "#555",
  },
  status: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: "600",
  },
  statusComplete: {
    color: "green",
  },
  statusPending: {
    color: "orange",
  },
  done: {
    textDecorationLine: "line-through",
    color: "#aaa",
  },
  actions: {
    flexDirection: "row",
    gap: 10,
    marginLeft: 10,
  },
  icon: {
    fontSize: 20,
    color: "#888",
  },
  favorite: {
    color: "#f1c40f",
  },
});
