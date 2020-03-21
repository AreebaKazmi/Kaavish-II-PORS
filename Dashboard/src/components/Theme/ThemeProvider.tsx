// FIXME: https://github.com/mirumee/Kaavish/issues/4174
import OldMuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import MuiThemeProvider from "@material-ui/styles/ThemeProvider";
import React from "react";

import Baseline from "../../Baseline";
import createTheme, { IThemeColors } from "../../theme";

const light: IThemeColors = {
  autofill: "#5D5881",
  background: {
    default: "#1D1E1F",
    paper: "#2E2F31"
  },
  checkbox: {
    default: "#FFFFFF"
  },
  divider: "#252728",
  error: "#C22D74",
  font: {
    button: "#202124",
    default: "#FCFCFC",
    gray: "#9E9D9D",
    textButton: "#FFFFFF",
    textDisabled: "#FCFCFC"
  },
  gray: {
    default: "#202124",
    disabled: "rgba(32, 33, 36, 0.6)"
  },
  input: {
    border: "#9d9d9d",
    default: "#25262A",
    disabled: "#393939",
    disabledBackground: "#292A2D",
    disabledText: "#9D9D9D",
    error: "#aa2867", // rose
    text: "#FCFCFC",
    textHover: "#616161"
  },
  paperBorder: "#252728",
  primary: "#9cdd24", 
  secondary: "#5A1666" 
};
const dark: IThemeColors = {
  autofill: "#f4f6c5",
  background: {
    default: "#1D1E1F",
    paper: "#FFFFFF"
  },
  checkbox: {
    default: "#616161"
  },
  divider: "#EAEAEA",
  error: "#aa2867", 
  font: {
    button: "#FFFFFF",
    default: "#3D3D3D",
    gray: "#616161",
    textButton: "#9cdd24", 
    textDisabled: "#616161"
  },
  gray: {
    default: "#C8C8C8",
    disabled: "rgba(216, 216, 216, 0.3)"
  },
  input: {
    border: "#BDBDBD",
    default: "#FFFFFF",
    disabled: "#EAEAEA",
    disabledBackground: "#F4F4F4",
    disabledText: "#9D9D9D",
    error: "#8C2054",
    text: "#3D3D3D",
    textHover: "#616161"
  },
  paperBorder: "#EAEAEA",
  primary: "#9cdd24", 
  secondary: "#5A1666" 
};

interface IThemeContext {
  isDark: boolean;
}
export const ThemeContext = React.createContext<IThemeContext>({
  isDark: false,
});

interface ThemeProviderProps {
  isDefaultDark?: boolean;
}
const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  isDefaultDark
}) => {
  const [isDark, setDark] = React.useState(isDefaultDark);
;

  return (
    <ThemeContext.Provider
      value={{
        isDark
      }}
    >
      <OldMuiThemeProvider theme={createTheme(isDark ? dark : light)}>
        <MuiThemeProvider theme={createTheme(isDark ? dark : light)}>
          <Baseline />
          {children}
        </MuiThemeProvider>
      </OldMuiThemeProvider>
    </ThemeContext.Provider>
  );
};
ThemeProvider.defaultProps = {
  isDefaultDark: false
};
export default ThemeProvider;
