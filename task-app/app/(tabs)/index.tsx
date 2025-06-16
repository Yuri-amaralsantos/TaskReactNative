import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Button,
  Pressable,
} from "react-native";
import TaskItem from "../../components/TaskItem";

type Task = {
  id: string;
  text: string;
  description?: string;
  done: boolean;
  favorite: boolean;
  status: "pendente" | "completo";
};

type FilterType = "all" | "favorites" | "non-favorites";

export default function App() {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");

  const addTask = () => {
    if (task.trim() === "") return;

    const newTask: Task = {
      id: Date.now().toString(),
      text: task,
      description: description.trim(),
      done: false,
      favorite: false,
      status: "pendente",
    };

    setTasks([newTask, ...tasks]);
    setTask("");
    setDescription("");
  };

  const toggleDone = (id: string) => {
    setTasks(
      tasks.map((t) =>
        t.id === id
          ? { ...t, done: !t.done, status: t.done ? "pendente" : "completo" }
          : t
      )
    );
  };

  const toggleFavorite = (id: string) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, favorite: !t.favorite } : t))
    );
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "favorites") return task.favorite;
    if (filter === "non-favorites") return !task.favorite;
    return true;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 Minhas Tarefas</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nova tarefa..."
          value={task}
          onChangeText={setTask}
        />
        <TextInput
          style={[styles.input, { height: 60 }]}
          placeholder="Descrição (opcional)..."
          value={description}
          onChangeText={setDescription}
          multiline
        />
        <Button title="Adicionar" onPress={addTask} />
      </View>

      <View style={styles.filters}>
        <Pressable onPress={() => setFilter("all")}>
          <Text
            style={[styles.filterBtn, filter === "all" && styles.activeFilter]}
          >
            Todas
          </Text>
        </Pressable>
        <Pressable onPress={() => setFilter("favorites")}>
          <Text
            style={[
              styles.filterBtn,
              filter === "favorites" && styles.activeFilter,
            ]}
          >
            ⭐ Favoritas
          </Text>
        </Pressable>
        <Pressable onPress={() => setFilter("non-favorites")}>
          <Text
            style={[
              styles.filterBtn,
              filter === "non-favorites" && styles.activeFilter,
            ]}
          >
            📦 Normais
          </Text>
        </Pressable>
      </View>

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggleDone={toggleDone}
            onDelete={removeTask}
            onToggleFavorite={toggleFavorite}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#fff" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 12 },
  inputContainer: { gap: 8, marginBottom: 16 },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 8,
  },
  filters: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 10,
  },
  filterBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 6,
    color: "#555",
  },
  activeFilter: {
    backgroundColor: "#333",
    color: "#fff",
    borderColor: "#333",
  },
});
