import React from 'react'; import {
    Nav, NavItem, Input, Button, InputGroupAddon, InputGroup
} from 'reactstrap';
import { Link } from 'react-router-dom';

export const Header = ({ handleOnKeyUp, inSearch, clearSearch }) => {
    return (
        <header>
            <div className="container">
                <Nav className="justify-content-end" id="navbar">
                    <NavItem>
                        <Link className="nav-link" to="/">Home</Link>
                    </NavItem>
                    <NavItem>
                        <Link className="nav-link" to="/favourite">Favourite</Link>
                    </NavItem>
                </Nav>

                <div className="row justify-content-md-center">
                    <div className="col col-lg-6 text-center">
                        <h3>The Beer Bank</h3>
                        <small>Find your favorite beer here</small>
                        <InputGroup>
                            <Input onChange={handleOnKeyUp} type="text" id="search" aria-describedby="search" placeholder="Search for beer name" />
                            <InputGroupAddon addonType="append">
                                {!inSearch && <Button disabled color="secondary"><i className="fa fa-times"></i></Button>}
                                {inSearch && <Button onClick={clearSearch} color="secondary"><i className="fa fa-times"></i></Button>}
                            </InputGroupAddon>
                        </InputGroup>
                    </div>
                </div>
            </div>
        </header>
    )
}
