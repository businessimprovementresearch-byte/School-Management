import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Colors } from '@/src/theme';

interface AvatarProps {
  uri?: string | null;
  name?: string;
  size?: number;
  borderColor?: string;
}

export default function Avatar({ uri, name = '', size = 48, borderColor = Colors.primary }: AvatarProps) {
  const initials = (name ?? '')
    .split(' ')
    .map((n) => n?.[0] ?? '')
    .join('')
    .toUpperCase()
    .slice(0, 2);

  if (uri) {
    return (
      <Image
        source={{ uri }}
        style={[
          styles.image,
          { width: size, height: size, borderRadius: size / 2, borderColor },
        ]}
        contentFit="cover"
        transition={200}
      />
    );
  }

  return (
    <View
      style={[
        styles.placeholder,
        { width: size, height: size, borderRadius: size / 2, borderColor, backgroundColor: borderColor + '20' },
      ]}
    >
      <Text style={[styles.initials, { fontSize: size * 0.35, color: borderColor }]}>
        {initials || '?'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: { borderWidth: 2 },
  placeholder: { borderWidth: 2, justifyContent: 'center', alignItems: 'center' },
  initials: { fontWeight: '700' },
});
