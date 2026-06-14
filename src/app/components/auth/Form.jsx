"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerService, signIn } from "@/services/auth/auth";

const Form = ({ mode = "login" }) => {
  const isLogin = mode === "login";
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isLogin) {
        await signIn(email, password);
        router.push("/dashboard");
      } else {
        await registerService(email, password);
        router.push("/login");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full md:w-1/2 bg-white px-8 py-10 flex flex-col justify-center"
    >
      <div className="flex justify-center mb-10">
        <Image src="/logo_spybee.webp"  alt="Logo Spybee"  width={110} height={110} />
      </div>

      <h2 className="text-xl font-bold text-[#091426] mb-1">
        {isLogin ? "Iniciar sesión" : "Crear cuenta"}
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        {isLogin ? "Ingresa a tu cuenta para continuar" : "Crea tu cuenta para empezar"}
      </p>

      {/* Email */}
      <label htmlFor="email" className="font-mono text-[11px] text-gray-500 uppercase tracking-widest mb-1.5 block">
        Correo electrónico
      </label>
      <div className="relative mb-4">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="nombre@constructora.com"
          autoComplete="email"
          className="w-full h-11 pl-10 pr-4 bg-[#f7f9fb] border border-gray-200 rounded-md text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 focus:bg-white transition-all"
        />
      </div>

      {/* Password */}
      <label htmlFor="password" className="font-mono text-[11px] text-gray-500 uppercase tracking-widest mb-1.5 block">
        Contraseña
      </label>
      <div className="relative mb-2">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          autoComplete="current-password"
          className="w-full h-11 pl-10 pr-11 bg-[#f7f9fb] border border-gray-200 rounded-md text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 focus:bg-white transition-all"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          {showPassword ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
              <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
              <line x1="1" y1="1" x2="23" y2="23" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>

      {/* Links */}
      <div className="flex justify-between font-mono text-[11px] text-amber-700 mb-5">
        <a href={isLogin ? "/register" : "/login"} className="hover:underline">
          {isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
        </a>
        {isLogin && (
          <a href="#" className="hover:underline">¿Olvidaste tu contraseña?</a>
        )}
      </div>

      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full cursor-pointer h-11 bg-[#fcd34d] hover:bg-[#fbbf24] disabled:opacity-60 text-[#091426] font-bold rounded-md font-mono text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-all active:scale-[0.98] mb-4"
      >
        {loading ? "Cargando..." : isLogin ? "Iniciar sesión" : "Registrarse"}
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </button>
    </form>
  );
};

export default Form;