// components/product-specs/ProductSpecs.tsx
import './styles.css';

interface Spec {
  label: string;
  value: string;
}

interface ProductSpecsProps {
  specs?: Spec[];
  className?: string;
}

// Dados hardcoded como fallback
const defaultSpecs: Spec[] = [
  { label: "Material", value: "Algodão Premium" },
  { label: "Peso", value: "250g/m²" },
  { label: "Origem", value: "Produção Local" },
  { label: "Garantia", value: "6 meses" },
  { label: "Modelo", value: "ML-2025" },
  { label: "SKU", value: "NV-AL-001" }
];

export default function ProductSpecs({ specs = defaultSpecs, className = "" }: ProductSpecsProps) {
  return (
    <div className={`product-specs ${className}`}>
      <h3 className="specs-title">Especificações</h3>
      <div className="specs-list">
        {specs.map((spec, idx) => (
          <div key={idx} className="spec-item">
            <span className="spec-label">{spec.label}</span>
            <span className="spec-value">{spec.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}