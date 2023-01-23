const { DateTime } = require("luxon");
const readingTime = require("eleventy-plugin-reading-time");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const htmlmin = require("html-minifier");
const fs = require("fs");
const path = require("path");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

const isDev = process.env.ELEVENTY_ENV === "development";
const isProd = process.env.ELEVENTY_ENV === "production";

const manifestPath = path.resolve(
  __dirname,
  "public",
  "assets",
  "manifest.json"
);

const manifest = isDev
  ? {
      "main.js": "/assets/main.js",
      "main.css": "/assets/main.css",
    }
  : JSON.parse(fs.readFileSync(manifestPath, { encoding: "utf8" }));

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(readingTime);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(syntaxHighlight);

  const markdownItOptions = {
    html: true,
  };

  // Options for the `markdown-it-anchor` library
  const markdownItAnchorOptions = {
    // permalink: markdownItAnchor.permalink.linkAfterHeader({
    //   style: "visually-hidden",
    //   assistiveText: (title) => `Permalink to “${title}”`,
    //   visuallyHiddenClass: "visually-hidden",
    //   wrapper: ['<div class="wrapper">', "</div>"],
    // }),
    level: [2, 3],
    tabIndex: false,
  };

  const markdownLib = markdownIt(markdownItOptions).use(
    markdownItAnchor,
    markdownItAnchorOptions
  );

  eleventyConfig.setLibrary("md", markdownLib);

  // setup mermaid markdown highlighter
  const highlighter = eleventyConfig.markdownHighlighter;
  eleventyConfig.addMarkdownHighlighter((str, language) => {
    if (language === "mermaid") {
      return `<pre class="mermaid">${str}</pre>`;
    }
    return highlighter(str, language);
  });

  eleventyConfig.setDataDeepMerge(true);
  eleventyConfig.addPassthroughCopy({ "src/images": "images" });
  eleventyConfig.setBrowserSyncConfig({ files: [manifestPath] });

  eleventyConfig.addShortcode("bundledcss", function () {
    return manifest["main.css"]
      ? `<link href="${manifest["main.css"]}" rel="stylesheet" />`
      : "";
  });

  eleventyConfig.addShortcode("bundledjs", function () {
    return manifest["main.js"]
      ? `<script src="${manifest["main.js"]}"></script>`
      : "";
  });

  eleventyConfig.addFilter("excerpt", (post) => {
    const content = post.replace(/(<([^>]+)>)/gi, "");
    return content.substr(0, content.lastIndexOf(" ", 200)) + "...";
  });

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "dd LLL yyyy"
    );
  });

  eleventyConfig.addFilter("split", (content, idx) => {
    const splitContent = content.split("<hr>");

    return splitContent[idx];
  });

  eleventyConfig.addFilter("getUnorderedListContent", (content) => {
    if (!content) return content;

    const listItems = content.match(/<ul>(?<content>[\s\S]*)<\/ul>/);

    return listItems.group.content;
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  eleventyConfig.addFilter("dateToIso", (dateString) => {
    return new Date(dateString).toISOString();
  });

  eleventyConfig.addFilter("head", (array, n) => {
    if (n < 0) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  eleventyConfig.addFilter("status", (posts, status) => {
    return posts.filter((post) => {
      if (post.data.hidden && post.data.hidden === true) return false; // always hide hidden posts
      if (post.data.status === undefined) return false;

      return post.data.status.toLowerCase() === status;
    });
  });

  eleventyConfig.addFilter(
    "filterTags",
    (posts, tagsToInclude, tagsToIgnore = []) => {
      return posts.filter((post) => {
        const { tags } = post.data;
        if (tags === undefined) return false;

        const hasTag = tags
          .filter((tag) => !tagsToIgnore.includes(tag))
          .find((tag) => {
            return tagsToInclude.includes(tag);
          });

        return hasTag !== undefined;
      });
    }
  );

  eleventyConfig.addCollection("tagList", function (collection) {
    let tagSet = new Set();
    collection.getAll().forEach(function (item) {
      if ("tags" in item.data) {
        let tags = item.data.tags;

        tags = tags.filter(function (item) {
          switch (item) {
            case "all":
            case "nav":
            case "post":
            case "posts":
              return false;
          }

          return true;
        });

        for (const tag of tags) {
          tagSet.add(tag);
        }
      }
    });

    return [...tagSet].sort((a, b) => a.localeCompare(b));
  });

  eleventyConfig.addCollection("popular", (collection) => {
    const popularPosts = collection.getAll().filter((post) => {
      return "popularity" in post.data;
    });

    popularPosts.sort(
      ({ data: dataA }, { data: dataB }) => dataB.popularity - dataA.popularity
    );

    console.log(popularPosts.length);

    return popularPosts;
  });

  eleventyConfig.addCollection("favorite", (collection) => {
    const favoritePosts = collection.getAll().filter((post) => {
      return "favorite" in post.data;
    });

    favoritePosts.sort(
      ({ data: dataA }, { data: dataB }) => dataB.favorite - dataA.favorite
    );

    console.log(favoritePosts.length);

    return favoritePosts;
  });

  eleventyConfig.addFilter("pageTags", (tags) => {
    const generalTags = ["all", "nav", "post", "posts"];

    return tags
      .toString()
      .split(",")
      .filter((tag) => {
        return !generalTags.includes(tag);
      });
  });

  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    if (outputPath && outputPath.endsWith(".html") && isProd) {
      return htmlmin.minify(content, {
        removeComments: true,
        collapseWhitespace: true,
        useShortDoctype: true,
      });
    }

    return content;
  });

  return {
    dir: {
      input: "src",
      output: "public",
      includes: "includes",
      data: "data",
      layouts: "layouts",
    },
    passthroughFileCopy: true,
    templateFormats: ["html", "njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
