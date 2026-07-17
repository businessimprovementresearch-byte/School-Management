export const Colors = {
  primary: '#FF6B00',
  primaryDark: '#E55A00',
  secondary: '#1A237E',
  accent: '#FFB300',
  background: '#FFF8F0',
  surface: '#FFFFFF',
  textPrimary: '#1A1A2E',
  textSecondary: '#5A5A6E',
  success: '#2E7D32',
  error: '#D32F2F',
  warning: '#F57C00',
  present: '#2E7D32',
  absent: '#D32F2F',
  unsure: '#757575',
  border: '#E0E0E0',
  divider: '#F0F0F0',
  gradientPrimary: ['#FF6B00', '#FF8F00'] as const,
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const FontFamily = {
  heading: 'Poppins_600SemiBold',
  headingBold: 'Poppins_700Bold',
  body: 'Nunito_400Regular',
  bodySemiBold: 'Nunito_600SemiBold',
  bodyBold: 'Nunito_700Bold',
  // Fallbacks
  headingFallback: 'System',
  bodyFallback: 'System',
};

// Convenience alias used by screens
export const theme = {
  colors: {
    ...Colors,
    text: Colors.textPrimary,
    primaryLight: '#FFF3E0',
  },
};
