import React, { Component } from "react"
import Button from "@material-ui/core/Button"
import { withRouter } from "react-router"
import {
  isUserLoggedIn,
  withCurrentUser,
  listenForOpenSignUpDialog
} from "../../utils/userUtils"
import LoginDialog from "./loginDialog"
import Typography from "@material-ui/core/Typography"

class LoginButton extends Component {
  state = {
    dialogOpen: false,
    login: true
  }

  componentDidMount() {
    listenForOpenSignUpDialog(() => {
      this.setState({ dialogOpen: true, login: false })
    })
  }

  toggleDialog = () => {
    this.setState({ dialogOpen: !this.state.dialogOpen, login: true })
  }

  renderUserInfo = currentUser => {
    if (currentUser && currentUser.id) {
      return `Welcome, ${currentUser.firstName}`
    } else {
      return ""
    }
  }

  render() {
    const { currentUser } = this.props

    return isUserLoggedIn() ? (
      <Typography
        variant="button"
        color="inherit"
        className={this.props.className}
      >
        {this.renderUserInfo(currentUser)}
      </Typography>
    ) : (
      <span>
        <Button
          onClick={this.toggleDialog}
          className={this.props.className}
          color="inherit"
        >
          Login
        </Button>
        <LoginDialog
          open={this.state.dialogOpen}
          login={this.state.login}
          toggleDialog={this.toggleDialog}
        />
      </span>
    )
  }
}

export default withCurrentUser(withRouter(LoginButton))
