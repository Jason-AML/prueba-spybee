import React from "react";
import Image from "next/image";
import Form from "@/app/components/auth/Form";
const page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#091426] p-0">
      <div className="flex w-full max-w-7xl min-h-[90vh] overflow-hidden shadow-2xl rounded-2xl">
        {/* Hero izquierda */}
        <div className="relative hidden md:flex w-1/2 flex-col justify-end p-8 bg-[#091426] overflow-hidden">
          <Image
            src="/spybee-auth.webp"
            alt="Fondo de bienvenida de SpyBee"
            aria-hidden="true"
            fill
            className="absolute inset-0 object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#091426] via-[#091426]/40 to-transparent" />

          <div className="relative z-10">
            <h1 className="font-bold text-white text-2xl leading-tight mb-2">
              Prueba Tecnica
            </h1>
            <p className="text-white/50 text-sm">Gestión de incidencias</p>
          </div>
        </div>

        {/* Formulario derecha */}
        <Form mode="register" />
      </div>
    </div>
  );
};

export default page;
