const Label = ({ label, name }: { label: string; name: string }) => {
  return (
    <label
      className="text-sm"
      htmlFor={name}
    >
      {label}
    </label>
  );
};

export default Label;
