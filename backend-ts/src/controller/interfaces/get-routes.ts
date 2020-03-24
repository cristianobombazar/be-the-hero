import {Router} from "express";

export interface GetRoutes {
    addGetRoutes(router: Router): void;
}