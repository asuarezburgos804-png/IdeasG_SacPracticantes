// import React, { useState, useEffect } from "react";
// import { Input } from "@nextui-org/react";
// import { Icon } from "@iconify/react";

// export const CustomDateInput = ({
//   label,
//   value,
//   onChange,
//   placeholder = "DD/MM/YYYY",
//   isRequired = false,
//   isInvalid = false,
//   errorMessage,
//   className,
// }) => {
//   // Convert date string to display format
//   const formatDisplayDate = (dateStr) => {
//     if (!dateStr) return "";
//     try {
//       const [year, month, day] = dateStr.split("-");
//       return `${day}/${month}/${year}`;
//     } catch {
//       return dateStr;
//     }
//   };

//   // Convert display format to date string
//   const parseDisplayDate = (displayStr) => {
//     if (!displayStr) return "";
//     try {
//       const [day, month, year] = displayStr.split("/");
//       return `${year}-${month}-${day}`;
//     } catch {
//       return displayStr;
//     }
//   };

//   const [displayValue, setDisplayValue] = useState(formatDisplayDate(value));
//   const [showNativePicker, setShowNativePicker] = useState(false);

//   useEffect(() => {
//     setDisplayValue(formatDisplayDate(value));
//   }, [value]);

//   const handleInputChange = (e) => {
//     const newValue = e.target.value;
//     setDisplayValue(newValue);

//     // Basic validation for DD/MM/YYYY format
//     if (/^\d{2}\/\d{2}\/\d{4}$/.test(newValue)) {
//       const dateStr = parseDisplayDate(newValue);
//       onChange(dateStr);
//     }
//   };

//   const handleNativeChange = (e) => {
//     const newValue = e.target.value;
//     onChange(newValue);
//     setShowNativePicker(false);
//   };

//   return (
//     <div className="relative">
//       <Input
//         label={label}
//         value={displayValue}
//         onChange={handleInputChange}
//         placeholder={placeholder}
//         isRequired={isRequired}
//         isInvalid={isInvalid}
//         errorMessage={errorMessage}
//         className={className}
//         endContent={
//           <button
//             type="button"
//             className="focus:outline-none"
//             onClick={() => setShowNativePicker(true)}
//           >
//             <Icon
//               icon="lucide:calendar"
//               className="text-default-400 pointer-events-none flex-shrink-0"
//             />
//           </button>
//         }
//       />
//       <input
//         type="date"
//         value={value}
//         onChange={handleNativeChange}
//         className={`absolute inset-0 opacity-0 ${
//           showNativePicker ? "pointer-events-auto" : "pointer-events-none"
//         }`}
//       />
//     </div>
//   );
// };
