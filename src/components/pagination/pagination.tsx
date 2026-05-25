import './styles.css'


// export default function Pagination({ page, totalPages, onPageChange }) {
//   return (
//     <div className="pagination">
//       <button
//         disabled={page === 1}
//         onClick={() => onPageChange(page - 1)}
//       >
//         Prev
//       </button>

//       <span>{page} / {totalPages}</span>

//       <button
//         disabled={page === totalPages}
//         onClick={() => onPageChange(page + 1)}
//       >
//         Next
//       </button>
//     </div>
//   );
// }




export default function Pagination({ page, totalPages, onPageChange }) {
  return (
    <div className="pagination-modern">

      {/* ⬅️ VOLTAR */}
      <span
        className={`arrow ${page === 1 ? "disabled" : ""}`}
        onClick={() => page > 1 && onPageChange(page - 1)}
      >
        &lt;
      </span>

      {/* 🔢 NÚMEROS */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <span
          key={p}
          className={`page-number ${p === page ? "active" : ""}`}
          onClick={() => onPageChange(p)}
        >
          {p}
        </span>
      ))}

      {/* ➡️ AVANÇAR */}
      <span
        className={`arrow ${page === totalPages ? "disabled" : ""}`}
        onClick={() => page < totalPages && onPageChange(page + 1)}
      >
        &gt;
      </span>

    </div>
  );
}