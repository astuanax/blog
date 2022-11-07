const axios = require("axios")
const Image = require("@11ty/eleventy-img");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItEleventyImg = require("markdown-it-eleventy-img");


const imageShortcode = (
  src,
  alt,
  width,
  height,
  className = undefined,
  widths = [300, 600],
  formats = ['png', 'webp'],
  sizes = '100vw'
) => {
  let imageMetadata = Image.statsByDimensionsSync(src, width, height, {
    widths: [...widths],
    formats: [...formats],
    outputDir: '_site/img',
    urlPath: '/img',
    sharpPngOptions: {palette: true},
    alt: alt,
    size: sizes
  });

  const getLargestImage = (format) => {
    const images = imageMetadata[format];
    return images[images.length - 1];
  }

  const largestUnoptimizedImg = getLargestImage(formats[0]);

  return Image.generateHTML(imageMetadata, {
    src: largestUnoptimizedImg.url,
    width: largestUnoptimizedImg.width,
    height: largestUnoptimizedImg.height,
    alt: alt,
    loading: 'lazy',
    decoding: 'async',
  });
};

// function to get blogposts
async function getAllBlogposts() {
  // max number of records to fetch per query
  const recordsPerQuery = 100;

  // number of records to skip (start at 0)
  let recordsToSkip = 0;

  // do we make a query ?
  let makeNewQuery = true;

  // Blogposts array
  let blogposts = [];

  // make queries until makeNewQuery is set to false

  while (makeNewQuery) {
    try {
      // initiate fetch
      const data = await axios({
        url: "http://localhost:1337/graphql",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data:
          {
            query: "query{\n" +
              "      articles{\n" +
              "       \tdata {\n" +
              "          id\n" +
              "          attributes {\n" +
              "            slug\n" +
              "            title\n" +
              "            description\n" +
              "            content\n" +
              "            publishedAt\n" +
              "            category {data {attributes { name }}}\n" +
              "            image { data  {attributes {name hash alternativeText height width url formats}}}\n" +
              "          }\n" +
              "        }\n" +
              "      }\n" +
              "    }"
          }
      });

      // store the JSON response when promise resolves
      const response = await data.data;

      // handle CMS errors
      if (response.errors) {
        let errors = response.errors;
        errors.map((error) => {
          console.log(error.message);
        });
        throw new Error("Houston... We have a CMS problem");
      }

      // update blogpost array with the data from the JSON response
      blogposts = blogposts.concat(response.data.articles.data);

      // prepare for next query
      recordsToSkip += recordsPerQuery;

      // stop querying if we are getting back less than the records we fetch per query
      if (response.data.articles.data.length < recordsPerQuery) {
        makeNewQuery = false;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async function cacheImage(url, widths) {
    let img = await Image("http://localhost:1337" + url, {
      formats: ["png", "webp", "jpeg"],
      widths: widths,
      sharpPngOptions: {palette: true}
    });
    return img
  }

  // format blogposts objects
  const blogpostsFormatted = blogposts.map((item) => {
    const tags = item.attributes.category.data ? item.attributes.category.data.attributes.name : ""
    let image = {}
    if (item.attributes.image.data) {
      cacheImage(item.attributes.image.data.attributes.url, [300, 600])
    }
    const md = new markdownIt({
      html: true,
      linkify: true
    }).use(markdownItAnchor, {
      permalink: markdownItAnchor.permalink.ariaHidden({
        placement: "after",
        class: "invisible md:visible direct-link ",
        symbol: "#"
      }),
      level: [1, 2, 3, 4]
    }).use(markdownItEleventyImg, {
      imgOptions: {
        widths: [300, 600],
        formats: ['png', 'webp'],
        outputDir: '_site/assets/images',
        urlPath: '/assets/images',
        formats: ["avif", "webp", "png"]
      },
      globalAttributes: {
        class: "markdown-image",
        decoding: "async",
        width: 300,
        height: 300,
        // If you use multiple widths,
        // don't forget to add a `sizes` attribute.
        sizes: "100vw"
      }, renderImage(image, attributes) {
        const [src, attrs] = attributes;
        try {
          cacheImage(src, [300,600])
        } catch (e){
          // console.error(e)
        }
        const picture = imageShortcode("http://localhost:1337" + src, "alt", Number(attrs.width),Number(attrs.height))
        // console.log({picture})
        return picture
      }
    });

    const html = md.render(item.attributes.content)


    return {
      id: item.id,
      title: item.attributes.title,
      description: item.attributes.description.split(". "),
      slug: item.attributes.slug,
      body: html,
      date: new Date(item.attributes.publishedAt),
      tags: [tags],
      tag: item.attributes.category.data.attributes.name,
      image: {
        url: item.attributes.image.data ? "http://localhost:1337" + item.attributes.image.data.attributes.url : null,
        alt: "alt txt"
      }
    };
  });

  // return formatted blogposts
  return blogpostsFormatted;
}

// export for 11ty

module.exports = getAllBlogposts;
