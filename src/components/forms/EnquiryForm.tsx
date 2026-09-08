"use client";

import { useActionState, useId } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { sendEnquiry, type FormState } from "./actions";
import { Button } from "@/components/ui/Button";

export interface FormLabels {
  name: string;
  phone: string;
  carOfInterest: string;
  datetime: string;
  message: string;
  submit: string;
  sending: string;
  success: string;
  errorRequired: string;
  errorPhone: string;
  errorGeneric: string;
}

interface EnquiryFormProps {
  labels: FormLabels;
  locale: "en" | "ar";
  /** Pre-filled car (detail page): rendered as a hidden field. */
  car?: string;
  /** Car of interest options (Visit page): rendered as an optional select. */
  cars?: Array<{ value: string; label: string }>;
  /** Success image, e.g. mb-ct-door-01. */
  successImage: { src: string; width: number; height: number; blurDataURL?: string };
  page?: string;
  className?: string;
}

const INITIAL: FormState = { status: "idle" };

/**
 * docs/02 §3.13: fields on graphite with hairline borders, 56 px, radius 8, floating labels, platinum
 * focus ring; errors are one sentence in --muted under the field; success replaces the form with
 * CT-DOOR-01 and the confirmation line. The phone field is pre-filled with +966.
 */
export function EnquiryForm({ labels, locale, car, cars, successImage, page, className }: EnquiryFormProps) {
  const [state, action, pending] = useActionState(sendEnquiry, INITIAL);
  const id = useId();

  if (state.status === "ok") {
    const [first, ...rest] = labels.success.split(". ");
    return (
      <div className={cn("form-success", className)} role="status">
        <Image
          src={successImage.src}
          alt=""
          width={successImage.width}
          height={successImage.height}
          sizes="(min-width: 768px) 480px, 100vw"
          placeholder="blur"
          blurDataURL={successImage.blurDataURL}
          className="form-success__img"
        />
        <p className="t-display-m mt-8">{rest.length ? `${first}.` : first}</p>
        {rest.length > 0 && <p className="t-body-l mt-2 text-silver">{rest.join(". ")}</p>}
      </div>
    );
  }

  const err = (key: keyof NonNullable<FormState["errors"]>) => {
    const e = state.errors?.[key];
    return e === "required" ? labels.errorRequired : e === "phone" ? labels.errorPhone : undefined;
  };

  return (
    <form action={action} className={cn("form", className)} noValidate>
      <input type="hidden" name="locale" value={locale} />
      {page && <input type="hidden" name="page" value={page} />}
      {car && <input type="hidden" name="car" value={car} />}
      <div className="form__hp" aria-hidden="true">
        <label htmlFor={`${id}-company`}>Company</label>
        <input id={`${id}-company`} name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Field id={`${id}-name`} label={labels.name} error={err("name")}>
        <input id={`${id}-name`} name="name" type="text" autoComplete="name" required placeholder=" " className="field__input" />
      </Field>

      <Field id={`${id}-phone`} label={labels.phone} error={err("phone")}>
        <input
          id={`${id}-phone`}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          defaultValue="+966 "
          placeholder=" "
          dir="ltr"
          className="field__input field__input--ltr"
        />
      </Field>

      {cars && cars.length > 0 && (
        <Field id={`${id}-car`} label={labels.carOfInterest} select>
          <select id={`${id}-car`} name="car" defaultValue="" className="field__input field__select">
            <option value=""></option>
            {cars.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </Field>
      )}

      <Field id={`${id}-datetime`} label={labels.datetime} error={err("datetime")} static>
        <input id={`${id}-datetime`} name="datetime" type="datetime-local" placeholder=" " dir="ltr" className="field__input field__input--ltr" />
      </Field>

      <Field id={`${id}-message`} label={labels.message} error={err("message")}>
        <textarea id={`${id}-message`} name="message" rows={4} placeholder=" " className="field__input field__textarea" />
      </Field>

      {state.generic && (
        <p className="form__error t-small" role="alert">
          {labels.errorGeneric}
        </p>
      )}

      <div className="form__submit">
        <Button type="submit" disabled={pending} icon={false}>
          {pending ? labels.sending : labels.submit}
        </Button>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  select,
  static: isStatic,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  select?: boolean;
  static?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("field", error && "field--error", select && "field--select", isStatic && "field--static")}>
      {children}
      <label htmlFor={id} className="field__label">
        {label}
      </label>
      {error && (
        <p className="field__error t-small" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}
