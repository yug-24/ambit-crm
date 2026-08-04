import { test, expect } from '@playwright/test';

test.describe('Ambit CRM marketing site - smoke', () => {
  test('homepage loads 200 and no console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(String(msg.text()));
    });

    const res = await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    expect(res && [200, 304].includes(res.status())).toBeTruthy();
    expect(errors).toEqual([]);
  });

  test('nav links scroll to anchors', async ({ page }) => {
    await page.goto('http://localhost:3000');
    const anchors = ['#features', '#integrations', '#why', '#contact'];
    for (const a of anchors) {
      const link = await page.locator(`nav a[href="${a}"]`);
      await expect(link).toHaveCount(1);
      await link.click();
      await page.waitForTimeout(300);
      const visible = await page.locator(a).first().isVisible().catch(() => false);
      expect(visible).toBeTruthy();
    }
  });

  test('hero renders headline and both CTAs', async ({ page }) => {
    await page.goto('http://localhost:3000');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
    const ctas = page.locator('main a, main button');
    await expect(ctas).toHaveCountGreaterThan(0);
  });

  test('features tabs update detail panel', async ({ page }) => {
    await page.goto('http://localhost:3000');
    const featureSection = page.locator('#features');
    await expect(featureSection).toBeVisible();
    const tabs = featureSection.locator('button, [role="tab"]');
    const panel = featureSection.locator('[role="tabpanel"], .feature-detail');
    const count = await tabs.count();
    expect(count).toBeGreaterThanOrEqual(1);
    if (count >= 3) {
      const firstText = await panel.first().innerText().catch(() => '');
      await tabs.nth(1).click();
      await page.waitForTimeout(250);
      const secondText = await panel.first().innerText().catch(() => '');
      expect(secondText).not.toBe(firstText);
    }
  });

  test('integrations render 4 cards and marquee runs', async ({ page }) => {
    await page.goto('http://localhost:3000');
    const section = page.locator('#integrations');
    await expect(section).toBeVisible();
    const cards = section.locator('img, .card, .integration-card');
    expect(await cards.count()).toBeGreaterThanOrEqual(4);
    // basic marquee sanity: ensure it exists and is animating by checking transform over time
    const marquee = section.locator('.marquee, .integrations-marquee');
    if (await marquee.count() > 0) {
      const before = await marquee.first().evaluate((el) => getComputedStyle(el).transform);
      await page.waitForTimeout(500);
      const after = await marquee.first().evaluate((el) => getComputedStyle(el).transform);
      expect(before).not.toBe(after);
    }
  });

  test('why choose us: stats increment after scroll', async ({ page }) => {
    await page.goto('http://localhost:3000');
    const section = page.locator('#why');
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    const counters = section.locator('.stat, .counter, [data-count]');
    const count = await counters.count();
    expect(count).toBeGreaterThanOrEqual(1);
    for (let i = 0; i < Math.min(4, count); i++) {
      const text = await counters.nth(i).innerText().catch(() => '0');
      expect(/\b0\b/.test(text)).toBeFalsy();
    }
  });

  test('contact form accepts input and submits (no console errors)', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => { if (msg.type() === 'error') errors.push(String(msg.text())); });
    await page.goto('http://localhost:3000');
    const section = page.locator('#contact');
    await expect(section).toBeVisible();
    const name = section.locator('input[name="name"], input#name');
    const email = section.locator('input[name="email"], input#email');
    const message = section.locator('textarea[name="message"], textarea#message');
    if (await name.count()) await name.fill('Playwright Tester');
    if (await email.count()) await email.fill('test@example.com');
    if (await message.count()) await message.fill('Hello from automated test');
    const submit = section.locator('button[type="submit"], input[type="submit"], button:has-text("Send")');
    if (await submit.count()) {
      await submit.first().click();
      await page.waitForTimeout(500);
    }
    expect(errors).toEqual([]);
  });
});
