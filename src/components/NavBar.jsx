import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const NavBar = ({ user }) => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#">Vidly</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <NavLink className="nav-link" to="/movies">Movies</NavLink>
                    <NavLink className="nav-link" to="/customers">Customers</NavLink>
                    <NavLink className="nav-link" to="/rentals">Rentals</NavLink>
                </Nav>
                <Nav>
                    {!user &&
                        <React.Fragment>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/login">Login</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/register">Register</NavLink>
                            </li>
                        </React.Fragment>}
                    {user &&
                        <React.Fragment>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/profile">{user.name}</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/logout">Logout</NavLink>
                            </li>
                        </React.Fragment>}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar;