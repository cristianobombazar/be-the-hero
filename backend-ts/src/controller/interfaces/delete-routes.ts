import {Router} from "express";

export interface DeleteRoutes {
    addDeleteRoutes(router: Router): void;
}