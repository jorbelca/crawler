import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());
import "dotenv/config";

// FUNCION PRINCIPAL
export const urlData = async function run(url, selector) {
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
      timeout: 30000,
    });
    await page.setViewport({ width: 1080, height: 1024 });
    await page.waitForSelector("body", { timeout: 10000 });

    const html = await page.$eval(selector, (el) => el.innerText);

    return html;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    return error;
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

// const transformURL = (url) => {
//   if (url) return url.match(/\b((www)\.)[-A-Z0-9+&@#%?=~_|$!:,.;]*/gi)[0];
// };
