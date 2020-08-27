import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Product from "./Product";
import CartPage from "./CartPage";
import Slider from "@material-ui/core/Slider";
import Drawer from "@material-ui/core/Drawer";
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
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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

  const marks = [
    {
      value: 110,
      label: "$110",
    },
    {
      value: 200,
      label: "$200",
    },
    {
      value: 320,
      label: "$320",
    },
  ];

  return (
    <div style={{ scrollbarWidth: "none" }}>
      <NavBar handleDrawerOpen={handleDrawerOpen} />
      <Container>
        <Drawer
          // className={classes.drawer}
          variant="persistent"
          anchor="right"
          open={open}
          // classes={{
          //   paper: classes.drawerPaper,
          // }}
        >
          <CartPage handleDrawerClose={handleDrawerClose} />
        </Drawer>
        <Row>
          <Col xs="6" lg="2">
            <h3 style={{ marginTop: "50px" }}>Filters:</h3>
            <Label for="priceRange" style={{ marginTop: "20px" }}>
              Max Price:{" "}
              <span style={{ color: "#17abcd", marginLeft: "5px" }}>
                ${price}
              </span>
            </Label>
            <Slider
              // tooltip="true"
              // type="range"
              // name="priceRange"
              // id="priceRange"
              // defaultValue="320"
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              onChange={(e, v) => {
                console.log("test");
                console.log(v);
                setPrice(v);
              }}
              step={10}
              max={320}
              min={110}
              marks={marks}
              defaultValue={320}
            />
            {/* <Row>
              <Col xs="6">
                <small>$110</small>
              </Col>
              <Col xs="6">
                <small className="float-right">$320</small>
              </Col>
            </Row> */}

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
            {/* <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={""}
              onChange={(e) => {
                setSize(e.target.value);
              }}
            >
              <MenuItem value={""}>All Sizes</MenuItem>
              <MenuItem value={"S"}>Small</MenuItem>
              <MenuItem value={"M"}>Thirty</MenuItem>
              <MenuItem value={"L"}>Thirty</MenuItem>
              <MenuItem value={"XL"}>Thirty</MenuItem>
            </Select> */}
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
