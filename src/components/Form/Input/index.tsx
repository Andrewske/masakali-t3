const Input = ({
  name,
  error = false,
  ...props
}: {
  name: string;
  error: boolean;
}) => {
  return (
    <div>
      <input
        {...props}
        name={name}
        aria-invalid={error ? 'true' : 'false'}
        className={`${
          error
            ? 'w-full border-0 p-1 shadow-error'
            : ' w-full border-0 rounded p-1 shadow-light-purple'
        }`}
      />
    </div>
  );
};

export default Input;
