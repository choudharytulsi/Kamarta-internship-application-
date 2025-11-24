// KamartaLoginComponent.tsx
// TypeScript version of the React Native (Expo) login screen
// Works on Android, iOS and Web

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Pressable,
} from 'react-native';
import Checkbox from 'expo-checkbox';
import { Link } from "expo-router";

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const isSmall = SCREEN_WIDTH < 380;

const DESIGN_IMAGE = require('../assets/images/kamartalogo.png');

interface LoginProps {
  onLogin?: (data: {
    email: string;
    username: string;
    password: string;
    remember: boolean;
  }) => void;
}

export default function KamartaLoginComponent({ onLogin }: LoginProps) {
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [remember, setRemember] = useState<boolean>(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.frame} pointerEvents="none" />

        <View style={styles.header}>
          <Image source={DESIGN_IMAGE} style={styles.logo} resizeMode="contain" />
        </View>

        <View style={styles.card}>
          <View style={styles.underline} />
          <Text style={styles.title}>LOGIN</Text>

          <View style={styles.inputContainer}>
            <View style={styles.inputRow}>
              <Text style={styles.icon}>👤</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                placeholderTextColor="#7aaeb0"
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputRow}>
              <Text style={styles.icon}>@</Text>
              <TextInput
                value={username}
                onChangeText={setUsername}
                placeholder="Username"
                placeholderTextColor="#7aaeb0"
                style={styles.input}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputRow}>
              <Text style={styles.icon}>🔒</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                placeholderTextColor="#7aaeb0"
                style={styles.input}
                secureTextEntry={!showPassword}
              />
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                <Text style={styles.show}>{showPassword ? 'Hide' : 'Show'}</Text>
              </Pressable>
            </View>

            {/* ⭐⭐ REMEMBER + FORGOT IN SAME ROW ⭐⭐ */}
<View style={styles.rememberForgotRow}>
  <View style={{ flexDirection: "row", alignItems: "center" }}>
    <Checkbox
      value={remember}
      onValueChange={setRemember}
      tintColors={{ true: '#12d1db', false: '#2b2b2b' }}
      style={styles.checkbox}
    />
    <Text style={styles.rememberText}>Remember Me</Text>
  </View>

  <Link href="/forgot-password" asChild>
    <TouchableOpacity>
      <Text style={styles.forgotPassword}>Forgot Password?</Text>
    </TouchableOpacity>
  </Link>
</View>


            <Text style={styles.orText}>or</Text>

            <TouchableOpacity
              style={styles.loginButton}
              onPress={() =>
                onLogin?.({ email, username, password, remember })
              }
            >
              <Text style={styles.loginButtonText}>LOGIN</Text>
            </TouchableOpacity>

            <View style={styles.signUpRow}>
              <Text style={styles.noAccount}>Don't have an account?</Text>

              <Link href="/signup" asChild>
                <TouchableOpacity>
                  <Text style={styles.signUp}> Sign Up</Text>
                </TouchableOpacity>
              </Link>
            </View>

          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const CARD_WIDTH = Math.min(360, SCREEN_WIDTH - 40);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#071017',
  },
  scroll: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  frame: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 30,
    borderWidth: 6,
    borderColor: 'rgba(18,209,219,0.06)',
    shadowColor: '#12d1db',
    shadowOpacity: 0.18,
    shadowRadius: 20,
  },
  header: {
    width: CARD_WIDTH,
    alignItems: 'center',
    marginTop: Platform.OS === 'web' ? 10 : 6,
  },
  logo: {
    width: CARD_WIDTH * 0.6,
    height: 90,
    marginBottom: -10,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: 20,
    padding: 18,
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'rgba(18,209,219,0.12)',
  },
  underline: {
    alignSelf: 'center',
    height: 4,
    width: 50,
    backgroundColor: '#12d1db',
    borderRadius: 2,
    marginBottom: 8,
  },
  title: {
    color: '#12d1db',
    alignSelf: 'center',
    fontSize: isSmall ? 20 : 22,
    fontWeight: '700',
    marginBottom: 12,
  },
  inputContainer: {
    marginTop: 6,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(18,209,219,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(18,209,219,0.25)',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'web' ? 10 : 8,
    marginBottom: 12,
  },
  icon: {
    marginRight: 8,
    color: '#9fdfe3',
    fontSize: 18,
  },
  input: {
    flex: 1,
    color: '#cfeff1',
    fontSize: isSmall ? 14 : 16,
    paddingVertical: 6,
  },
  show: {
    color: '#12d1db',
    marginLeft: 8,
    fontWeight: '600',
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkbox: {
    marginRight: 8,
  },
  rememberText: {
    color: '#9db9bb',
  },

  /* ⭐ NEW STYLE ⭐ */
  forgotRow: {
    alignItems: "flex-end",
    marginBottom: 10,
  },
  
  orText: {
    color: '#6d7578',
    alignSelf: 'center',
    marginVertical: 6,
  },
  loginButton: {
    backgroundColor: '#12d1db',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 6,
  },
  loginButtonText: {
    color: '#021214',
    fontWeight: '700',
    fontSize: 16,
  },
  signUpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 14,
  },
  noAccount: {
    color: '#788486',
  },
  signUp: {
    color: '#12d1db',
    fontWeight: '600',
  },
  rememberForgotRow: {
  flexDirection: "row",
  justifyContent: "space-between",  // 👈 makes Forgot Password go to right
  alignItems: "center",
  width: "100%",
  marginBottom: 10,
},

forgotPassword: {
  color: "#12d1db",
  fontSize: 14,
  fontWeight: "600",
  textAlign: "right", // 👈 EXTRA RIGHT ALIGN
  width: 130,         // optional stable width
},

});
