import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  NavbarToggler,
  Dropdown,
} from "reactstrap";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { withStyles } from "@material-ui/core/styles";

const NavBar = (props) => {
  const { addedItems } = props;
  const StyledBadge = withStyles((theme) => ({
    badge: {
      right: -3,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
      backgroundColor: "#17abcd",
      color: "#fff",
    },
  }))(Badge);

  // //Code For Collapse
  // const [isOpen, setIsOpen] = useState(false);
  // const toggleCollapse = () => setIsOpen(!isOpen);

  // //Code For DropDown
  // const [dropdownOpen, setDropdownOpen] = useState(false);
  // const toggle = (e) => {
  //   if (e.target.classList.contains("dropdown-toggle")) {
  //     setDropdownOpen((prevState) => !prevState);
  //   }
  // };

  return (
    <div>
      <Navbar color="navbar-dark bg-dark" dark expand="md">
        <Container>
          <h1
            style={{
              textDecoration: "none",
              color: "#fff",
              fontSize: "30px",
            }}
          >
            <i
              className="fa fa-shopping-cart"
              style={{ fontSize: "25px", marginRight: "10px" }}
            ></i>
            ReactCart
          </h1>
          <Nav className="ml-auto" navbar>
            <IconButton onClick={props.handleDrawerOpen}>
              <StyledBadge
                badgeContent={props.addedItems.reduce(
                  (accumulator, currentValue) =>
                    accumulator + currentValue.quantity,
                  0
                )}
              >
                <ShoppingCartIcon style={{ color: "#fff" }} />
              </StyledBadge>
            </IconButton>
          </Nav>
          {/* Navbar */}
          {/* <NavbarToggler onClick={toggleCollapse} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle nav caret style={{ paddingRight: "20px" }}>
                  <Badge pill color="info">
                    {props.addedItems.reduce(
                      (accumulator, currentValue) =>
                        accumulator + currentValue.quantity,
                      0
                    )}
                  </Badge>
                  <i
                    className="fa fa-shopping-cart"
                    style={{ fontSize: "25px" }}
                  ></i>
                </DropdownToggle>
                <DropdownMenu right style={{ margin: "0" }}>
                  {addedItems.length > 0 ? (
                    <ListGroup flush>
                      {addedItems.map((item) => (
                        <DropdownItem key={item.product.id}>
                          <ListGroupItem>
                            <ListGroupItemHeading>
                              <span
                                style={{
                                  width: "8em",
                                  display: "inline-block",
                                }}
                              >
                                {item.product.name}
                              </span>
                              <img
                                src={item.product.image}
                                alt="Product"
                                style={{
                                  width: "30%",
                                  marginLeft: "40px",
                                  marginRight: "40px",
                                }}
                              />
                            </ListGroupItemHeading>
                            <ListGroupItemText style={{ marginTop: "0px" }}>
                              Size: <strong>{item.product.size}</strong>
                              <span style={{ margin: "0px 10px" }}>|</span>
                              Quantity: <strong> {item.quantity}</strong>
                            </ListGroupItemText>
                          </ListGroupItem>
                        </DropdownItem>
                      ))}
                    </ListGroup>
                  ) : (
                    <div style={{ padding: "10px" }}>Your cart is empty</div>
                  )}
                </DropdownMenu>
              </Dropdown>
              <Button
                outline
                color="info"
                tag={Link}
                to="/cart"
                //style={{ marginLeft: "30px" }}
              >
                Checkout Page <i className="fa fa-angle-right"></i>
              </Button>
            </Nav>
          </Collapse> */}
        </Container>
        {/* Navbar end */}
      </Navbar>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    addedItems: state.cartReducer.addedItems,
  };
};

export default connect(mapStateToProps)(NavBar);
