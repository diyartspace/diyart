import { createMuiTheme } from '@material-ui/core'

import { uiConstants } from './ui-constants'

export const appTheme = createMuiTheme({
  palette: {
    background: {
      default: '#ffffff',
    },
    primary: uiConstants.primaryColor,
  },
  overrides: {
    MuiAppBar: {
      root: {
        boxShadow: 'none',
      },
    },
    MuiCardContent: {
      root: {
        padding: 16,
        '&:last-child': {
          paddingBottom: 16,
        },
      },
    },
    MuiOutlinedInput: {
      input: {
        padding: uiConstants.inputPadding,
      },
    },
  },
})
