import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Tailwind Buddy",
  base: "/tailwind-buddy/",
  markdown: {
    lineNumbers: true,
  },
  description:
    "Tailwind Buddy: typed Tailwind CSS class composition with SSR-friendly responsive variants.",
  themeConfig: {
    editLink: {
      pattern:
        "https://github.com/busbud/tailwind-buddy/edit/main/packages/documentation/:path",
      text: "Edit this page on GitHub",
    },
    search: {
      provider: "local",
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: "Documentation", link: "/about/" }],
    sidebar: [
      {
        text: "Introduction",
        items: [
          { text: "About Tailwind buddy", link: "/about/" },
          { text: "Benchmarks", link: "/about/benchmarks" },
        ],
      },
      {
        text: "Setup",
        items: [
          { text: "Installation", link: "/setup/" },
          {
            text: "Tailwind Autocomplete in VSCode (Optional)",
            link: "/setup/vscode",
          },
        ],
      },
      {
        text: "Features",
        items: [
          { text: "Basic Component", link: "/features/" },
          { text: "Slots", link: "/features/slots" },
          { text: "Variants", link: "/features/variants" },
          { text: "compoundVariants", link: "/features/compound-variants" },
          {
            text: "Responsive Variants",
            link: "/features/responsive-variants",
          },
        ],
      },
      {
        text: "Guidelines",
        items: [
          { text: "Usage custom Screens", link: "/guidelines/custom-screens" },
          {
            text: "Use with tailwind merge",
            link: "/guidelines/tailwind-merge",
          },
        ],
      },
      {
        text: "Others",
        items: [
          {
            text: "Migration from 2.4.2",
            link: "/others/",
          },
          {
            text: "VueJS Specificity",
            link: "/others/vue-limitation",
          },
        ],
      },
      {
        text: "Contribute",
        items: [
          { text: "Contributing", link: "/contribute/contributing" },
          { text: "Local development", link: "/contribute/local-development" },
        ],
      },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/busbud/tailwind-buddy" },
      { icon: "linkedin", link: "https://www.linkedin.com/in/flozero/" },
    ],
  },
});
