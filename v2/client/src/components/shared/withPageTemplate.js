import React from 'react'

const withPageTemplate = WrappedComponent =>
  class NewComponent extends React.Component {
    render() {
      return (
        <div className="mainContainer">
          <div className="mainContent">
            <WrappedComponent {...this.props}></WrappedComponent>
          </div>
        </div>
      )
    }
  }

export default withPageTemplate
