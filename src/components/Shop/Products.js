import React from "react";
import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const dummyProducts = [
  {
    id: "p1",
    title: "Book",
    price: 6,
    description: "This is a first product - amazing!",
  },
  {
    id: "p2",
    title: "Keyboard",
    price: 12,
    description: "Amazing touch feel and helps to be more productive",
  },
];

const Products = () => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {dummyProducts.map((item) => (
          <ProductItem
            key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            description={item.description}
          />
        ))}
      </ul>
    </section>
  );
};

// export default Products;

export default React.memo(Products);
