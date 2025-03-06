"use client";
import Input from "@/app/components/material/input";
import { fetchActionApi } from "@/app/utils/action";
import { useState } from "react";

export default function Register() {
  const [username, setIdentifier] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setCPassword] = useState("");

  const register= async (e: React.FormEvent) => {
    e.preventDefault();
    if(password !== confirmPassword){
        return alert("รหัสผ่านไม่ตรงกัน");
    }
    let body = {
      username: username,
      email: email,
      password: password,
    };

    const res = await fetchActionApi("/api/auth/local/register", {
      method: "POST",
      body: JSON.stringify(body),
    });
    console.log(res);


    if(res) {
        if (res.status === 200) {
            window.location.href = "/";
        } else {
            alert("เข้าสู่ระบบไม่สําเร็จ");
        }
    }
  }
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          REGISTER
        </h1>
        <form onSubmit={(e) => register(e)}>  
          <div className="mb-4">
            <Input
            type="text"
            id="identifier"
            value={username}
            label="Username"
            onChange={(e) => setIdentifier(e.target.value)}
            required
            />
          </div>
          <div className="mb-4">
          <Input
            type="email"
            id="email"
            value={email}
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          </div>
          <div className="mb-6">
          <Input
            type="password"
            id="password"
            value={password}
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            />
          <Input
            type="password"
            id="password"
            value={confirmPassword}
            label="Comfirm password"
            onChange={(e) => setCPassword(e.target.value)}
            required
          />
              </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
