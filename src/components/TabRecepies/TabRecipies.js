"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const TabRecipies = ({ tabSwitch }) => {
    return (react_1.default.createElement("div", { className: tabSwitch === 'recipies' ? 'pageContent recipies active' : 'pageContent recipies' },
        react_1.default.createElement("div", null, "Recipies")));
};
exports.default = TabRecipies;
