// Spinner.tsx
import './styles.css'; // ✅ Certo, se for CSS global

const Spiner = () => {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
    </div>
  );
};

export default Spiner;
