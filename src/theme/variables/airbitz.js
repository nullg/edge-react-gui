// @flow

export const colors = {
  gradient: {
    light: '#3b7ada',
    dark:  '#2b5698',
  },

  primary:   '#2a5799',
  secondary: '#4977bb',

  accentGreen:  '#7fc343',
  accentOrange: '#f7a623',
  accentRed:    '#f03a47',

  black: '#000000',
  gray1: '#58595c',
  gray2: '#909091',
  gray3: '#d8d6d8',
  gray4: '#F7F7F7',
  white: '#FFFFFF',
}

export const opacity = {
  active: 0.3
}

export const font = {
  default:  'SourceSansPro-Black'
}

// https://projects.invisionapp.com/d/main#/console/10954562/239168414/inspect
export default {
  BUTTONS: {
    HEIGHT: 44
  },
  DEBUG: {
    COLORS: {
      HIGHLIGHT: '#f03a47'
    }
  },
  FONTS: {
    DEFAULT: 'SourceSansPro-Black'
  },

  OPACITY: {
    ACTIVE: 0.3,

    FULL: 1.0,
    HIGH: 0.8,
    MID: 0.5,
    LOW: 0.1,
    NONE: 0.0
  },

  ALPHA: {
    FULL: 99,
    HIGH: 80,
    MID: 50,
    LOW: 10,
    NONE: 0
  },

  COLORS: {
    PRIMARY:   '#0D2145',
    SECONDARY: '#0E4B75',

    GRADIENT: {
      DARK:  '#0D2145',
      LIGHT: '#0E4B75'
    },

    ACCENT_GREEN:  '#0073D9',
    ACCENT_ORANGE: '#F1AA19',
    ACCENT_RED:    '#E85466',
    ACCENT_MINT:   '#66EDA8',

    BLACK:  '#25292C',
    GRAY_1: '#4A5157',
    GRAY_2: '#87939E',
    GRAY_3: '#D9E3ED',
    GRAY_4: '#F4F5F6',
    WHITE:  '#FFFFFF',
    CLEAR:  'rgba(0, 0, 0, 0)',

    TRANSPARENT: 'transparent',

    ROW_PRESSED: '#D9E3ED', // same as GRAY_3
  }
}
