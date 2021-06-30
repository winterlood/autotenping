//@ts-ignore
const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const dataDirectory = path.join(process.cwd(), "_data");

const HOSTNAME = "https://somuneza.site/";

const writeRobotsTxt = () => {
    const robot = `
    User-agent: *
    Allow: /
    Sitemap: ${HOSTNAME}/sitemap.xml
    `;
    fs.writeFileSync(path.join("./.next/static", "robots.txt"), robot);
};

const getCategoryPages = () => {
    const pathList = [{ params: { category: "home" } }];
    const fileNames = fs.readdirSync(dataDirectory);
    const categoryList = fileNames.map((it) => it.split(".")[0]);

    categoryList.forEach((category) => {
        pathList.push(`${HOSTNAME}${category}`);
    });
    return pathList;
};

const getDetailPages = () => {
    function getPathListByCategory(category) {
        const targetFilePath = path.join(dataDirectory, `${category}.json`);
        const fileContent = JSON.parse(fs.readFileSync(targetFilePath, "utf8"));
        const titleList = fileContent.data.map((it) => it.ContentID);
        return titleList;
    }

    const pathList = [];
    const fileNames = fs.readdirSync(dataDirectory);
    const categoryList = fileNames.map((it) => it.split(".")[0]);
    categoryList.forEach((category) => {
        const paths = getPathListByCategory(category);
        paths.forEach((it) => {
            pathList.push(`${HOSTNAME}${category}/${it}`);
        });
    });
    return pathList;
};

function main() {
    writeRobotsTxt();
    const categoryPages = getCategoryPages();
    const detailPages = getDetailPages();

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
     xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
      xmlns:xhtml="http://www.w3.org/1999/xhtml"
       xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
     xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
     ${detailPages
         .map((item) => {
             return `<url>
         <loc>${item}</loc>
         <changefreq>monthly</changefreq>
         <priority>1.0</priority>
         </url>
         `;
         })
         .join("")}
     ${categoryPages
         .map((item) => {
             return `<url>
        <loc>${item}</loc>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
        </url>
        `;
         })
         .join("")}
        </urlset>
      `;
    console.log("SITEMAP GENERATED!!!");
    fs.writeFileSync(path.join("./.next/static", "sitemap.xml"), sitemap);

    fetch(`http://www.google.com/ping?sitemap=${HOSTNAME}sitemap.xml`).then(() => console.log("SUCCESS TO PING"));
}

main();
