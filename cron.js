const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  const videoUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'; // Replace with your MV
  await page.goto(videoUrl, { waitUntil: 'networkidle2' });
  await page.waitForTimeout(5000);

  const now = new Date().toISOString().replace(/[:.]/g, '-');
  const screenshotPath = path.join(__dirname, 'public', 'screenshots');
  if (!fs.existsSync(screenshotPath)) fs.mkdirSync(screenshotPath, { recursive: true });

  const fileName = `yt-${now}.png`;
  await page.screenshot({ path: path.join(screenshotPath, fileName) });

  await browser.close();
})();