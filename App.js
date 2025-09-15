import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import styles from "./style";

export default function App() {
  const initial = {
    name: "",
    year: "",
    section: "",
    course: "",
    id: "",
    address: "",
    age: "",
    picture: "",
  };

  const [employee, setEmployee] = useState(initial);
  const [form, setForm] = useState(initial);
  const [showModal, setShowModal] = useState(false);

  const openEdit = () => {
    setForm(employee);
    setShowModal(true);
  };

  const save = () => {
    setEmployee(form);
    setShowModal(false);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setForm({ ...form, picture: result.assets[0].uri });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topBar}>
        <Ionicons name="home-outline" size={24} color="#fff" />
        <Text style={styles.topBarTitle}>Gardenware Employee Profile</Text>
        <Ionicons name="search-outline" size={24} color="#fff" />
      </View>

      <View style={styles.card}>
        <Image
          source={{
            uri: employee.picture
              ? employee.picture
              : "https://cdn-icons-png.flaticon.com/512/1995/1995525.png",
          }}
          style={styles.avatar}
        />

        <View style={styles.info}>
          <Text style={styles.name}>{employee.name || "Unnamed Employee"}</Text>
          <Text style={styles.small}>{employee.course || "Department"}</Text>
          <Text style={styles.small}>
            {(employee.year || "Year")} • {(employee.section || "Section")}
          </Text>
          <Text style={styles.small}>
            ID: {employee.id || "Not assigned"}
          </Text>
          <Text style={styles.small}>
            Address: {employee.address || "No address"}
          </Text>
          <Text style={styles.small}>Age: {employee.age || "N/A"}</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={openEdit}>
          <Text style={styles.buttonText}>Change Stuff</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={showModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Employee Profile</Text>

            {form.picture ? (
              <Image source={{ uri: form.picture }} style={styles.previewImage} />
            ) : null}

            <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
              <Text style={styles.imageButtonText}>
                {form.picture ? "Change Image" : "Pick Image"}
              </Text>
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              placeholder="Full name"
              value={form.name}
              onChangeText={(t) => setForm({ ...form, name: t })}
            />

            <TextInput
              style={styles.input}
              placeholder="Year"
              value={form.year}
              onChangeText={(t) => setForm({ ...form, year: t })}
            />

            <TextInput
              style={styles.input}
              placeholder="Section"
              value={form.section}
              onChangeText={(t) => setForm({ ...form, section: t })}
            />

            <TextInput
              style={styles.input}
              placeholder="Course"
              value={form.course}
              onChangeText={(t) => setForm({ ...form, course: t })}
            />

            <TextInput
              style={styles.input}
              placeholder="Employee ID"
              value={form.id}
              onChangeText={(t) => setForm({ ...form, id: t })}
            />

            <TextInput
              style={styles.input}
              placeholder="Address"
              value={form.address}
              onChangeText={(t) => setForm({ ...form, address: t })}
            />

            <TextInput
              style={styles.input}
              placeholder="Age"
              keyboardType={Platform.OS === "web" ? "numeric" : "number-pad"}
              value={String(form.age)}
              onChangeText={(t) => setForm({ ...form, age: t })}
            />

            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <TouchableOpacity
                style={[styles.button, { marginRight: 8 }]}
                onPress={save}
              >
                <Text style={styles.buttonText}>This Looks Good!</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.buttonText}>I Don't Want This!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
