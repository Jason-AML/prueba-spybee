"use client";
import { useEffect } from "react";
import { usePagination } from "@/app/hooks/usePagination";
import { useRouter } from "next/navigation";

export default function DataTable({ columns, data, pageSize = 10 }) {
  const { page, setPage, totalPages, currentItems } = usePagination(
    data,
    pageSize,
  );
  const router = useRouter();

  useEffect(() => {
    if (totalPages > 0 && page > totalPages) {
      setPage(1);
    }
  }, [page, totalPages, setPage]);

  return (
    <div className="overflow-x-auto rounded-2xl border-[0.5px] border-[#2A2D32] bg-[#15171B]">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b-[0.5px] border-[#2A2D32]">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-3 text-center py-2.5 text-sm font-medium text-[#8E9094]"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentItems.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-3 py-8 text-center text-sm text-[#75777B]"
              >
                No hay incidencias para mostrar.
              </td>
            </tr>
          ) : (
            currentItems.map((row, idx) => (
              <tr
                key={row.id ?? idx}
                role="link"
                tabIndex={0}
                className="border-b-[0.5px] border-[#2A2D32] last:border-b-0 hover:bg-[#1C1F24] cursor-pointer focus:outline-none focus:bg-[#1C1F24] transition-colors"
                onClick={() => router.push(`/incidents/${row.id}`)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") router.push(`/incidents/${row.id}`);
                }}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="px-3 text-center py-2.5 text-sm text-[#E8E9EB]"
                  >
                    {col.render ? col.render(row) : (row[col.key] ?? "-")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="flex justify-between items-center px-4 py-3 border-t-[0.5px] border-[#2A2D32]">
        <button
          className="px-4 py-2 cursor-pointer rounded-lg text-[#042C53] font-medium bg-[#378ADD] transition-opacity hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Anterior
        </button>
        <span className="text-sm text-[#8E9094]">
          Página {page} de {Math.max(totalPages, 1)}
        </span>
        <button
          className="cursor-pointer rounded-lg px-4 py-2 text-[#042C53] font-medium bg-[#378ADD] transition-opacity hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed"
          disabled={page === totalPages || totalPages === 0}
          onClick={() => setPage(page + 1)}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
