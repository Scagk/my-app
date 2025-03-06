"use client";
import Input from "@/app/components/material/input";
import { fetchActionApi, setAccessToken } from "@/app/utils/action";
import { useState } from "react";
interface LoginResponse {
  jwt: string;
  user: {
    id: number;
    documentId: number;
  }
}
export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    let body = {
      identifier: identifier,
      password: password,
    };
    const res = await fetchActionApi("/api/auth/local", {
      method: "POST",
      body: JSON.stringify(body),
    });
    console.log(res);
    if(res) {
        if (res.status === 200) {
          const  token= res.data as LoginResponse;
          await setAccessToken(token.jwt);
            window.location.href = "/";
        } else {
            alert("เข้าสู่ระบบไม่สําเร็จ");
        }
    }
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          LOGIN
        </h1>
        <form onSubmit={(e) => login(e)}>
          <Input
            type="text"
            id="identifier"
            value={identifier}
            label="Username"
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
          
          <Input
            type="password"
            id="password"
            value={password}
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
