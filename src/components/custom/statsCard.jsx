import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import { Icon } from "@iconify/react";

export function StatsCard({ title, count, percentage = "", icon, color, customClass, colorCount = false }) {
  const colorClasses = {
    default: "bg-default/40 text-default",
    primary: "bg-primary/10 text-primary",
    success: "bg-success-500/10 text-success",
    warning: "bg-warning-500/10 text-warning",
    danger: "bg-danger-500/10 text-danger",
    veci: "bg-verdeVeci-500/10 text-verdeVeci",
    esmeralda: "bg-[#053B48]/10 text-[#053B48]"
  };

  const countColorClasses = {
    default: "",
    primary: "text-primary",
    success: "text-success",
    warning: "text-warning",
    danger: "text-danger",
    veci: "text-verdeVeci",
    esmeralda: "text-[#053B48]"
  };

  return (
    <Card>
      <CardBody>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-default-500">{title}</p>
            <h3 className={`text-2xl font-semibold mt-1 ${colorCount && color ? countColorClasses[color] : ''}`}>
              {count}
            </h3>
            {percentage !== '' && (
              <p className="text-xs text-default-400">{percentage}% del total</p>
            )}
          </div>
          <div className={`p-3 rounded-lg ${customClass || colorClasses[color] || colorClasses.default}`}>
            <Icon icon={icon} width={24} height={24} />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}