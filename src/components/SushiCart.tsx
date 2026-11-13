"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Minus, Plus, ShoppingBag, X } from "lucide-react";
import { formatPrice, prices } from "./cardapio.js";
import "./SushiCart.css";

const steps = ["Sacola", "Entrega", "Pagamento", "Revisão"] as const;
const paymentOptions = ["Pix", "Cartão na entrega", "Dinheiro na entrega"] as const;
type Payment = (typeof paymentOptions)[number];
type Delivery = {
  name: string;
  address: string;
  number: string;
  district: string;
  city: string;
  notes: string;
};

const initialDelivery: Delivery = { name: "", address: "", number: "", district: "", city: "", notes: "" };
const deliveryFields = [
  { name: "name", label: "Seu nome", autoComplete: "name", maxLength: 100 },
  { name: "address", label: "Rua ou avenida", autoComplete: "address-line1", maxLength: 120 },
  { name: "number", label: "Número", autoComplete: "off", maxLength: 20 },
  { name: "district", label: "Bairro", autoComplete: "address-level3", maxLength: 80 },
  { name: "city", label: "Cidade", autoComplete: "address-level2", maxLength: 80 },
] as const;

export function SushiCart({ cart, change, whatsapp, direct }: {
  cart: Record<string, number>;
  change: (name: string, delta: number) => void;
  whatsapp: string;
  direct: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const [step, setStep] = useState(0);
  const [delivery, setDelivery] = useState(initialDelivery);
  const [payment, setPayment] = useState<Payment | "">("");
  const [needsChange, setNeedsChange] = useState(false);
  const [cash, setCash] = useState("");
  const [feedback, setFeedback] = useState("");
  const entries = Object.entries(cart).filter(([, quantity]) => quantity > 0);
  const subtotal = entries.reduce((total, [name, quantity]) => total + (prices.get(name) ?? 0) * quantity, 0);
  const count = entries.reduce((total, [, quantity]) => total + quantity, 0);

  useEffect(() => {
    if (dialog.current?.open) heading.current?.focus();
  }, [step]);

  function goTo(next: number) {
    setFeedback("");
    setStep(next);
  }

  function advance(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step >= steps.length - 1) return;
    if (step === 1 && deliveryFields.some(({ name }) => !delivery[name].trim())) {
      setFeedback("Preencha todos os dados obrigatórios da entrega.");
      return;
    }
    if (step === 2 && payment === "Dinheiro na entrega" && needsChange && !(Number(cash.replace(",", ".")) > 0)) {
      setFeedback("Informe um valor válido para o troco.");
      return;
    }
    goTo(step + 1);
  }

  function changeQuantity(name: string, delta: number) {
    if (count === 1 && delta === -1) heading.current?.focus();
    change(name, delta);
  }

  const formattedCash = Number(cash.replace(",", ".")).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const summary = [
    "Olá! Gostaria de fazer um pedido para delivery na MT Sushi Arte.",
    ...entries.map(([item, quantity]) => `• ${quantity} × ${item} — ${formatPrice((prices.get(item) ?? 0) * quantity)}`),
    `Subtotal dos itens: ${formatPrice(subtotal)}`,
    "",
    `Nome: ${delivery.name.trim()}`,
    `Entrega: ${delivery.address.trim()}, ${delivery.number.trim()} · ${delivery.district.trim()} · ${delivery.city.trim()}`,
    ...(delivery.notes.trim() ? [`Complemento e observações: ${delivery.notes.trim()}`] : []),
    `Pagamento preferido: ${payment}`,
    ...(payment === "Dinheiro na entrega" ? [needsChange ? `Troco para: ${formattedCash}` : "Sem troco"] : []),
    "",
    "Podem confirmar a disponibilidade, o valor total, o frete e o prazo de entrega?",
  ].join("\n");

  async function copyOrder() {
    try {
      await navigator.clipboard.writeText(summary);
      setFeedback("Pedido copiado. Cole a mensagem no Direct para enviá-la.");
    } catch {
      setFeedback("Selecione e copie o resumo para enviar pelo Direct.");
    }
  }

  return (
    <>
      <button className="button button-red" type="button" aria-haspopup="dialog" onClick={() => {
        goTo(0);
        dialog.current?.showModal();
        heading.current?.focus();
      }}>
        <ShoppingBag aria-hidden="true" /> Meu pedido ({count})
      </button>
      <dialog ref={dialog} className="checkout" aria-labelledby="order-title" data-lenis-prevent>
        <header className="checkout-heading">
          <h2 id="order-title" ref={heading} tabIndex={-1}>{steps[step]}</h2>
          <button className="button button-outline checkout-icon" type="button" aria-label="Fechar pedido"
            onClick={() => dialog.current?.close()}><X aria-hidden="true" /></button>
        </header>

        {count > 0 && (
          <ol className="checkout-steps" aria-label="Etapas do pedido">
            {steps.map((label, index) => (
              <li key={label} aria-current={step === index ? "step" : undefined}>{index + 1}. {label}</li>
            ))}
          </ol>
        )}

        {count === 0 ? (
          <div className="checkout-step">
            <p>Adicione itens do cardápio para montar seu pedido.</p>
            <button className="button button-red" type="button" onClick={() => dialog.current?.close()}>Voltar ao cardápio</button>
          </div>
        ) : (
          <form className="checkout-step" onSubmit={advance}>
            {step === 0 && (
              <>
                <ul className="checkout-items">
                  {entries.map(([name, quantity]) => (
                    <li key={name}>
                      <div><strong>{name}</strong><p>{formatPrice((prices.get(name) ?? 0) * quantity)}</p></div>
                      <div className="checkout-quantity">
                        <button className="button button-outline checkout-icon" type="button" aria-label={`Remover uma unidade de ${name}`}
                          onClick={() => changeQuantity(name, -1)}><Minus aria-hidden="true" /></button>
                        <span aria-label={`Quantidade: ${quantity}`}>{quantity}</span>
                        <button className="button button-outline checkout-icon" type="button" aria-label={`Adicionar uma unidade de ${name}`}
                          onClick={() => changeQuantity(name, 1)}><Plus aria-hidden="true" /></button>
                      </div>
                    </li>
                  ))}
                </ul>
                <p><strong>Subtotal dos itens: {formatPrice(subtotal)}</strong>. Frete à parte.</p>
              </>
            )}
            {step === 1 && (
              <>
                <div className="checkout-delivery-fields">
                  {deliveryFields.map(({ name, label, autoComplete, maxLength }) => (
                    <label key={name} data-field={name}>{label}
                      <input name={name} autoComplete={autoComplete} required maxLength={maxLength} value={delivery[name]}
                        onChange={(event) => setDelivery({ ...delivery, [name]: event.target.value })} />
                    </label>
                  ))}
                </div>
                <label>Complemento e observações (opcional)
                  <textarea name="notes" rows={2} maxLength={240} value={delivery.notes}
                    onChange={(event) => setDelivery({ ...delivery, notes: event.target.value })} />
                </label>
                <p>A loja confirma a cobertura, o frete e o prazo de entrega.</p>
              </>
            )}
            {step === 2 && (
              <>
                <fieldset className="checkout-payment">
                  <legend>Forma de pagamento preferida</legend>
                  {paymentOptions.map((option) => (
                    <label className="checkout-choice" key={option}>
                      <input type="radio" name="payment" value={option} checked={payment === option} required
                        onChange={() => { setPayment(option); setFeedback(""); }} />
                      {option}
                    </label>
                  ))}
                </fieldset>
                {payment === "Dinheiro na entrega" && (
                  <div className="checkout-cash">
                    <label className="checkout-choice">
                      <input type="checkbox" checked={needsChange} onChange={(event) => {
                        setNeedsChange(event.target.checked);
                        setFeedback("");
                      }} /> Preciso de troco
                    </label>
                    {needsChange && (
                      <label>Troco para quanto?
                        <input type="text" name="cash" inputMode="decimal" required maxLength={12} value={cash}
                          placeholder="Ex. 100,00" pattern="[0-9]+([,.][0-9]{1,2})?"
                          onChange={(event) => setCash(event.target.value)} />
                      </label>
                    )}
                  </div>
                )}
                <p>Confirme a forma de pagamento e o total com a loja antes de pagar.</p>
              </>
            )}
            {step === 3 && (
              <>
                <label>Resumo do pedido<textarea readOnly value={summary} rows={9} /></label>
                <p>Envie o resumo para a loja confirmar seu pedido.</p>
              </>
            )}

            <div className="checkout-actions">
              {step > 0 && <button className="button button-outline" type="button" onClick={() => goTo(step - 1)}>
                <ArrowLeft aria-hidden="true" /> Voltar
              </button>}
              {step < 3 && <button className="button button-red" type="submit">
                {["Continuar para entrega", "Continuar para pagamento", "Revisar pedido"][step]} <ArrowRight aria-hidden="true" />
              </button>}
              {step === 3 && (whatsapp ? (
                <a className="button button-red" href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(summary)}`}
                  target="_blank" rel="noreferrer">Enviar pelo WhatsApp <ArrowRight aria-hidden="true" /></a>
              ) : (
                <>
                  <button className="button button-outline" type="button" onClick={copyOrder}>Copiar pedido</button>
                  <a className="button button-red" href={direct} target="_blank" rel="noreferrer">Abrir Direct <ArrowRight aria-hidden="true" /></a>
                </>
              ))}
            </div>
            <p role="status" className="checkout-feedback">{feedback}</p>
          </form>
        )}
      </dialog>
    </>
  );
}
