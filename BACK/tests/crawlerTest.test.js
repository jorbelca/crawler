import { describe, it, expect, afterAll } from "vitest";
import { performance } from "perf_hooks";
import { urlData, closeBrowser } from "../src/scraper/indexScrapper";

// VARIABLES
const url1 =
  "https://www.amazon.es/Apple-iPhone-mini-64GB-Product/dp/B08PCF2P4R?source=ps-sl-shoppingads-lpcontext&ref_=fplfs&smid=A1SDCTKWTTIH5G&th=1";
const selector1 = ".a-offscreen";
const resultText1 = "277,94€";

const url2 =
  "https://www.amazon.es/Abanderado-Sensitive-Boxer-Briefs-Negro/dp/B09NDNJGF2/ref=sr_1_6?dib=eyJ2IjoiMSJ9.N9tgOULVLUDkIdDaPn65jFKPceeUZtXHvEAV2PFsfkDGgh26382zn8tkh8T0JAl2HuW_e6gsOrsHCeCmfbpeDmBFVyA1X-HuwKXXBuC2AJbg61UKplZw0zKEMW_R3J_zQrTtev24ise1dlFYSlr5T73dAr_egEKK3aM-GNz8V2H9hVD3p-ERUkuZh5RtqFIh076MhpXXkGGck2_dbmlhPabehA3p03PSkec7hk9y7aEsm7Fxw7hWIsIsK7BKxa4ArJ2KWuDd0mbDFv57Oh4kl5oSy2EdsqecXDq8YGamv-M.8pP_opoD4bb3gbPaAAI_AKAnZviZPvNSZFmq6BVJvTE&dib_tag=se&keywords=boxer+abanderado&qid=1719673473&sr=8-6";
const selector2 = ".a-offscreen";
const resultText2 = "17,25€";

//Cerrar navegador
afterAll(async () => await closeBrowser());

describe("urlData function", () => {
  it(
    "should return the innerText of the selected element",
    async () => {
      const result = await urlData(url1, selector1);
      expect(result).to.include(resultText1);
    },
    { timeout: 20000 }
  );

  it(
    "should return the innerText of the selected element",
    async () => {
      const result = await urlData(url2, selector2);

      expect(result).to.include(resultText2);
    },
    { timeout: 30000 }
  );

  it("should handle errors and return the error", async () => {
    const url = "http://meteobanyeres.es/";
    const selector = "body";
    const result = await urlData(url, selector);

    expect(result).toBeInstanceOf(Error);
  });
});

// VARIABLES RENDIMIENTO

const numInvocations = 10;
const timeoutTime = numInvocations * 1000;

describe.skip("Load Test Simulation for processData", () => {
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
          urlData(url1, selector1)
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
          .join(" s, ")}`
      );
    },
    { timeout: timeoutTime }
  );
});
