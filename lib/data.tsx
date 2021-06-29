import { gtypes } from "@global_types";
import path from "path";
import fs from "fs";
const dataDirectory = path.join(process.cwd(), "_data");

// UTIL FUNCTIONS
function getPathListByCategory(category: gtypes.category) {
    const targetFilePath = path.join(dataDirectory, `${category}.json`);
    const fileContent = JSON.parse(fs.readFileSync(targetFilePath, "utf8"));
    const titleList = fileContent.data.map((it) => it.ContentID);
    return titleList;
}

// [EXPORTED FUNCTIONS] :  FOR
// GET STATIC PROPS

export function getCategoryPageData(category: gtypes.category) {
    const targetFilePath = path.join(dataDirectory, `${category}.json`);
    const fileContent = JSON.parse(fs.readFileSync(targetFilePath, "utf8"));
    return fileContent;
}

export function getSlugPageData(category: gtypes.category, contentId: number) {
    const targetFilePath = path.join(dataDirectory, `${category}.json`);
    const fileContent = JSON.parse(fs.readFileSync(targetFilePath, "utf8"));
    const targetIdx = fileContent.data.findIndex((it) => it.ContentID === parseInt(contentId.toString()));
    return fileContent.data[targetIdx];
}

// [EXPORTED FUNCTIONS] :  FOR
// GET STATIC PATHS
export function getCategoryPages() {
    const pathList = [];
    const fileNames = fs.readdirSync(dataDirectory);
    const categoryList = fileNames.map((it) => it.split(".")[0]);

    categoryList.forEach((category: gtypes.category) => {
        pathList.push({ params: { category: `${category}` } });
    });
    return pathList;
}

export function getDetailPages() {
    const pathList = [];
    const fileNames = fs.readdirSync(dataDirectory);
    const categoryList = fileNames.map((it) => it.split(".")[0]);
    categoryList.forEach((category: gtypes.category) => {
        const paths = getPathListByCategory(category);
        paths.forEach((it) => {
            pathList.push({ params: { category: `${category}`, slug: `${it}` } });
        });
    });
    return pathList;
}
