import {Link} from "react-router-dom";


const ProductInfo = () => {

    const products = {
        name: "Laptop",
        price: 1200,
        availability: "In Stock"
    }


  return (
    <div>
      <h1>This is a product {products.name} {products.price} {products.availability}</h1>
        <Link to={"/"}>Home</Link>
    </div>
  )
}

export default ProductInfo
