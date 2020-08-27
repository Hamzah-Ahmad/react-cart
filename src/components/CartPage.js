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
                          {/* <Button
                          outline
                          color="danger"
                          size="sm"
                          onClick={() => {
                            props.dispatch({
                              type: "DECREASE_QUANTITY",
                              payload: item.product,
                            });
                          }}
                          style={{ borderRadius: "50px" }}
                        >
                          <i
                            className="fa fa-minus"
                            style={{ fontSize: "12px" }}
                          ></i>
                        </Button> */}
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
                          {/* <Button
                          outline
                          color="warning"
                          size="sm"
                          onClick={() => {
                            props.dispatch({
                              type: "INCREASE_QUANTITY",
                              payload: item.product,
                            });
                          }}
                          style={{ marginLeft: "10px", borderRadius: "50px" }}
                        >
                          <i
                            className="fa fa-plus"
                            style={{ fontSize: "12px" }}
                          ></i>
                        </Button> */}
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
                      {/* </Col> */}
                      {/* <Col xs="4"> */}
                    </span>
                    <span>
                      <img
                        src={item.product.image}
                        // width={10}
                        // height={10}
                        className="cart-img"
                        alt={item.product.name}
                      />
                    </span>
                  </span>
                  {/* </Col>
                  </Row> */}
                </ListGroupItem>
              ))}
            </ListGroup>
            <h3
              style={{
                textAlign: "right",
                paddingRight: "5%",
                marginTop: "20px",
              }}
            >
              Total: ${total}
            </h3>
            {/* 
            <Button
              size="lg"
              color="info"
              block
              style={{
                position: "absolute",
                bottom: 0,
              }}
              onClick={toggle}
            >
              Complete Checkout
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
              <ModalHeader>Checkout</ModalHeader>
              <ModalBody>
                Your total is:{" "}
                <span style={{ marginLeft: "5px", color: "green" }}>
                  ${total}
                </span>
                <div>Thank you for shopping with us!</div>
              </ModalBody>
            </Modal> */}
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
          onClick={toggle}
          disabled={!props.addedItems.length > 0}
        >
          Complete Checkout
        </Button>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader>Checkout</ModalHeader>
          <ModalBody>
            Your total is:{" "}
            <span style={{ marginLeft: "5px", color: "green" }}>${total}</span>
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
