import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Spacing } from '@/src/theme';

export default function NotFound() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Page Not Found</Text>
      <Pressable style={styles.button} onPress={() => router.replace('/')}>
        <Text style={styles.buttonText}>Go Home</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.background },
  title: { fontSize: 20, fontWeight: '700', color: Colors.textPrimary, marginBottom: Spacing.xl },
  button: { backgroundColor: Colors.primary, paddingHorizontal: Spacing.xl, paddingVertical: Spacing.md, borderRadius: 12 },
  buttonText: { color: '#fff', fontWeight: '600' },
});
