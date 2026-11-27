"use client";

import { useState } from "react";

type Status = { tone: "ok" | "error"; message: string } | null;

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>(null);

  return (
    <>
      <form
        className="news-form"
        id="newsForm"
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          const value = email.trim();
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
            setStatus({ tone: "error", message: "Informe um e-mail válido." });
            return;
          }
          setStatus({
            tone: "ok",
            message: "Inscrição registrada. Bem-vindo à mesa.",
          });
          setEmail("");
        }}
      >
        <label className="sr-only" htmlFor="newsEmail">
          Seu e-mail
        </label>
        <input
          id="newsEmail"
          type="email"
          placeholder="seu@email.com"
          autoComplete="email"
          required
          value={email}
          aria-invalid={status?.tone === "error"}
          aria-describedby="newsNote"
          onChange={(event) => {
            setEmail(event.target.value);
            if (status?.tone === "error") setStatus(null);
          }}
        />
        <button type="submit" aria-label="Assinar newsletter">
          →
        </button>
      </form>
      <p
        className="news-note"
        id="newsNote"
        role="status"
        aria-live="polite"
        data-tone={status?.tone}
      >
        {status?.message ?? ""}
      </p>
    </>
  );
}
