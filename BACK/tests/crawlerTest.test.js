import { describe, it, expect } from "vitest";
import { performance } from "perf_hooks";
import { urlData, closeBrowser } from "../src/scraper/indexScrapper";

// VARIABLES
const url = "https://thesmallcrawler.vercel.app/";
const selector = "#logo";
const resultText = "theSmallCrawler";

describe("urlData function", () => {
  it(
    "should return the innerText of the selected element",
    async () => {
      const result = await urlData(url, selector);

      expect(result).to.include(resultText);
    },
    { timeout: 10000 }
  );

  it("should handle errors and return the error", async () => {
    const url = "http://meteobanyeres.es/";
    const selector = "body";
    const result = await urlData(url, selector);

    expect(result).toBeInstanceOf(Error);
  });
});

// VARIABLES RENDIMIENTO

const numInvocations = 100;
const timeoutTime = numInvocations * 1000;

describe("Load Test Simulation for processData", () => {
  it(
    "should handle multiple concurrent invocations",
    async () => {
      const promises = [];
      const results = [];
      const individualTimes = [];

      const startTime = performance.now();

      for (let i = 0; i < numInvocations; i++) {
        const invocationStartTime = performance.now();
        promises.push(
          urlData(url, selector)
            .then((result) => {
              const invocationEndTime = performance.now();
              individualTimes.push(invocationEndTime - invocationStartTime);
              results.push(`${result - i}`);
            })
            .catch((err) => {
              console.error("Function invocation failed:", err);
            })
        );
      }

      await Promise.all(promises);

      const endTime = performance.now();
      const totalTime = endTime - startTime;

      // Verificar que todas las invocaciones se completaron correctamente
      expect(results.length).toBe(numInvocations);
      results.forEach((result, index) => {
        expect(result).toBe(`${result - index}`);
      });

      // Mostrar tiempos de ejecución
      console.log(
        `Total time for ${numInvocations} invocations: ${(
          totalTime / 1000
        ).toFixed(2)} s`
      );
      console.log(
        `Average time per invocation: ${(
          totalTime /
          numInvocations /
          1000
        ).toFixed(2)} s`
      );
      console.log(
        `Individual invocation times: ${individualTimes
          .map((time) => (time / 1000).toFixed(2))
          .join(", ")} s`
      );

      // Cerrar navegador
      await closeBrowser();
    },
    { timeout: timeoutTime }
  );
});
