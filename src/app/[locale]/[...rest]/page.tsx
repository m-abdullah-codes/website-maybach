import { notFound } from "next/navigation";

// Catch-all inside the locale segment so unknown routes render the localised not-found page.
export default function CatchAll() {
  notFound();
}
