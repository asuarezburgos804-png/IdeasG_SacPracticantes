import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

export function CustomField({ label, code, children }) {
  return (
    <Card className="w-full">
      <CardHeader className="flex gap-2 px-4 py-2 bg-default-100">
        <span className="text-tiny text-default-600">{code}</span>
        <h3 className="text-small font-medium">{label}</h3>
      </CardHeader>
      <CardBody className="px-4 py-3">{children}</CardBody>
    </Card>
  );
}
