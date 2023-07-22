import React, { useMemo, useRef, useState } from "react";

export default function Product() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [products, setProduct] = useState(() => {
    const storageProducts = JSON.parse(localStorage.getItem("products"));
    return storageProducts;
  });
  const handleSubmitProduct = () => {
    setProduct((products) => {
      const newProducts = [...products, { name, price: +price }];
      const localProducts = JSON.stringify(newProducts);
      localStorage.setItem("products", localProducts);
      return newProducts;
    });
    setName("");
    setPrice("");
    nameRef.current.focus();
  };
  const nameRef = useRef();
  const total = useMemo(() => {
    const result = products.reduce((result, prod) => {
      result = result + prod.price;
      console.log("Tinh toan lai ...");
      return result;
    }, 0);
    return result;
  }, [products]);
  const handleDelete = (index) => {
    setProduct((product) => {
      const updateProducts = [...product];
      updateProducts.splice(index, 1);
      const localProducts = JSON.stringify(updateProducts);
      localStorage.setItem("products", localProducts);
      return updateProducts;
    });
  };
  return (
    <div>
      Product
      <input
        ref={nameRef}
        type="text"
        placeholder="Input product name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Input product price ..."
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <p>Total: {total}</p>
      <button type="button" onClick={handleSubmitProduct}>
        Add
      </button>
      <p>List Product</p>
      <ul>
        {products.map((product, i) => (
          <li key={i}>
            {product.name} - {product.price}
            <span
              style={{ color: "#f00", cursor: "pointer" }}
              onClick={() => handleDelete(i)}
            >
              {" "}
              x{" "}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
