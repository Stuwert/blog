require("dotenv").config();

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
      text: "Serverless Deep Dive",
      url: "/serverless",
    },
    {
      text: "Tags",
      url: "/tags",
      external: false,
    },
    {
      text: "Best Writing",
      url: "/best",
      external: false,
    },
    {
      text: "Resume",
      url: "https://docs.google.com/document/d/19TyMS64cFh-DTWb3PHIyroicCF33Z6EX8P8TahwW1JY",
      external: true,
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
    {
      text: "Writing about Game Design",
      url: "https://curate.games",
      external: true,
    }
  ],
  footerLinks: [
    {
      text: "RSS",
      url: "/feed.xml",
      external: true,
    },
  ],
  showFooterAttribution: true,
  isDevEnvironment:
    process.env.IS_DEV_ENVIRONMENT && process.env.IS_DEV_ENVIRONMENT === "true",
};
