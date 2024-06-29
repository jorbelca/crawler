import { mappingOperations } from "./mappingOps.js";

export const cronoScraper = () => {
  const twoMinutes = 1000 * 60 * 2;

  const executeMappingOperations = async () => {
    try {
      await mappingOperations();
    } catch (error) {
      console.error("Error during mapping operations:", error);
    } finally {
      setTimeout(executeMappingOperations, twoMinutes);
    }
  };

  executeMappingOperations();
};
