"use client";
import { Nav} from "../ui/Nav";
export const Layout = ({ children, pageTitle }) => {

  return (
    <div className="min-h-screen relative">
      {/* Contenedor principal */}
      <div className="flex-1 flex flex-col ">
        {/* Header */}
        <Nav title={pageTitle} />
        {/* Contenido principal */}
        <main className="flex-1 overflow-y-auto p-3 bg-[#0B0D10]">
          <div className="mx-auto ">{children}</div>
        </main>
      </div>
    </div>
  );
};
