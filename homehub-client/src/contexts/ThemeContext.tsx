import { createContext } from "react"

interface Theme {
  mainColor : string
  secondaryColor : string
  fontFamily : string
  fontWeightBold : number
}

const theme : Theme = {
    mainColor: '#00ee00',
    secondaryColor: '#000800',
    fontFamily: 'monospace',
    fontWeightBold: 800
  }

const ThemeContext = createContext(theme);

export type { Theme };

export default ThemeContext