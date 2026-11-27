/**
 * Horários de funcionamento.
 * 0 = domingo … 6 = sábado. Fechamento em minutos desde 00:00.
 * 24 * 60 significa meia-noite (fim do dia).
 */
const SCHEDULE: Record<number, { open: number; close: number } | null> = {
  0: null,
  1: { open: 18 * 60, close: 23 * 60 },
  2: { open: 18 * 60, close: 23 * 60 },
  3: { open: 18 * 60, close: 23 * 60 },
  4: { open: 18 * 60, close: 23 * 60 },
  5: { open: 18 * 60, close: 23 * 60 },
  6: null,
};

const WEEKDAY_INDEX: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

export type OpenState = {
  open: boolean;
  label: string;
  detail: string;
};

const formatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Sao_Paulo",
  weekday: "short",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

export function saoPauloNow(now: Date = new Date()) {
  const parts = formatter.formatToParts(now);
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  const day = WEEKDAY_INDEX[get("weekday")] ?? 0;
  const hour = Number(get("hour")) % 24;
  const minute = Number(get("minute"));
  return { day, minutes: hour * 60 + minute };
}

export function getOpenState(now: Date = new Date()): OpenState {
  const { day, minutes } = saoPauloNow(now);
  const today = SCHEDULE[day];

  if (today && minutes >= today.open && minutes < today.close) {
    const closeLabel = today.close >= 24 * 60 ? "00h" : `${Math.floor(today.close / 60)}h`;
    return {
      open: true,
      label: `Aberto agora até ${closeLabel}`,
      detail: today.close >= 24 * 60 ? "cozinha aberta até meia-noite" : "cozinha aberta",
    };
  }

  // Fechamento da madrugada do dia anterior (sex/sáb até 00h)
  const previous = SCHEDULE[(day + 6) % 7];
  if (previous && previous.close >= 24 * 60 && minutes < previous.close - 24 * 60) {
    return { open: true, label: "Aberto agora até 00h", detail: "cozinha aberta" };
  }

  return {
    open: false,
    label: "Fechado agora",
    detail: "segunda a sexta, das 18h às 23h",
  };
}
