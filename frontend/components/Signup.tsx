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
import { router } from "expo-router";


const { width: SCREEN_WIDTH } = Dimensions.get('window');
const isSmall = SCREEN_WIDTH < 380;

// change this to './assets/register_design.png' in your project
const DESIGN_IMAGE = require('../assets/images/kamartalogo.png');

interface RegisterProps {
  onCreate?: (data: {
    fullName: string;
    email: string;
    mobile: string;
    password: string;
    otp: string;
  }) => void;
}

export default function KamartaRegisterComponent({ onCreate }: RegisterProps) {
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [mobile, setMobile] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [sendingOtp, setSendingOtp] = useState<boolean>(false);

  const sendOtp = () => {
    // Mock send OTP — replace with your API call
    setSendingOtp(true);
    setTimeout(() => {
      setSendingOtp(false);
      alert('OTP sent to ' + mobile);
    }, 800);
  };

  const handleCreate = () => {
    onCreate?.({ fullName, email, mobile, password, otp });
    alert('Create Account pressed. Data: ' + JSON.stringify({ fullName, email, mobile, otp }));
  };

  const otpDigits = 6;
  const otpBoxes = Array.from({ length: otpDigits }).map((_, i) => {
    const char = otp[i] || '';
    return (
      <View key={i} style={styles.otpBox}>
        <Text style={styles.otpChar}>{char}</Text>
      </View>
    );
  });

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.frame} pointerEvents="none" />

        <View style={styles.header}>
          <Image source={DESIGN_IMAGE} style={styles.logo} resizeMode="contain" />
        </View>

        <View style={styles.card}>
          <View style={styles.underline} />
          <Text style={styles.title}>REGISTER</Text>

          <View style={styles.inputContainer}>
            <View style={styles.inputRow}>
              <Text style={styles.icon}>👤</Text>
              <TextInput
                value={fullName}
                onChangeText={setFullName}
                placeholder="Full Name"
                placeholderTextColor="#7aaeb0"
                style={styles.input}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputRow}>
              <Text style={styles.icon}>@</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Email ID"
                placeholderTextColor="#7aaeb0"
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={[styles.inputRow, { justifyContent: 'space-between' }]}>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.icon}>📞</Text>
                <TextInput
                  value={mobile}
                  onChangeText={setMobile}
                  placeholder="Mobile Number"
                  placeholderTextColor="#7aaeb0"
                  style={[styles.input, { flex: 1 }]}
                  keyboardType="phone-pad"
                />
              </View>
              <TouchableOpacity style={styles.sendOtpBtn} onPress={sendOtp} disabled={sendingOtp}>
                <Text style={styles.sendOtpText}>{sendingOtp ? 'Sending...' : 'Send OTP'}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputRow}>
              <Text style={styles.icon}>🔒</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Confirm Password"
                placeholderTextColor="#7aaeb0"
                style={styles.input}
                secureTextEntry
              />
            </View>

            <Text style={styles.otpLabel}>Enter OTP</Text>
            <View style={styles.otpRow}>
              {otpBoxes}
            </View>

            {/* Hidden input to collect full OTP if you want */}
            <TextInput
              value={otp}
              onChangeText={setOtp}
              placeholder="Enter full OTP here (hidden)"
              placeholderTextColor="transparent"
              style={{ height: 0, width: 0, opacity: 0 }}
              keyboardType="number-pad"
            />

            <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
              <Text style={styles.createButtonText}>CREATE ACCOUNT</Text>
            </TouchableOpacity>

            <View style={styles.signUpRow}>
              <Text style={styles.noAccount}>Already have an account?</Text>
              <TouchableOpacity onPress={() => router.push("/")}>
  <Text style={styles.signUp}> Login</Text>
</TouchableOpacity>

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
  sendOtpBtn: {
    backgroundColor: '#12d1db',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 10,
  },
  sendOtpText: {
    color: '#021214',
    fontWeight: '700',
  },
  otpLabel: {
    color: '#6d7578',
    alignSelf: 'center',
    marginTop: 6,
    marginBottom: 8,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
  },
  otpBox: {
    width: 30,
    height: 30,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#12d1db',
    marginHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpChar: {
    color: '#12d1db',
    fontWeight: '700',
  },
  createButton: {
    backgroundColor: '#12d1db',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 6,
  },
  createButtonText: {
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
});