let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub for teams · Build like the best teams on the planet · GitHub');
  }, 10000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  }, 10000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-muted-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Sign up for free")
  }, 15000);
});

describe("Three different pages tests", () => {
  afterEach(() => {
    page.close();
  });

  test("Docs", async () => {
    await page.goto("https://docs.github.com/ru");
    const title = await page.title();
    expect(title).toContain("GitHub Docs");
  });

  test("h2Span Text under h1", async () => {
    await page.goto("https://github.com/features/security");
    const h2Span = await "h2 span.color-fg-default";
    const h2SpanText = await page.$eval(h2Span, (el) => el.textContent);
    expect(h2SpanText).toEqual(
      "Native application security testing"
    );
  });

  test("The page contains Continue", async () => {
    await page.goto("https://github.com/pricing");
    const btnSelector = ".js-pricing-upgrade-path.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Continue with Team")
  });
});
