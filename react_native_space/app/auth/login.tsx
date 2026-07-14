import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from 'react-native';
import { useAuth } from '@/src/context/AuthContext';
import { Colors, Spacing, BorderRadius } from '@/src/theme';
import { Ionicons } from '@expo/vector-icons';
import { getErrorMessage } from '@/src/api/customFetch';
import { LinearGradient } from 'expo-linear-gradient';

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Please enter email and password');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await login(email.trim(), password);
    } catch (e) {
      setError(getErrorMessage(e, 'Invalid email or password'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.logoSection}>
          <View style={styles.iconCircle}>
            <Ionicons name="school" size={48} color={Colors.primary} />
          </View>
          <Text style={styles.schoolName}>Pasar Baru</Text>
          <Text style={styles.subtitle}>Gurmukhi & Kirtan Class</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Welcome Back</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="mail-outline" size={20} color={Colors.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor={Colors.textSecondary + '80'}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={20} color={Colors.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor={Colors.textSecondary + '80'}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color={Colors.textSecondary} />
              </Pressable>
            </View>
          </View>

          {error ? (
            <View style={styles.errorBanner}>
              <Ionicons name="alert-circle" size={16} color={Colors.error} />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <Pressable onPress={handleLogin} disabled={loading}>
            <LinearGradient
              colors={Colors.gradientPrimary}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.loginButton, loading && { opacity: 0.7 }]}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.loginButtonText}>Log In</Text>
              )}
            </LinearGradient>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { flexGrow: 1, justifyContent: 'center', padding: Spacing.xl },
  logoSection: { alignItems: 'center', marginBottom: Spacing.xxl },
  iconCircle: {
    width: 88, height: 88, borderRadius: 44,
    backgroundColor: Colors.primary + '15',
    justifyContent: 'center', alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  schoolName: { fontSize: 28, fontWeight: '700', color: Colors.primary },
  subtitle: { fontSize: 16, color: Colors.textSecondary, marginTop: Spacing.xs },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, shadowRadius: 12, elevation: 3,
  },
  cardTitle: { fontSize: 22, fontWeight: '700', color: Colors.textPrimary, marginBottom: Spacing.xl, textAlign: 'center' },
  inputGroup: { marginBottom: Spacing.lg },
  label: { fontSize: 14, fontWeight: '600', color: Colors.textPrimary, marginBottom: Spacing.sm },
  inputWrapper: {
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1.5, borderColor: Colors.border,
    borderRadius: BorderRadius.md, paddingHorizontal: Spacing.md, height: 48,
  },
  inputIcon: { marginRight: Spacing.sm },
  input: { flex: 1, fontSize: 16, color: Colors.textPrimary },
  errorBanner: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.error + '10', padding: Spacing.md,
    borderRadius: BorderRadius.sm, marginBottom: Spacing.lg, gap: Spacing.sm,
  },
  errorText: { color: Colors.error, fontSize: 14 },
  loginButton: { height: 50, borderRadius: BorderRadius.md, justifyContent: 'center', alignItems: 'center' },
  loginButtonText: { color: '#fff', fontSize: 17, fontWeight: '700' },
});
