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
import { useSignIn } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return;
    
    if (!emailAddress || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      // Start the sign-in process using the email and password provided
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // Layout will handle navigation automatically
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        // No manual redirect needed - auth layout will handle navigation
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        Alert.alert('Sign In Failed', 'Please check your credentials and try again');
      }
    } catch (err: any) {
      Alert.alert('Sign In Error', err.errors?.[0]?.message || 'Failed to sign in');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>
          Sign in to your WhatsApp account
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
          onPress={onSignInPress}
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
          <Text style={styles.linkText}>Don&apos;t have an account? </Text>
          <Link href="/(auth)/sign-up" asChild>
            <TouchableOpacity>
              <Text style={styles.linkTextBold}>Sign up</Text>
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
    paddingHorizontal: 24,
    paddingTop: 100,
    paddingBottom: 40,
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
});