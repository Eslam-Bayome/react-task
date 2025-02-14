/* eslint-disable @typescript-eslint/no-explicit-any */
import { useField } from "formik";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import * as Yup from "yup";

export const FormInput = ({
  name,
  label,
  className,
  validationSchema,
  placeholder,
  readOnly,
  type,
}: {
  name: string;
  readOnly?: boolean;
  label?: string;
  placeholder?: string;
  className?: string;
  type: "text" | "email" | "password" | "number";
  validationSchema?: Yup.ObjectSchema<any>;
}) => {
  const [field, meta] = useField(name);
  const isRequired =
    validationSchema?.fields[name] instanceof Yup.StringSchema &&
    validationSchema.fields[name].tests.some(
      (test) => test?.OPTIONS?.name === "required"
    );
  return (
    <div className={className}>
      {label && (
        <Label htmlFor={name}>
          {label}
          {isRequired && <span style={{ color: "red" }}>*</span>}
        </Label>
      )}
      <div className="w-full">
        <Input
          {...field}
          type={type}
          readOnly={readOnly}
          disabled={readOnly}
          placeholder={placeholder && placeholder}
          className={` border-1  border-r-3 rounded-md focus-visible:!ring-0 focus-visible:outline-none  ${
            meta.error && meta.touched ? "border-red-500" : "border-green-500"
          }`}
        />
        {meta.error && meta.touched && (
          <div className="text-red-500">{meta.error}</div>
        )}
      </div>
    </div>
  );
};
