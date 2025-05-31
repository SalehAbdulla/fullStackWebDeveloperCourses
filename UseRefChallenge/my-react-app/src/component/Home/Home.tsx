import useFetch from "../useFetch/useFetch";


const Home = () => {

  const data = useFetch("https://jsonplaceholder.typicode.com/todos");

  return (
    <div>
      {(data && data.length) && data.map((element, index) => <section key={index}>
        <h1>{element.title}</h1>
      </section>)}
    </div>
  )
}

export default Home
