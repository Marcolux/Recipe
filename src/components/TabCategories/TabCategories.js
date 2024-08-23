"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const TabCategories = ({ tabSwitch }) => {
    return (react_1.default.createElement("div", { className: tabSwitch === 'categories' ? 'pageContent categories active' : 'pageContent categories' },
        react_1.default.createElement("div", null, "Categories")));
};
exports.default = TabCategories;
