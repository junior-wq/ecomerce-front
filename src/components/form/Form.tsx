import React, { FormEvent } from 'react';
import './styles.css';

type Field = {
  name: string;
  label?: string;
  type: 'text' | 'email' | 'password' | 'textarea';
  placeholder?: string;
  required?: boolean;
};

type FormSectionProps = {
  title?: string;
  description?: string;
  fields: Field[];
  buttonText?: string;
  onSubmit?: (data: Record<string, string>) => void;
};

const FormSection: React.FC<FormSectionProps> = ({
  title = "Formulário",
  description = "",
  fields,
  buttonText = "Enviar",
  onSubmit = () => {}
}) => {

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Captura valores do formulário
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    fields.forEach(field => {
      data[field.name] = formData.get(field.name)?.toString() || '';
    });

    onSubmit(data);
  };

  return (
    <section className="contact-section">
      <div className="contact-container">
        <h2 className="contact-title">{title}</h2>
        {description && <p className="contact-description">{description}</p>}
        <form className="contact-form" onSubmit={handleSubmit}>
          {fields.map((field, index) => (
            <div className="form-group" key={index}>
              {field.label && (
                <label htmlFor={field.name} className="form-label">
                  {field.label}
                </label>
              )}
              {field.type === "textarea" ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  className="form-textarea"
                  placeholder={field.placeholder}
                  required={field.required}
                ></textarea>
              ) : (
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  className="form-input"
                  placeholder={field.placeholder}
                  required={field.required}
                />
              )}
            </div>
          ))}
          <button type="submit" className="form-button">{buttonText}</button>
        </form>
      </div>
    </section>
  );
};

export default FormSection;
