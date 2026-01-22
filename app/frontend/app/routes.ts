import { type RouteConfig,route, index } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    //route("/automation", "routes/FileUpload.tsx"),
    route("/automation","routes/DoAutomation.tsx"),
    route("/options", "routes/CellRangeForm.tsx"),
] satisfies RouteConfig;
