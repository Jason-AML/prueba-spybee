import { useState } from "react";

export function usePagination(data = [], pageSize = 10) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(data.length / pageSize) || 1;
  const start = (page - 1) * pageSize;
  const currentItems = data.slice(start, start + pageSize);

  return { page, setPage, totalPages, currentItems };
}