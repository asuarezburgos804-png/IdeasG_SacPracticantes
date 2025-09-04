import EnumLabelComponent from "./enumLabel";

export default function FieldSetCustom({
  title,
  code,
  children,
  className,
  classNameChildren,
}) {
  const defaultClasses = children
    ? "border border-[#f1f1f3] rounded-md w-full"
    : "";

  // Clases combinadas
  const combinedClasses = `${defaultClasses} ${className}`;

  return (
    <fieldset className={combinedClasses}>
      <legend
        className="text-sm text- font-medium"
        style={{
          padding: "0.2em 0.5em",
          color: "#333",
          fontSize: "12px",
          position: "relative",
          height: "30px",
        }}
      >
        <EnumLabelComponent title={title} code={code} />
      </legend>
      {children}
    </fieldset>
  );
}
