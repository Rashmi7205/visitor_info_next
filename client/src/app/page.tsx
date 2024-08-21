import Image from "next/image";
import Login from "./pages/Login";
import Landing from "./pages/Landing";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {/* <Login/> */}
      <Landing/>
    </main>
  );
}
