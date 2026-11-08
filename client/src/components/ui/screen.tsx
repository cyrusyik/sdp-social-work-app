import { ScrollView, View, type StyleProp, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '@/theme/theme';

type ScreenProps = {
  children: React.ReactNode;
  contentStyle?: StyleProp<ViewStyle>;
  scroll?: boolean;
};

export function Screen({ children, contentStyle, scroll = true }: ScreenProps) {
  const insets = useSafeAreaInsets();
  const baseContentStyle = [
    {
      flexGrow: 1,
      gap: theme.spacing.lg,
      padding: 20,
      paddingTop: Math.max(insets.top + 24),
      paddingBottom: Math.max(insets.bottom + 24),
    },
    contentStyle,
  ];

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background}}>
      {scroll ? (
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          contentContainerStyle={baseContentStyle}>
          {children}
        </ScrollView>
      ) : (
        <View style={[{ flex: 1, }, ...baseContentStyle]}>{children}</View>
      )}
    </View>
  );
}