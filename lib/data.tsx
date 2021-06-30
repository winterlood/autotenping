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

function getThumbnailByCategory(category: gtypes.category) {
    switch (category) {
        case "edu":
            return "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80";
        case "certificate":
            return "https://images.unsplash.com/photo-1570610159825-ec5d3823660c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1491&q=80";
        case "it":
            return "https://images.unsplash.com/photo-1537884944318-390069bb8665?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80";
        case "health":
            return "https://images.unsplash.com/photo-1561729955-89357c733059?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80";
        case "hospital":
            return "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1035&q=80";
        case "game":
            return "https://images.unsplash.com/photo-1511882150382-421056c89033?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Z2FtZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";
        case "beauty":
            return "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhdXR5fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";
        case "finance":
            return "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGZpbmFuY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";
        case "insurance":
            return "https://images.unsplash.com/photo-1518904868869-fbb2cdd0429a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8aW5zdXJhbmNlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";
        case "business":
            return "https://images.unsplash.com/photo-1462206092226-f46025ffe607?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8YnVzaW5lc3N8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";
        case "car":
            return "https://images.unsplash.com/photo-1493238792000-8113da705763?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";
        case "shopping":
            return "https://images.unsplash.com/photo-1525328437458-0c4d4db7cab4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzV8fHNob3BwaW5nfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";
        case "living":
            return "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8bGl2aW5nfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";
        case "entertainment":
            return "https://images.unsplash.com/photo-1499364615650-ec38552f4f34?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZW50ZXJ0YWlubWVudHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";
        case "social":
            return "https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8c29jaWFsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";
        case "others":
            return "https://images.unsplash.com/photo-1504275107627-0c2ba7a43dba?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8b3RoZXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";
        default:
            return "https://images.unsplash.com/photo-1496262967815-132206202600?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cXVlc3Rpb258ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";
    }
}

// [EXPORTED FUNCTIONS] :  FOR
// GET STATIC PROPS

export function getCategoryPageData(category: gtypes.category) {
    //@ts-ignore
    if (category === "home") {
        const fileNames = fs.readdirSync(dataDirectory);
        const fileLengthList = fileNames.map((it) => {
            const targetFilePath = path.join(dataDirectory, `${it}`);
            const fileContent = JSON.parse(fs.readFileSync(targetFilePath, "utf8"));
            return {
                category: it.split(".")[0],
                item_count: fileContent.data.length,
                // @ts-ignore
                thumbnailUrl: getThumbnailByCategory(it.split(".")[0]),
                link: "/" + it.split(".")[0],
            };
        });

        fileLengthList.sort(function (a, b) {
            return a.item_count > b.item_count ? -1 : a.item_count < b.item_count ? 1 : 0;
        });
        return fileLengthList;
    } else {
        const targetFilePath = path.join(dataDirectory, `${category}.json`);
        const fileContent = JSON.parse(fs.readFileSync(targetFilePath, "utf8"));
        return fileContent;
    }
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
    const pathList = [{ params: { category: "home" } }];
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
