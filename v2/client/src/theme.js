import { createTheme } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'

export default createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    background: { default: '#efefef' },
  },
  typography: {
    useNextVariants: true,
  },
})
