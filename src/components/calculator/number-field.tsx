"use client";

import type { FieldValues, Path, UseFormRegister } from "react-hook-form";

import { ValidationMessage } from "@/components/calculator/validation-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface NumberFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  helper?: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  error?: string;
}

export function NumberField<T extends FieldValues>({
  name,
  label,
  helper,
  placeholder,
  register,
  error
}: NumberFieldProps<T>) {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        type="number"
        step="any"
        min={0}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={helper ? `${name}-helper` : undefined}
        className="mt-2"
        {...register(name)}
      />
      {helper ? (
        <p id={`${name}-helper`} className="mt-1 text-xs text-muted-foreground">
          {helper}
        </p>
      ) : null}
      <ValidationMessage message={error} />
    </div>
  );
}