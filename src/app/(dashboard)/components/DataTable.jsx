"use client";
import { usePagination } from "@/app/hooks/usePagination";
import { useRouter } from "next/navigation";
import styles from "../dashboard/DataTable.module.scss";

export default function DataTable({ columns, data, pageSize = 10 }) {
  const { page, setPage, totalPages, currentItems } = usePagination(data, pageSize);
  const router = useRouter();

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} className={styles.headerCell}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((row, idx) => (
            <tr
              key={row.id ?? idx}
              className={styles.row}
              onClick={() => router.push(`/incidents/${row.id}`)}
            >
              {columns.map((col) => (
                <td key={col.key} className={styles.bodyCell}>
                  {col.render ? col.render(row) : row[col.key] ?? "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.pagination}>
        <button
          className={styles.paginationButton}
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Anterior
        </button>
        <span>
          Página {page} de {totalPages}
        </span>
        <button
          className={styles.paginationButton}
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}