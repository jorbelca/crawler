import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());
import "dotenv/config";

const MAX_RETRIES = 3; // Número máximo de reintentos

// FUNCION PRINCIPAL
export const urlData = async function run(url, selector, retries = 0) {
  const browser = await getBrowser();
  const page = await browser.newPage();
  try {
    // Interceptar solicitudes para bloquear ciertos recursos
    await page.setRequestInterception(true);
    page.on("request", (request) => {
      const resourceType = request.resourceType();
      if (
        resourceType === "image" ||
        resourceType === "stylesheet" ||
        resourceType === "font" ||
        resourceType === "media"
      ) {
        request.abort();
      } else {
        request.continue();
      }
    });

    await page.goto(url, {
      waitUntil: "networkidle2",
      timeout: 25000,
    });
    await page.setViewport({ width: 1080, height: 1024 });
    await page.waitForSelector(selector, { timeout: 5000 });

    const data = await page.$eval(selector, (el) => el.innerText);

    return data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    if (error.name === "TimeoutError" && retries < MAX_RETRIES) {
      console.log(`Retrying... (${retries + 1}/${MAX_RETRIES})`);
      if (browser) {
        await closeBrowser();
      }
      // Volver a ejecutar la funcion
      return urlData(url, selector, retries + 1);
    } else {
      // Devolver un  Error en lugar de lanzar la excepción
      return new Error(error.message);
    }
  } finally {
    await page.close();
  }
};

// FUNCIONES GESTORAS DE INSTANCIAS DEL NAVEGADOR

let browserInstance = null;

async function getBrowser() {
  if (!browserInstance) {
    browserInstance = await puppeteer.launch({
      headless: true,
      executablePath:
        process.env.NODE_ENV === "production"
          ? process.env.PUPPETEER_EXECUTABLE_PATH
          : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      args: ["--no-zygote", "--no-sandbox"],
    });
  }
  return browserInstance;
}

export async function closeBrowser() {
  if (browserInstance) {
    await browserInstance.close();
    browserInstance = null;
  }
}
