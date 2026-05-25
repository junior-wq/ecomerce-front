// import './styles.css'


// type CategoryType = {
//   id: number;
//   title: string;
// };

// type Props = {
//   categories: CategoryType[];
//   selectedCategory: number | undefined;
//   onSelect: (cat: CategoryType | null) => void;
// };


// export function Filters({ categories, selectedCategory, onSelect }: Props) {
//   return (
//     <div className="filters">
//       <button
//         className={!selectedCategory ? 'active' : ''}
//         onClick={() => onSelect(null)}
//       >
//         All
//       </button>

//       {categories.map((cat) => (
//         <button
//           key={cat.id}
//           className={selectedCategory === cat.id ? 'active' : ''}
//           onClick={() => onSelect(cat)}
//         >
//           {cat.title}
//         </button>
//       ))}
//     </div>
//   );
// }





import React, { useCallback } from 'react';
import './styles.css';

type CategoryType = {
  id: number;
  title: string;
};

type Props = {
  categories: CategoryType[];
  selectedCategory: number | undefined;
  onSelect: (cat: CategoryType | null) => void;
};

function FiltersComponent({ categories, selectedCategory, onSelect }: Props) {

  // 🔥 função estável (não recria sempre)
  const handleAllClick = useCallback(() => {
    onSelect(null);
  }, [onSelect]);

  const handleCategoryClick = useCallback(
    (cat: CategoryType) => {
      onSelect(cat);
    },
    [onSelect]
  );

  return (
    <div className="filters">
      <button
        className={!selectedCategory ? 'active' : ''}
        onClick={handleAllClick}
      >
        All
      </button>

      {categories.map((cat) => (
        <button
          key={cat.id}
          className={selectedCategory === cat.id ? 'active' : ''}
          onClick={() => handleCategoryClick(cat)}
        >
          {cat.title}
        </button>
      ))}
    </div>
  );
}

// 🔥 evita re-render desnecessário
export const Filters = React.memo(FiltersComponent);