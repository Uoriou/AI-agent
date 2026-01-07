import { type RouteConfig,route, index } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/automation", "routes/ExcelAutomation.tsx"),
    route("/options", "routes/Options.tsx"),
] satisfies RouteConfig;
