import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="w-full h-[calc(100dvh-60px)] text-white flex justify-center items-center flex-col gap-3">
      <h1 className="text-2xl md:text-6xl font-bold text-center">{`CodeWithMe < / >`}</h1>
      <p className=" text-gray-500 text-center">
        Compiler HTML, CSS, JavaScript Code on the go and share it with your
        friends
      </p>
      <Button className="mt-5" variant="default">
        <Link to="/compiler">Get Started</Link>
      </Button>
    </div>
  );
}
