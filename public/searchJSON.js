const searchJSON = {
  "@context": "https://schema.org/",
  "@type": "WebSite",
  name: "Ria bid",
  url: "https://www.riabid.ge/",
  potentialAction: {
    "@type": "SearchAction",
    target:
      "https://www.riabid.ge/search{search_term_string}https://www.riabid.ge/search?search=",
    "query-input": "required name=search_term_string",
  },
};

export default searchJSON;
