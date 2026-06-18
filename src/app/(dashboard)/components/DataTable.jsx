"use client";
import {usePagination} from "@/app/hooks/usePagination";
import { useRouter } from "next/navigation";
export default function DataTable({ columns, data, pageSize = 10 }) {
  const { page, setPage, totalPages, currentItems } = usePagination(data, pageSize);
  if(page > totalPages){
    setPage(1)
  }
const router = useRouter();
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-3 py-2 text-sm">{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((row, idx) => (
            <tr key={row.id ?? idx} className="border-b hover:bg-gray-50 cursor-pointer" onClick={() => router.push(`/incidents/${row.id}`)}>
              {columns.map((col) => (
                <td key={col.key} className="px-3 text-center py-2 text-sm">
                  {col.render ? col.render(row) : row[col.key] ?? "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4 overflow-auto">
        <button className="px-4 py-2 cursor-pointer rounded-2xl bg-amber-400 disabled:opacity-50" disabled={page === 1} onClick={() => setPage(page - 1)}>
          Anterior
        </button>
        <span>Página {page} de {totalPages}</span>
        <button className="cursor-pointer rounded-2xl px-4 py-2 bg-amber-400 disabled:opacity-50" disabled={page === totalPages} onClick={() => setPage(page + 1)}>
          Siguiente
        </button>
      </div>
    </div>
  );
}