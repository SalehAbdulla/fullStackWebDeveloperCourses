import "./List.css";

type Fruits = {
  id: number;
  name: string;
  calories: number;
};

type Props = {
  fruits: Fruits[];
  category: string;
};

export const List = ({ fruits, category }: Props) => {
  return (
    <div>
      <h1>{category}</h1>
      {fruits.map((fruit) => (
        <ol key={fruit.id}>
          {" "}
          {fruit.name} - {fruit.calories} calories
        </ol>
      ))}
    </div>
  );
};
