import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function OtpVerifyScreen() {
  const [otp, setOtp] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Verify OTP</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        keyboardType="number-pad"
        maxLength={6}
        value={otp}
        onChangeText={setOtp}
      />

      <TouchableOpacity style={styles.verifyBtn}>
        <Text style={styles.verifyText}>Verify OTP</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1A1A2E", padding: 25, justifyContent: "center" },
  header: { fontSize: 28, color: "white", marginBottom: 40, textAlign: "center" },
  input: {
    height: 55,
    borderWidth: 1,
    borderColor: "#00BCD4",
    borderRadius: 10,
    paddingHorizontal: 15,
    color: "white",
    backgroundColor: "#2C2C48",
    textAlign: "center",
    fontSize: 22,
    letterSpacing: 10,
  },
  verifyBtn: {
    marginTop: 20,
    backgroundColor: "#00BCD4",
    height: 55,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  verifyText: { color: "#1A1A2E", fontWeight: "bold", fontSize: 18 },
});
