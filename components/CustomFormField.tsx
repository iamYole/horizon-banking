import type { HTMLInputTypeAttribute } from "react";
import { Controller, type Control, type Path } from "react-hook-form";
import { z } from "zod";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { auth_signInSchema, auth_signUpSchema } from "@/lib/utils";

type SignInFormFieldProps = {
  control: Control<z.infer<typeof auth_signInSchema>>;
  name: Path<z.infer<typeof auth_signInSchema>>;
  label: string;
  placeholder: string;
  inputType?: HTMLInputTypeAttribute;
  disabled?: boolean;
};

type SignUpFormFieldProps = {
  control: Control<z.infer<typeof auth_signUpSchema>>;
  name: Path<z.infer<typeof auth_signUpSchema>>;
  label: string;
  placeholder: string;
  inputType?: HTMLInputTypeAttribute;
  disabled?: boolean;
};

export function SignInFormField({
  control,
  name,
  label,
  placeholder,
  inputType = "text",
  disabled = false,
}: SignInFormFieldProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <div className="form-item">
            <FieldLabel className="form-label">{label}</FieldLabel>
          </div>

          <div className="flex w-full flex-col">
            <Input
              {...field}
              type={inputType}
              placeholder={placeholder}
              className="input-class"
              aria-invalid={fieldState.invalid}
              disabled={disabled}
            />
          </div>

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

export function SignUpFormField({
  control,
  name,
  label,
  placeholder,
  inputType = "text",
  disabled = false,
}: SignUpFormFieldProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <div className="form-item">
            <FieldLabel className="form-label">{label}</FieldLabel>
          </div>

          <div className="flex w-full flex-col">
            <Input
              {...field}
              type={inputType}
              placeholder={placeholder}
              className="input-class"
              aria-invalid={fieldState.invalid}
              disabled={disabled}
            />
          </div>

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
