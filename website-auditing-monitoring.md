{"id":"13","title":"Website monitoring and auditing with Lighthouse ","description":["Lighthouse is an open-source application developed by Google that can evaluate the performance, technical SEO and accessibility of a webpage","\nLighthouse is part of every Chrome browser, and you can run these audits yourself if you want to and have the time and resources to do so","\nBut what if you have 1000+ pages? "],"slug":"website-auditing-monitoring","body":"<h3 id=\"open-source-made-by-google\" tabindex=\"-1\">Open-source made by Google <a class=\"invisible md:visible direct-link \" href=\"#open-source-made-by-google\" aria-hidden=\"true\">#</a></h3>\n<p>Lighthouse is an open-source application developed by Google that can evaluate the performance, technical SEO and accessibility of a webpage.</p>\n<p>If you have never heard from Lighthouse, try it yourself.</p>\n<ul>\n<li>Open Chrome, right-click and select &quot;<code>Inspect</code>&quot;.</li>\n<li>Select the &quot; <code>Lighthouse</code> &quot; tab and click &quot;<code>Analyze page load</code>&quot;.</li>\n</ul>\n<p>It will take a minute to finish, and you'll be presented with a list of failed and passed audits.</p>\n<p><picture><source type=\"image/webp\" srcset=\"/img/ar5SiJFib3-300.webp 300w\"><img src=\"/img/ar5SiJFib3-300.png\" width=\"300\" height=\"300\" alt=\"alt\" loading=\"lazy\" decoding=\"async\"></picture></p>\n<p>Lighthouse is part of every Chrome browser, and you can run these audits yourself if you want to and have the time and resources to do so.</p>\n<p>But what if you have 1000+ pages?\nWill you run Lighthouse on each of those?</p>\n<p>Or let's say you have 20 templates?\nWill the developer test each template and some reference pages with it?</p>\n<p>Most development teams will need more time to run these tests.\nAnd I am sure managers prefer expensive developers to focus on other tasks.\nRight?</p>\n<p>Sitefig uses Lighthouse to audit and monitors all pages on your website using both standard and custom audits.</p>\n<h3 id=\"custom-audit-accessibility\" tabindex=\"-1\">Custom audit accessibility <a class=\"invisible md:visible direct-link \" href=\"#custom-audit-accessibility\" aria-hidden=\"true\">#</a></h3>\n<p>Accessibility is one of those custom audits because the standard Lighthouse runs only a limited set of audits.</p>\n<p>Our Accessibility audit covers the latest in open-source technology, which we complement with a list of other accessibility issues ranging from identifying emojis to CSS issues that affect accessibility.</p>\n<p>Sitefig also stores screenshots of how the website looks for people with limited vision and color-blindness.\n<picture><source type=\"image/webp\" srcset=\"/img/Ym_p-Hvmfv-300.webp 300w\"><img src=\"/img/Ym_p-Hvmfv-300.png\" width=\"300\" height=\"300\" alt=\"alt\" loading=\"lazy\" decoding=\"async\"></picture></p>\n<h3 id=\"custom-audit-for-broken-links\" tabindex=\"-1\">Custom audit for broken links <a class=\"invisible md:visible direct-link \" href=\"#custom-audit-for-broken-links\" aria-hidden=\"true\">#</a></h3>\n<p>To ensure Sitefig finds all potential links, we drill deep into the code and HTTP headers to find all likely URLs available on your website.</p>\n<p>Once we have a list of URLs available on your website, all these are verified and retrieved. The broken link check includes audits for broken SSL/TLS certificates, missing DNS, and invalid URL syntax.</p>\n<h3 id=\"standard-performance-audit\" tabindex=\"-1\">Standard Performance audit <a class=\"invisible md:visible direct-link \" href=\"#standard-performance-audit\" aria-hidden=\"true\">#</a></h3>\n<p>The Core web metrics recorded by Lighthouse are lab results based on an actual browser with 1 CPU and 1.5 Gb available memory. The metrics are based on the same hardware and network throughput baseline. That way, Sitefig can reliably compare results between pages and between websites using, avoiding fluctuating real-world conditions.</p>\n<p><picture><source type=\"image/webp\" srcset=\"/img/ESvqbxQfMi-300.webp 300w\"><img src=\"/img/ESvqbxQfMi-300.png\" width=\"300\" height=\"300\" alt=\"alt\" loading=\"lazy\" decoding=\"async\"></picture></p>\n<p>Besides the lab results, Sitefig also pulls all the real-world data from Google and analyses it to see which pages perform and which do not.</p>\n<h3 id=\"lighthouse-is-a-core-part-of-sitefig.\" tabindex=\"-1\">Lighthouse is a core part of Sitefig. <a class=\"invisible md:visible direct-link \" href=\"#lighthouse-is-a-core-part-of-sitefig.\" aria-hidden=\"true\">#</a></h3>\n<p>The Lighthouse application is a core part of our crawler and auditing infrastructure.</p>\n<p>It records performance metrics, identifies privacy issues around trackers and cookies, and allows slow-level access to any part of the code of a webpage.</p>\n<p>It is used with standard and custom audits and is loaded using a real browser, Chromium, using the same resources for each run.</p>\n<p>In total, Sitefig runs over 300 audits on each page and website. Allowing the developer to focus on what they do best and leave out the routine checks to Sitefig.</p>\n","date":"2022-11-07T13:30:06.041Z","tags":["tech"],"tag":"tech","image":{"url":"http://localhost:1337/uploads/DALL_E_2022_11_07_14_02_57_a_lighthouse_in_a_stormy_sea_14b74a8c07.png","alt":"alt txt"}}