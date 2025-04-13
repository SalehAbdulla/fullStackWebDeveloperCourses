import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Home",
};

const HomePage = () => {
  return (
    <>
      <div className="flex flex-col justify-content-center space-y-6">
        <h1>HomePage</h1>
        <Button>Button</Button>
      </div>
    </>
  );
};

export default HomePage;
