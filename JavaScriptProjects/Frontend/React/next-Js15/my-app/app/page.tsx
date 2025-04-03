import Image from "next/image";
import Hello from "./components/hello";

export default function Home() {

  console.log(`Who am I ? -- SERVER/CLIENT`);

  return (
    <div>
      <Hello />
    </div>
  );

}
