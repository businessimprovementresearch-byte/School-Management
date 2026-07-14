import { Tabs, Redirect } from 'expo-router';
import { useAuth } from '@/src/context/AuthContext';
import LoadingScreen from '@/src/components/LoadingScreen';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/src/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabsLayout() {
  const { isAuthenticated, isLoading } = useAuth();
  const insets = useSafeAreaInsets();

  if (isLoading) return <LoadingScreen />;
  if (!isAuthenticated) return <Redirect href="/auth/login" />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor: Colors.divider,
          paddingBottom: insets.bottom,
          height: 60 + insets.bottom,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="students"
        options={{
          title: 'Students',
          tabBarIcon: ({ color, size }) => <Ionicons name="people" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="classes"
        options={{
          title: 'Classes',
          tabBarIcon: ({ color, size }) => <Ionicons name="book" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="attendance"
        options={{
          title: 'Attendance',
          tabBarIcon: ({ color, size }) => <Ionicons name="calendar-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'More',
          tabBarIcon: ({ color, size }) => <Ionicons name="menu" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
