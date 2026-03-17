import React, { useState } from 'react';
import { loginApi } from '../../api/services/authServices';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [data, setData] = useState({ email: "", password: "" })
  
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(data)
    const res = await loginApi(data)
    console.log("hiiii" + res)
    navigate("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 p-8">

        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white mb-2">
            {isLogin ? 'Welcome Back' : 'Join Us'}
          </h1>
          <p className="text-white/80">
            {isLogin ? 'Enter your details to sign in' : 'Create your account to get started'}
          </p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          {!isLogin && (
            <div>
              <label className="block text-white text-sm font-medium mb-1">UserName</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
                placeholder="John Doe"
                id='userName'
                onChange={(e) => setData({ ...data, UserName: e.target.value })}
              />
            </div>

          )}



          <div>
            <label className="block text-white text-sm font-medium mb-1">Email Address</label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
              placeholder="hello@reallygoodai.com"
              onChange={(e) => setData({ ...data, email: e.target.value })} />
          </div>



          <div>
            <label className="block text-white text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
              placeholder="••••••••"
              id='password'
              onChange={(e) => setData({ ...data, password: e.target.value })}

            />
          </div>

          <button className="w-full py-3 px-4 bg-white text-purple-600 font-bold rounded-xl hover:bg-opacity-90 transform hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg"
            onClick={handleSubmit}
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-white/70 text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-white font-bold hover:underline underline-offset-4"
            >
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;