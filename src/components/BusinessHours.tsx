import { Clock3 } from "lucide-react";

export function BusinessHours() {
  return (
    <p className="business-hours">
      <Clock3 aria-hidden="true" />
      <span>Segunda a sexta, das <time dateTime="18:00">18h</time> às <time dateTime="23:00">23h</time>.</span>
    </p>
  );
}
