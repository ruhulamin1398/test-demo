import Input from "@/components/atoms/Input";

interface FormFieldProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  error,
}) => (
  <div style={{ marginBottom: "16px" }}>
    <Input
      label={label}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      error={error}
    />
  </div>
);

export default FormField;
