import puppeteer from "puppeteer-extra"
import StealthPlugin from "puppeteer-extra-plugin-stealth"
puppeteer.use(StealthPlugin())
import "dotenv/config"

import { executablePath } from "puppeteer"

export const urlData = async function run(url, selector) {
  // const urlHost = await transformURL(url)
  // { urlHost !== undefined ? urlHost : '' }
  const browser = await puppeteer.launch({
    headless: true,
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : executablePath(),
    args: ["--no-zygote", "--no-sandbox"],
  })
  try {
    const page = await browser.newPage()

    await page.goto(url)
    await page.setViewport({ width: 1080, height: 1024 })
    await page.waitForSelector("body", 5000)

    const html = await page.$eval(selector, (el) => el.innerText)

    console.log(html)
    return html
  } catch (error) {
    console.log(error)
    return error
  } finally {
    await browser.close()
  }
}

const transformURL = (url) => {
  if (url) return url.match(/\b((www)\.)[-A-Z0-9+&@#%?=~_|$!:,.;]*/gi)[0]
}
