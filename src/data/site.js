require("dotenv").config();

console.log("***");
console.log({ isDevEnvironment: process.env.IS_DEV_ENVIRONMENT });

module.exports = {
  name: "Stuart Urback",
  description: "The hosting spot for my ",
  url: "https://urback.net",
  author: {
    name: "Author Name",
    email: "author@site.com",
    twitterHandle: "author_handle",
  },
  defaultSocialImage: "/images/default-social-image.png",
  headerLinks: [
    {
      text: "Games + Culture",
      url: "/culture",
    },
    {
      text: "Serverless Deep Dive",
      url: "/serverless",
    },
    {
      text: "Blog",
      url: "/blog",
      external: false,
    },
    {
      text: "About",
      url: "/about",
      external: false,
    },
  ],
  socialLinks: [
    {
      text: "GitHub",
      url: "https://github.com/stuwert",
      external: true,
    },
    {
      text: "Linkedin",
      url: "https://linkedin.com/in/stuwert",
      external: true,
    },
  ],
  footerLinks: [
    {
      text: "RSS",
      url: "/feed.xml",
      external: true,
    },
  ],
  showFooterAttribution: true,
  isProdEnvironment:
    !process.env.IS_DEV_ENVIRONMENT ||
    process.env.IS_DEV_ENVIRONMENT === "false",
};
