import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Button,
  Container,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Col,
} from "reactstrap";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

// import NavBar from "./NavBar";

const CartPage = (props) => {
  const [total, setTotal] = useState(0);
  const [finalCost, setFinalCost] = useState(0);

  useEffect(() => {
    setTotal(
      props.addedItems.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.product.price * currentValue.quantity,
        0
      )
    );
  }, [props.addedItems]);

  //Code for handling model
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };
  const checkout = () => {
    toggle();
    setFinalCost(total);
    props.dispatch({
      type: "EMPTY_CART",
    });
    props.handleDrawerClose();
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        overflowX: "hidden",
        scrollbarWidth: "thin",
      }}
    >
      <div>
        <div
          className="text-center"
          style={{ margin: "60px", marginTop: "30px", marginBottom: "30px" }}
        >
          <IconButton
            onClick={props.handleDrawerClose}
            style={{ position: "absolute", left: 0 }}
          >
            <ChevronRightIcon />
          </IconButton>
          <span style={{ fontSize: "25px", marginRight: "10px" }}>
            Your Cart
          </span>

          <i className="fa fa-shopping-cart" style={{ fontSize: "25px" }}></i>
        </div>
        {props.addedItems.length > 0 ? (
          <div>
            <ListGroup>
              {props.addedItems.map((item) => (
                <ListGroupItem key={Math.random()}>
                  {/* <Row>
                    <Col xs="8"> */}
                  <span
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <span>
                      <ListGroupItemHeading>
                        <span className="cart-list-header">
                          {item.product.name}
                        </span>
                      </ListGroupItemHeading>
                      <ListGroupItemText>
                        Size: <strong>{item.product.size}</strong> |{" "}
                        <span style={{ marginLeft: "2px" }}>Price: </span>
                        <strong>${item.product.price}</strong>
                      </ListGroupItemText>
                      <ListGroupItemText>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          Quantity:
                          <IconButton
                            aria-label="delete"
                            onClick={() => {
                              props.dispatch({
                                type: "DECREASE_QUANTITY",
                                payload: item.product,
                              });
                            }}
                          >
                            <RemoveIcon />
                          </IconButton>
                          <span>{item.quantity}</span>
                          <IconButton
                            aria-label="delete"
                            onClick={() => {
                              props.dispatch({
                                type: "INCREASE_QUANTITY",
                                payload: item.product,
                              });
                            }}
                          >
                            <AddIcon />
                          </IconButton>
                        </div>
                      </ListGroupItemText>
                    </span>
                    <span>
                      <img
                        src={item.product.image}
                        width={90}
                        height={60}
                        className="cart-img"
                        alt={item.product.name}
                      />
                    </span>
                  </span>
                </ListGroupItem>
              ))}
            </ListGroup>
            <h3
              style={{
                textAlign: "right",
                paddingRight: "5%",
                marginBottom: "20px",
                paddingBottom: "50px",
              }}
            >
              Total: ${total}
            </h3>
          </div>
        ) : (
          <div>
            <div style={{ textAlign: "center", fontSize: "18px" }}>
              Your cart is empty
            </div>
          </div>
        )}

        <Button
          size="lg"
          color={props.addedItems.length > 0 ? "info" : undefined}
          block
          style={{
            position: "absolute",
            bottom: 0,
          }}
          onClick={checkout}
          disabled={!props.addedItems.length > 0}
        >
          Complete Checkout
        </Button>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader>Checkout</ModalHeader>
          <ModalBody>
            Your total is:{" "}
            <span
              style={{
                marginLeft: "5px",
                color: "#17abcd",
                fontWeight: "bold",
              }}
            >
              ${finalCost}
            </span>
            <div>Thank you for shopping with us!</div>
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    addedItems: state.cartReducer.addedItems,
  };
};

export default connect(mapStateToProps)(CartPage);
