"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerService, signIn } from "@/services/auth/auth";
import styles from "./Form.module.scss";

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
        const data = await registerService(email, password);
        if (data?.user?.identities?.length === 0) {
          setError("Este correo ya está registrado");
          return;
        }
        router.push("/login");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.logoContainer}>
        <Image
          src="/logo_spybee.webp"
          alt="Logo Spybee"
          width={110}
          height={110}
        />
      </div>

      <h2 className={styles.title}>
        {isLogin ? "Iniciar sesión" : "Crear cuenta"}
      </h2>
      <p className={styles.subtitle}>
        {isLogin
          ? "Ingresa a tu cuenta para continuar"
          : "Crea tu cuenta para empezar"}
      </p>

      {/* Email */}
      <label htmlFor="email" className={styles.fieldLabel}>
        Correo electrónico
      </label>
      <div className={styles.inputGroup}>
        <svg
          className={styles.icon}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
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
          className={styles.input}
        />
      </div>

      {/* Password */}
      <label htmlFor="password" className={styles.fieldLabel}>
        Contraseña
      </label>
      <div className={styles.passwordWrapper}>
        <svg
          className={styles.icon}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
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
          className={styles.input}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          className={styles.toggleButton}
        >
          {showPassword ? (
            <svg
              className={styles.buttonIcon}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
              <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
              <line x1="1" y1="1" x2="23" y2="23" />
            </svg>
          ) : (
            <svg
              className={styles.buttonIcon}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>

      <div className={styles.linkRow}>
        <a href={isLogin ? "/register" : "/login"} className={styles.link}>
          {isLogin
            ? "¿No tienes cuenta? Regístrate"
            : "¿Ya tienes cuenta? Inicia sesión"}
        </a>
        {isLogin && (
          <a href="#" className={styles.link}>
            ¿Olvidaste tu contraseña?
          </a>
        )}
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <button type="submit" disabled={loading} className={styles.submitButton}>
        {loading ? "Cargando..." : isLogin ? "Iniciar sesión" : "Registrarse"}
        <svg
          className={styles.buttonIcon}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </button>
    </form>
  );
};

export default Form;
