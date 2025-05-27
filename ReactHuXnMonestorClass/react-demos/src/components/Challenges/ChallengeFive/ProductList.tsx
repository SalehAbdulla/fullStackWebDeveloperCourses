
const ProductList = () => {
    const products = [
        {id: 1, name: "Phone", price: "$699"},
        {id: 2, name: "Laptop", price: "$1299"},
        {id: 3, name: "Headphones", price: "$199"},
    ]
  
    return (
    <div>
      <ul>
        {products.map((element, index) => (
            <li key={index}>{element.name} {element.price}</li>
        ))}
      </ul>
    </div>
  )
}

export default ProductList
