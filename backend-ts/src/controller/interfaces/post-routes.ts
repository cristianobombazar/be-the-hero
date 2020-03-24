import {Router} from "express";

export interface PostRoutes {
    addPostRoutes(router: Router): void;
}