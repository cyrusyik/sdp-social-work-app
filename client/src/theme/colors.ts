import { StyleSheet } from "react-native";
import Constants from 'expo-constants';
import { LinearGradient } from "react-native-svg";
const StatusBarHeight = Constants.statusBarHeight;

export const colors = {
  background: "#F8FAFC",
  primaryText: "#0D0D0D",
  secondaryText: "#959595",
  alert: "#F61717",
  alertActive: "#D30909",
  pass: "#2FDB3D",
  primary: "#112664",
  secondary: "#64748B",
  primaryActive: "#0B1A45",
  stroke: "#DCDCDC",
  strokeActive: "#C2C2C2",
  white: "#ffffff",
  whiteActive: "#F5F5F5",
  black: '#000000',
  buttonInactive: "#959595",
  filterActive: "#DBDBDB",
  tagInactive: "#EDEDED",
  placeholderInactive: "#C4C4C4",
  placeholderActive: "#959595",
  inputFieldInactive: "#DCDCDC",
  primaryLinear: {
    colors: ['#1C3C97', '#112664'] as const,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  }
};

export const globalStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 32,
    alignSelf: 'stretch',
    backgroundColor: colors.background,
    paddingTop: 84,
    paddingHorizontal: 20,
  },
  inputInactive: {
    backgroundColor: colors.inputFieldInactive,
    height: 48,
    width: '100%',
    borderRadius: 8,
    paddingInline: 16,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconBox: {
    width: 48,
    height: 48,
  }
  ,
  inputActive: {
    backgroundColor: colors.white,
    borderWidth: 1,
    
  }
});
