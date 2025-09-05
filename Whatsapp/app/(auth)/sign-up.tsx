import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const CELL_COUNT = 6;

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;
    
    if (!emailAddress || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    
    try {
      // Start sign-up process using email and password provided
      await signUp.create({
        emailAddress,
        password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true);
    } catch (err: any) {
      Alert.alert('Sign Up Error', err.errors?.[0]?.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded || code.length !== CELL_COUNT) return;

    setIsLoading(true);
    
    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // Layout will handle navigation automatically
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId });
        // No manual redirect needed - auth layout will handle navigation
      } else {
        Alert.alert('Verification Failed', 'Please check your code and try again');
        setCode('');
      }
    } catch (err: any) {
      Alert.alert('Verification Error', err.errors?.[0]?.message || 'Invalid verification code');
      setCode('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!isLoaded) return;
    
    try {
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      Alert.alert('Code Sent', 'A new verification code has been sent to your email.');
    } catch {
      Alert.alert('Error', 'Failed to resend code');
    }
  };

  if (pendingVerification) {
    return (
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        
        {/* Header */}
        <View style={styles.headerCentered}>
          <Text style={styles.title}>Verify your email</Text>
          <Text style={styles.subtitle}>
            We sent a verification code to{'\n'}
            {emailAddress}
          </Text>
        </View>

        {/* Code Input */}
        <View style={styles.codeContainer}>
          <Text style={styles.codeLabel}>Enter 6-digit code</Text>
          <CodeField
            ref={ref}
            {...props}
            value={code}
            onChangeText={setCode}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <View
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}
              >
                <Text style={styles.cellText}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </View>
            )}
          />
        </View>

        {/* Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={styles.resendButton}
            onPress={handleResendCode}
          >
            <Text style={styles.resendText}>Didn&apos;t receive code? Resend</Text>
          </TouchableOpacity>
        </View>

        {/* Verify Button */}
        <View style={styles.verifyButtonContainer}>
          <TouchableOpacity 
            style={[
              styles.primaryButton, 
              (code.length !== CELL_COUNT || isLoading) && styles.primaryButtonDisabled
            ]}
            onPress={onVerifyPress}
            disabled={code.length !== CELL_COUNT || isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={styles.primaryButtonText}>Verify</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      {/* Header */}
      <View style={styles.headerSimple}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>
          Sign up to get started with WhatsApp
        </Text>
      </View>

      {/* Form */}
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Enter email"
            placeholderTextColor="#999"
            onChangeText={setEmailAddress}
            keyboardType="email-address"
            autoCorrect={false}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            value={password}
            placeholder="Enter password"
            placeholderTextColor="#999"
            secureTextEntry={true}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity 
          style={[styles.primaryButton, isLoading && styles.primaryButtonDisabled]}
          onPress={onSignUpPress}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.primaryButtonText}>Continue</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.authFooter}>
        <View style={styles.linkContainer}>
          <Text style={styles.linkText}>Already have an account? </Text>
          <Link href="/(auth)/sign-in" asChild>
            <TouchableOpacity>
              <Text style={styles.linkTextBold}>Sign in</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerSimple: {
    paddingHorizontal: 24,
    paddingTop: 100,
    paddingBottom: 40,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTextContainer: {
    flex: 1,
    paddingLeft: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    textAlign: "center",
  },
  formContainer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    backgroundColor: "#FAFAFA",
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  primaryButton: {
    backgroundColor: "#25D366",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  primaryButtonDisabled: {
    backgroundColor: "#A8D3B8",
  },
  primaryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  authFooter: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  linkText: {
    fontSize: 14,
    color: "#666",
  },
  linkTextBold: {
    fontSize: 14,
    color: "#2196F3",
    fontWeight: "600",
  },
  // Verification styles
  codeContainer: {
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  codeLabel: {
    fontSize: 16,
    color: "#000",
    textAlign: "center",
    marginBottom: 30,
    fontWeight: "500",
  },
  codeFieldRoot: {
    marginTop: 20,
  },
  cell: {
    width: 45,
    height: 45,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    textAlign: 'center',
    borderRadius: 8,
    backgroundColor: '#FAFAFA',
    marginHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  focusCell: {
    borderColor: '#25D366',
    backgroundColor: '#F0F9F0',
  },
  cellText: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
    fontWeight: '500',
  },
  actionsContainer: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  resendButton: {
    paddingVertical: 12,
  },
  resendText: {
    fontSize: 14,
    color: "#2196F3",
    textAlign: "center",
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 24,
    paddingBottom: 60,
    alignItems: "center",
  },
  headerCentered: {
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 30,
    alignItems: "center",
  },
  verifyButtonContainer: {
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 40,
    alignItems: "center",
  },
});