import React, { Component } from "react";
import { connect } from "react-redux";
import { register } from "./../../actions/register.action";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      username: "",
      password: "",
    };
  }
  showError = () => {
    return(
    <div className="alert alert-danger alert-dismissible">
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-hidden="true"
      >
        ×
      </button>
      <h4>
        <i className="icon fa fa-ban" /> Error!
      </h4>
        This username has been already registered.
    </div>
    )
  };

  render() {
    return (
      <div className="login-box">
        <div className="login-logo">
          <a href="../../index2.html">
            <b>CMSTOCK</b>Register
          </a>
        </div>
        {/* /.login-logo */}
        <div
          className="login-box-body"
          style={{ backgroundColor: "whitesmoke", borderRadius: 10 }}
        >
          <p className="login-box-msg">Register to start your session</p>
          <form>
            <div className="form-group has-feedback">
              <input
                onChange={(e) => this.setState({ email: e.target.value })}
                type="email"
                name="email"
                className="form-control"
                placeholder="Email"
              />
              <span className="glyphicon glyphicon-envelope form-control-feedback" />
            </div>
            <div className="form-group has-feedback">
              <input
                onChange={(e) => this.setState({ username: e.target.value })}
                type="email"
                name="username"
                className="form-control"
                placeholder="username"
              />
              <span className="glyphicon glyphicon-envelope form-control-feedback" />
            </div>
            <div className="form-group has-feedback">
              <input
                onChange={(e) => this.setState({ password: e.target.value })}
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
              />
              <span className="glyphicon glyphicon-lock form-control-feedback" />
            </div>

            {this.props.registerReducer.isError && this.showError()}

            <div className="row">
              <div className="col-xs-12">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    this.props.register(this.props.history, this.state);
                  }}
                  type="submit"
                  className="btn btn-primary btn-block btn-flat"
                >
                  Register
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    this.props.history.goBack();
                  }}
                  style={{ marginTop: 8 }}
                  className="btn btn-light btn-block btn-flat"
                >
                  Cancel
                </button>
              </div>
              {/* /.col */}
            </div>
          </form>

          <br />
        </div>
        {/* /.login-box-body */}
      </div>
    );
  }
}

const mapStateToProps = ({ registerReducer }) => ({ registerReducer });

const mapDispatchToProps = {
  register,
};
export default connect(mapStateToProps, mapDispatchToProps)(Register);
