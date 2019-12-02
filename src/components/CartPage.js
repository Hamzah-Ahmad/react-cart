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
  Col
} from "reactstrap";

import NavBar from "./NavBar";

const CartPage = props => {
  const sortAddedItems = arr => {
    arr.sort((a, b) => {
      return a.product.name > b.product.name ? 1 : -1;
    });
    return arr;
  };

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

  const toggle = () => setModal(!modal);
  return (
    <div>
      <NavBar />
      <Container>
        <h1 className="display-4 text-center" style={{ margin: "30px 0" }}>
          Checkout Page
        </h1>
        {props.addedItems.length > 0 ? (
          <div>
            <ListGroup>
              {sortAddedItems(props.addedItems).map(item => (
                <ListGroupItem key={Math.random()}>
                  <Row>
                    <Col xs="8">
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
                        Quantity:
                        <Button
                          outline
                          color="danger"
                          size="sm"
                          onClick={() => {
                            props.dispatch({
                              type: "DECREASE_QUANTITY",
                              payload: item.product
                            });
                          }}
                          style={{ marginLeft: "10px", borderRadius: "50px" }}
                        >
                          <i
                            className="fa fa-minus"
                            style={{ fontSize: "12px" }}
                          ></i>
                        </Button>
                        <span style={{ marginLeft: "10px" }}>
                          {item.quantity}
                        </span>
                        <Button
                          outline
                          color="warning"
                          size="sm"
                          onClick={() => {
                            props.dispatch({
                              type: "INCREASE_QUANTITY",
                              payload: item.product
                            });
                          }}
                          style={{ marginLeft: "10px", borderRadius: "50px" }}
                        >
                          <i
                            className="fa fa-plus"
                            style={{ fontSize: "12px" }}
                          ></i>
                        </Button>
                      </ListGroupItemText>
                    </Col>
                    <Col xs="4">
                      <img
                        src={item.product.image}
                        className="float-right cart-img"
                        alt={item.product.name}
                      />
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>
            <h3
              style={{
                textAlign: "right",
                paddingRight: "5%",
                marginTop: "20px"
              }}
            >
              Total: ${total}
            </h3>

            <Button
              size="lg"
              color="info"
              block
              style={{ marginTop: "30px", marginBottom: "30px" }}
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
            </Modal>
          </div>
        ) : (
          <div>
            <h1
              className="display-4"
              style={{ textAlign: "center", marginTop: "20vh" }}
            >
              Your cart is empty
            </h1>
          </div>
        )}
      </Container>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    addedItems: state.cartReducer.addedItems
  };
};

export default connect(mapStateToProps)(CartPage);
