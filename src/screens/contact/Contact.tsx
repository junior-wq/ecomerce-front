import React from "react";
import FormSection from "../../components/form/Form";


const Contact: React.FC = () => {
  return (
    <FormSection
      title="Entre em Contato"
      description="Tem alguma dúvida? Nossa equipe está pronta para ajudar!"
      fields={[
        { name: "name", label: "Nome", type: "text", placeholder: "Seu nome", required: true },
        { name: "email", label: "E-mail", type: "email", placeholder: "Seu e-mail", required: true },
        { name: "message", label: "Mensagem", type: "textarea", placeholder: "Escreva sua mensagem...", required: true }
      ]}
      buttonText="Enviar Mensagem"
      onSubmit={(data) => console.log("Contato enviado:", data)}
    />
  );
};

export default Contact;

