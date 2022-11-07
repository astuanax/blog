const fs = require("fs");

const outdent = require('outdent');

const {DateTime} = require("luxon");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginNavigation = require("@11ty/eleventy-navigation");

const Image = require('@11ty/eleventy-img');
const markdownItEleventyImg = require("markdown-it-eleventy-img");

const stringifyAttributes = (attributeMap) => {
  return Object.entries(attributeMap)
    .map(([attribute, value]) => {
      if (typeof value === 'undefined') return '';
      return `${attribute}="${value}"`;
    })
    .join(' ');
};

module.exports = function (eleventyConfig) {


  const imageShortcode = async (
    src,
    alt,
    className = undefined,
    widths = [300, 600],
    formats = ['png', 'webp'],
    sizes = '100vw'
  ) => {
    const imageMetadata = await Image(src, {
      widths: [...widths, null],
      formats: [...formats, null],
      outputDir: '_site/img',
      urlPath: '/img',
    });

    const sourceHtmlString = Object.values(imageMetadata)
      // Map each format to the source HTML markup
      .map((images) => {
        // The first entry is representative of all the others
        // since they each have the same shape
        const {sourceType} = images[0];

        // Use our util from earlier to make our lives easier
        const sourceAttributes = stringifyAttributes({
          type: sourceType,
          // srcset needs to be a comma-separated attribute
          srcset: images.map((image) => image.srcset).join(', '),
          sizes,
        });

        // Return one <source> per format
        return `<source ${sourceAttributes}>`;
      })
      .join('\n');

    const getLargestImage = (format) => {
      const images = imageMetadata[format];
      return images[images.length - 1];
    }

    const largestUnoptimizedImg = getLargestImage(formats[0]);
    const imgAttributes = stringifyAttributes({
      src: largestUnoptimizedImg.url,
      width: largestUnoptimizedImg.width,
      height: largestUnoptimizedImg.height,
      alt,
      loading: 'lazy',
      decoding: 'async',
    });
    const imgHtmlString = `<img ${imgAttributes}>`;

    const pictureAttributes = stringifyAttributes({
      class: className,
    });
    const picture = `<picture ${pictureAttributes}>
    ${sourceHtmlString}
    ${imgHtmlString}
  </picture>`;

    return outdent`${picture}`;
  };

  eleventyConfig.addNunjucksAsyncShortcode('image', imageShortcode);


  // Copy the `img` and `css` folders to the output
  eleventyConfig.addPassthroughCopy("img");

  // Add plugins
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.addPlugin(pluginNavigation);

  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("dd LLL yyyy");
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
  });

  eleventyConfig.addFilter("poplast", (array) => {
    const last = array.length - 1
    return array.slice(0, last)
  });

  eleventyConfig.addFilter("popfirst", (array, n) => {
    // const last = array.length - 1
    return array.slice(1, array.length)
  });

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("head", (array, n) => {
    if (!Array.isArray(array) || array.length === 0) {
      return [];
    }
    if (n < 0) {
      return array.slice(n);
    }
    if (n >= array.length) {
      n = array.length
    }
    return array.slice(0, n);
  });


  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("news", (array) => {
    if (!Array.isArray(array) || array.length === 0) {
      return [];
    }
    return array.filter(post => post.tags.includes("news"))
  });

  // Return the smallest number argument
  eleventyConfig.addFilter("min", (...numbers) => {
    return Math.min.apply(null, numbers);
  });


  function filterTagList(tags) {
    return (tags || []).filter(tag => ["all", "nav", "post", "posts", "news", "tech"].indexOf(tag) === -1);
  }

  eleventyConfig.addFilter("filterTagList", filterTagList)

  // Create an array of all tags


  eleventyConfig.addCollection("tagList", function (collection) {
    return [
      { "name": "news"}, { "name": "tech"}, ];
  });

  // Customize Markdown library and settings:
  let markdownLibrary = markdownIt({
    html: true,
    linkify: true
  }).use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.ariaHidden({
      placement: "after",
      class: "hidden md:visible direct-link ",
      symbol: "#"
    }),
    level: [1, 2, 3, 4],
    slugify: eleventyConfig.getFilter("slugify")
  }).use(markdownItEleventyImg, {
    imgOptions: {
      widths: [300, 600],
      formats: ['png', 'webp'],
      outputDir: '_site/img',
      urlPath: '/img',
      formats: ["avif", "webp", "png"]
    },
    globalAttributes: {
      class: "markdown-image",
      decoding: "async",
      // If you use multiple widths,
      // don't forget to add a `sizes` attribute.
      sizes: "100vw"
    }, renderImage(image, attributes) {
      const [src, attrs] = attributes;

      const root = "http://localhost:1337" // should be .env var
      return imageShortcode(root + src, attrs.alt)

    }
  });
  eleventyConfig.setLibrary("md", markdownLibrary);

  // Override Browsersync defaults (used only with --serve)
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function (err, browserSync) {
        const content_404 = fs.readFileSync('_site/404.html');

        browserSync.addMiddleware("*", (req, res) => {
          // Provides the 404 content without redirect.
          res.writeHead(404, {"Content-Type": "text/html; charset=UTF-8"});
          res.write(content_404);
          res.end();
        });
      },
    },
    ui: false,
    ghostMode: false
  });


  return {
    // Control which files Eleventy will process
    // e.g.: *.md, *.njk, *.html, *.liquid
    templateFormats: [
      "md",
      "njk",
      "html",
      "liquid"
    ],

    // Pre-process *.md files with: (default: `liquid`)
    markdownTemplateEngine: "njk",

    // Pre-process *.html files with: (default: `liquid`)
    htmlTemplateEngine: "njk",

    // -----------------------------------------------------------------
    // If your site deploys to a subdirectory, change `pathPrefix`.
    // Don’t worry about leading and trailing slashes, we normalize these.

    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for link URLs (it does not affect your file structure)
    // Best paired with the `url` filter: https://www.11ty.dev/docs/filters/url/

    // You can also pass this in on the command line using `--pathprefix`

    // Optional (default is shown)
    pathPrefix: "/",
    // -----------------------------------------------------------------

    // These are all optional (defaults are shown):
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};
