import React from "react";
import { connect } from "react-redux";

import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button
} from "reactstrap";

const Product = props => {
  const { product } = props;

  const searchArray = obj => {
    let found = false;
    if (props.addedItems.some(objInCart => objInCart.product.id === obj.id)) {
      found = true;
    }
    return found;
  };
  const addFunc = () => {
    if (!searchArray(product)) {
      props.dispatch({
        type: "ADD_TO_CART",
        payload: product
      });
    } else {
      props.dispatch({
        type: "INCREASE_QUANTITY",
        payload: product
      });
    }
  };
  return (
    <div>
      <Card
        style={{
          height: "30%",
          //padding: "40px 0px 0px 20px",
          margin: "10px"
        }}
      >
        <CardImg src={product.image} alt="Product" style={{ width: "100%" }} />
        <CardBody>
          <CardTitle>{product.name}</CardTitle>
          <CardText>
            Size: {product.size} Price: ${product.price}
          </CardText>

          <Button onClick={addFunc}>Add To Cart</Button>
        </CardBody>
      </Card>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    addedItems: state.cartReducer.addedItems
  };
};
export default connect(mapStateToProps)(Product);
