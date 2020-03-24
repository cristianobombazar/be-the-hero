import {Router} from "express";

export interface Controller {
    useRouter(router: Router): void;
}