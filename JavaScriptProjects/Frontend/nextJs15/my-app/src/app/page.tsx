import Hello from "@/components/hello";
import Image from "next/image";

export default function Home() {

  console.log("Who am I .?");


  return (
    <div>
      <h1 className="text-3xl">Hello this me learning Next.js15, This is a test of HMR hot modulue replacement, it works like nodemon and other folks</h1>
      <Hello/>
    </div>
  );
}
