import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  MDBNavbarToggler,
  MDBNavItem,
  MDBNavLink,
  MDBCollapse,
  MDBNavbarNav,
  Collapse,
  Fa
} from "mdbreact";
import Popover from "react-simple-popover";

import { DASHBOARD, PROFILE, TASKS } from "../../constants/routes";

import { logout } from "../../api/queries/index";

export default class NavBar extends Component {
  state = {
    open: false,
    collapseID: ""
  };

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  toggleCollapse = collapseID => () => {
    this.setState(state => {
      if (state.collapseID !== collapseID) {
        return { collapseID: collapseID };
      }
      return { collapseID: "" };
    });
  };

  handleLogout = () => {
    logout()
      .then(response => {
        localStorage.removeItem("token");
        window.location.href = "/login";
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <Navbar className="flexible-navbar" light expand="md" scrolling>
        <NavbarBrand href="/">Landing</NavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse("navbarCollapse13")} />
        <MDBCollapse
          id="navbarCollapse13"
          isOpen={this.state.collapseID}
          navbar
        >
          <MDBNavbarNav left>
            <MDBNavItem>
              <MDBNavLink to={DASHBOARD}>Home</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to={PROFILE}>Profile</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to={TASKS}>Tasks</MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
        <Collapse navbar>
          <MDBNavbarNav right>
            <MDBNavItem>
              <a
                className="nav-link navbar-link"
                rel="noopener noreferrer"
                target="_blank"
                href="https://pl-pl.facebook.com/mdbootstrap/"
              >
                <Fa icon="facebook" />
              </a>
            </MDBNavItem>
            <MDBNavItem>
              <a
                className="nav-link navbar-link"
                rel="noopener noreferrer"
                target="_blank"
                href="https://twitter.com/mdbootstrap"
              >
                <Fa icon="twitter" />
              </a>
            </MDBNavItem>

            <MDBNavItem>
              <div
                style={{ display: "flex", cursor: "pointer" }}
                className="nav-link navbar-link"
                rel="noopener noreferrer"
              >
                <div className="button" ref="target" onClick={this.handleClick}>
                  <Fa icon="user" className="mr-2" />
                </div>
                <Popover
                  placement="bottom"
                  container={this}
                  target={this.refs.target}
                  show={this.state.open}
                  onHide={this.handleClose}
                >
                  <div className="popover-items">
                    <MDBNavLink to={TASKS}>Tasks</MDBNavLink>
                    <MDBNavLink to={PROFILE} onClick={this.handleLogout}>
                      Log out
                    </MDBNavLink>
                  </div>
                </Popover>
              </div>
            </MDBNavItem>
          </MDBNavbarNav>
        </Collapse>
      </Navbar>
    );
  }
}
