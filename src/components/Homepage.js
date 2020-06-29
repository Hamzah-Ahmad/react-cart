import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Product from "./Product";
import { Container, Row, Col, Input, Label, CustomInput } from "reactstrap";
import NavBar from "./NavBar";

import {
  getAllProducts,
  // getProductsByPrice,
  // getProductsBySize
} from "../actions/homepageActions";

const Homepage = (props) => {
  // eslint-disable-next-line
  //const [filter, setFilter] = useState(false);
  const [size, setSize] = useState("");
  const [price, setPrice] = useState(320);

  useEffect(
    () => {
      props.dispatch(getAllProducts(size, price));
    }, // eslint-disable-next-line
    []
  );

  useEffect(
    () => {
      props.dispatch({
        type: "GET_FILTERED_PRODUCTS",
        payload: { size, price },
      });
    }, // eslint-disable-next-line
    [price, size]
  );

  return (
    <div>
      <NavBar />

      <Container>
        <Row>
          <Col xs="6" lg="2">
            <h3 style={{ marginTop: "50px" }}>Filters:</h3>
            <Label for="priceRange" style={{ marginTop: "20px" }}>
              Max Price:{" "}
              <span style={{ color: "green", marginLeft: "10px" }}>
                ${price}
              </span>
            </Label>
            <CustomInput
              tooltip="true"
              type="range"
              name="priceRange"
              id="priceRange"
              defaultValue="320"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              step="10"
              max="320"
              min="110"
            />
            <Row>
              <Col xs="6">
                <small>$110</small>
              </Col>
              <Col xs="6">
                <small className="float-right">$320</small>
              </Col>
            </Row>

            <Label for="size" style={{ marginTop: "30px" }}>
              Size:
            </Label>
            <Input
              type="select"
              name="select"
              id="size"
              // style={{ width: "40%" }}
              onChange={(e) => {
                setSize(e.target.value);
              }}
            >
              <option value="">All Sizes</option>
              <option value="S">Small</option>
              <option value="M">Medium</option>
              <option value="L">Large</option>
              <option value="XL">XL</option>
            </Input>
          </Col>
          <Col xs="12" lg="10">
            <Row style={{ marginTop: "50px" }}>
              {props.products.map((product) => (
                <Col xs="12" sm="6" md="4" key={product.id}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.homepageReducer.products,
    addedItems: state.cartReducer.addedItems,
  };
};

/* <Button
        onClick={() => {
          setFilter("M");
          props.dispatch({ type: "GET_PRODUCTS_BY_SIZE", payload: "M" });
        }}
      >
        Filter Size
      </Button>
      <Button
        onClick={() => {
          setFilter(180);
          props.dispatch({ type: "GET_PRODUCTS_BY_PRICE", payload: 180 });
        }}
      >
        Filter Price
      </Button>
      <Button
        onClick={() => {
          setFilter("");
        }}
      >
        Remove Filter
      </Button> */
export default connect(mapStateToProps)(Homepage);
