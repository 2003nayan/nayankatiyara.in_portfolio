import * as React from "react";

interface EmailTemplateProps {
  name: string;
  email: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  email,
  message,
}) => (
  <div>
    <p>You have received a new message from your portfolio website:</p>

    <div
      style={{
        margin: "20px 0",
        padding: "15px",
        borderLeft: "4px solid #3b82f6",
      }}
    >
      <h2>Contact Details</h2>
      <p>
        <strong>Name:</strong> {name}
      </p>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <h3>Message:</h3>
      <p style={{ whiteSpace: "pre-wrap" }}>{message}</p>
    </div>
  </div>
);
