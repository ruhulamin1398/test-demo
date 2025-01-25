import Button from "@/components/atoms/Button";

interface FormButtonProps {
  text: string;
  onClick: () => void;
  disabled: boolean;
}

const FormButton: React.FC<FormButtonProps> = ({ text, onClick, disabled }) => (
  <Button
    fullWidth
    type="submit"
    text={text}
    onClick={onClick}
    disabled={disabled}
  />
);

export default FormButton;
