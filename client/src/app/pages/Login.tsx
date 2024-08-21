"use client";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      }
    );

    if (response.ok) {
      router.push("/appointmentform");
    } else {
      const data = await response.json();
      setError(data.message);
    }
  };
  const handleInputChange = (e:ChangeEvent)=>{
      const {name,value} = e.target;
      if(name === "username"){
        setUsername(value);
      }
      if(name === "password"){
        setPassword(value);
      }
  }

  return (
    <div className="h-screen w-full  bg-gradient-to-br from-[#9f4df19f] to-[#7eceee flex fl">
      <div className="w-full lg:w-2/5   px-4 py-16 sm:px-6 lg:px-8 text-black font-semibold">
        <div className="mx-auto max-w-lg">
          <Image
            className="mx-auto"
            src="/images/ikontel-logo.png"
            width={200}
            height={100}
            alt="Ikontel Logo"
          />
          <form
            onSubmit={handleSubmit}
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 backdrop-blur-sm bg-white/10"
          >
            <p className="text-center text-lg font-medium">
              Sign in to your account
            </p>

            <div>
              <label htmlFor="username" className="sr-only">
                username
              </label>

              <div className="relative">
                <input
                  type="text"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter username"
                  name="username"
                  value={username}
                  onChange={handleInputChange}
                />
                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <Image
                    src="/images/lock.png"
                    height={20}
                    width={20}
                    alt="password"
                  />
                </span>
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter password"
                  name="password"
                  onChange={handleInputChange}
                  value={password}
                />
                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <Image
                    src="/images/user.png"
                    height={20}
                    width={20}
                    alt="username"
                  />
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
            >
              Sign in
            </button>

            <p className="text-center text-sm text-gray-500">
              No account?
              <a className="underline" href="#">
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>
      <div className="w-0 hidden lg:w-3/5 bg-[url('/images/login.svg')] bg-fixed bg-center lg:flex items-center justify-center">
        <div className="w-[412px] h-[524px] rounded-xl backdrop-blur-md bg-white/20 p-5 ">
          <p className="text-4xl font-bold text-white relative">
            Welcome Back !
            <br />
            Waiting for you Login Now!
          </p>
          <Image
            className="absolute bottom-20 left-[-20px]"
            src="/images/star.svg"
            width={70}
            height={70}
            alt="start"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
