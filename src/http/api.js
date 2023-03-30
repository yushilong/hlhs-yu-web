import service from "../http/http";
//接口的封装
//挂车里程报表
export const test = (params) =>
    service.get("/user/test", params);
export const entryAdd = (params) =>
    service.post("/admin/entry/add", params);
export const entryQuery = (params) =>
    service.get("/admin/entry/all", params);

export const entryUpdate = (params) =>
    service.post("/admin/entry/update", params);

export const entryDelete = (params) =>
    service.post("/admin/entry/delete", params);

export const entryTest = (params) =>
    service.get("/admin/entry/test", {
        params: params
    });

export const articleAdd = (params) =>
    service.post("/admin/article/add", params);
export const articleQuery = (params) =>
    service.get("/admin/article/all", params);

export const articleUpdate = (params) =>
    service.post("/admin/article/update", params);

export const articleDelete = (params) =>
    service.post("/admin/article/delete", params);
