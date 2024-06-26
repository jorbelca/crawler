import { describe, it, expect} from "vitest";
import { urlData } from "../src/scraper/indexScrapper";

describe("urlData function", () => {
  it("should return the innerText of the selected element", async () => {
    const url = "https://thesmallcrawler.vercel.app/";
    const selector = "#logo";
    const result = await urlData(url, selector);

    expect(result).to.include("theSmallCrawler");
  });

  it("should handle errors and return the error", async () => {
    const url = "http://meteobanyeres.es/";
    const selector = "body";
    const result = await urlData(url, selector);

    expect(result).toBeInstanceOf(Error);
  });
});
