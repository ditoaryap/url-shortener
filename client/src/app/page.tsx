"use client";
import { use, useState } from "react";

export default function Home() {
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const url = event.target.elements.url.value;

    try {
      const response = await fetch("http://localhost:3001", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [count, setCount] = useState(0);
  return (
    <main>
      <h1 className="title text-2xl text-center mt-[50px]">URL Shortener</h1>
      <div className="mt-10 mx-[350px] bg-slate-300 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h1 className="bold text-3xl text-center">
            Paste the URL to be shortened
          </h1>
          <div>
            <input
              type="text"
              className="px-4 max-w-maxblock w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
            />
            <div className="flex justify-center mt-5">
              <button
                type="submit"
                className="flex w-full justify-center p-4 hover:bg-red-300"
              >
                Submit URL
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* EXAMPLE  */}

      <div>
        <h1>COUNT</h1>
        <p>berapa yang di tekan {count}</p>
        <button className="bg-red-200 p-3" onClick={() => setCount(count + 1)}>
          TAMBAH
        </button>
      </div>
    </main>
  );
}
