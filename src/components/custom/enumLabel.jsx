import { Chip } from "@nextui-org/react";

export default function EnumLabelComponent({ title, code }) {
  return (
    <div className="flex gap-0.5 items-center ">
      {code && (
        <Chip size="sm" className="text-xss">
          {code}
        </Chip>
      )}
      <span className="text-xss line-clamp-1 text-left">{title}</span>
    </div>
  );
}
