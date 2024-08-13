import puppeteer from 'puppeteer';

const scrape = async () => {
    const url = "https://www.piracy.su/movie/573435";

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
    });

    const page = await browser.newPage();

    page.on('console', msg => console.log('PAGE LOG:', msg.text()));

    await page.goto(url, {
        waitUntil: "domcontentloaded",
        timeout: 50000
    });

    await page.waitForSelector('iframe', { timeout: 60000 });

    const iframe = await page.$('iframe');

    // Extract the src attribute from the iframe element handle
    const iframeSrc = await iframe.getProperty('src');
    const iframeSrcValue = await iframeSrc.jsonValue();
    console.log("ALPHA")
    console.log(iframeSrcValue);

    // Wait for and click the button to open the dropdown
    await page.waitForSelector('.custom-select-trigger', { timeout: 60000 });
    console.log('Dropdown trigger button found.');
    await page.click('.custom-select-trigger');

    // Wait for the dropdown options to become visible
    await page.waitForSelector('.custom-select-content', { visible: true, timeout: 60000 });
    console.log('Dropdown options are now visible.');

    // Select the desired option
    const options = await page.evaluate(() => {
        const options = Array.from(document.querySelectorAll('.rt-SelectItem'));
        return options.map(option => ({ value: option.value, text: option.textContent }));
    });

    console.log('Options:', options);

    // If desired option is found, click it
    const desiredOptionValue = 'Bravo';
    const optionToClick = await page.evaluate((desiredOptionValue) => {
        const option = Array.from(document.querySelectorAll('.rt-SelectItem')).find(opt => opt.textContent === desiredOptionValue);
        if (option) {
            const mouseDownEvent = new MouseEvent('mousedown', { bubbles: true });
            const mouseUpEvent = new MouseEvent('mouseup', { bubbles: true });
            const clickEvent = new MouseEvent('click', { bubbles: true });

            option.dispatchEvent(mouseDownEvent);
            option.dispatchEvent(mouseUpEvent);
            option.dispatchEvent(clickEvent);
            return `Option with value ${desiredOptionValue} clicked.`;
        } else {
            return `Option with value ${desiredOptionValue} not found.`;
        }
    }, desiredOptionValue);

    console.log(optionToClick);

    await page.waitForSelector('iframe', { timeout: 60000 });
    const newiframe = await page.$('iframe');
    const newiframeSrc = await newiframe.getProperty('src');
    const newiframeSrcValue = await newiframeSrc.jsonValue();

    console.log('Iframe src:', newiframeSrcValue);

    await page.waitForSelector('iframe1', { timeout: 60000 });


    await browser.close();
};

scrape();
