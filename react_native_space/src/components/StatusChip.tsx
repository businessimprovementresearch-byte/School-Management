import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, BorderRadius } from '@/src/theme';

const statusColors: Record<string, string> = {
  PRESENT: Colors.present,
  ABSENT: Colors.absent,
  LATE: Colors.late,
  EXCUSED: Colors.excused,
  ACTIVE: Colors.success,
  COMPLETED: Colors.secondary,
  WITHDRAWN: Colors.error,
  ENROLLED: Colors.success,
  PROMOTED: Colors.accent,
  GRADUATED: Colors.secondary,
};

export default function StatusChip({ status, small }: { status: string; small?: boolean }) {
  const color = statusColors[status] ?? Colors.textSecondary;
  return (
    <View style={[styles.chip, { backgroundColor: color + '18' }, small && styles.small]}>
      <Text style={[styles.text, { color }, small && styles.smallText]}>
        {status}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
  },
  small: { paddingHorizontal: Spacing.sm, paddingVertical: 2 },
  text: { fontSize: 13, fontWeight: '600' },
  smallText: { fontSize: 11 },
});
