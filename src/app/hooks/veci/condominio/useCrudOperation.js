import { useState } from "react";

export function useCrudOperation() {
  const [isLoading, setIsLoading] = useState(false);

  const executeCrudOperation = async (crudFunction) => {
    setIsLoading(true);
    try {
      const result = await crudFunction();
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message || "Ocurrió un problema inesperado." };
    } finally {
      setIsLoading(false);
    }
  };

  return { executeCrudOperation, isLoading };
}