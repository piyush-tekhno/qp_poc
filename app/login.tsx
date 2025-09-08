// app/login.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  useColorScheme,
} from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';




export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  const colorScheme = useColorScheme(); // 👈 detects system theme (light/dark)

  const isDark = colorScheme === 'dark';
  const theme = getDynamicTheme(isDark); // 👈 use helper below

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setIsLoading(true);
    const success = await login(email, password);
    setIsLoading(false);

    if (!success) {
      Alert.alert('Login Failed', 'Invalid credentials');
      return;
    }

    router.push("/Dashboard/Dashboard");
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={styles.inner}>
        <Text style={[styles.title, { color: theme.textPrimary }]}>
          Welcome Back
        </Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Sign in to your account
        </Text>
        
        <View style={[styles.form, { backgroundColor: theme.card, shadowColor: theme.shadow }]}>
          <TextInput
            style={[
              styles.input, 
              { 
                borderColor: isDark ? '#555' : '#ddd',
                color: theme.textPrimary,
                backgroundColor: theme.inputBackground,
              }
            ]}
            placeholder="Email"
            placeholderTextColor={theme.placeholder}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          
          <TextInput
            style={[
              styles.input, 
              { 
                borderColor: isDark ? '#555' : '#ddd',
                color: theme.textPrimary,
                backgroundColor: theme.inputBackground,
              }
            ]}
            placeholder="Password"
            placeholderTextColor={theme.placeholder}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          
          <TouchableOpacity 
            style={[
              styles.button, 
              { backgroundColor: isLoading ? theme.disabled : theme.primary }
            ]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={[styles.forgotPasswordText, { color: theme.link }]}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme.textSecondary }]}>
            Don't have an account? 
          </Text>
          <TouchableOpacity>
            <Text style={[styles.signUpText, { color: theme.link }]}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

// 🎨 Dynamic theme function
function getDynamicTheme(isDark: boolean) {
  return {
    background: isDark ? '#121212' : '#f5f5f5',
    textPrimary: isDark ? '#fff' : '#333',
    textSecondary: isDark ? '#aaa' : '#666',
    card: isDark ? '#1e1e1e' : '#fff',
    inputBackground: isDark ? '#2c2c2c' : '#fff',
    placeholder: isDark ? '#888' : '#999',
    primary: '#007AFF',
    link: '#007AFF',
    disabled: '#aaa',
    shadow: isDark ? '#000' : '#000',
  };
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  form: {
    padding: 20,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  forgotPassword: {
    alignItems: 'center',
  },
  forgotPasswordText: {
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
  },
  signUpText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

