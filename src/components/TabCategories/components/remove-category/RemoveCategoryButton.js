"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("./style/removeCategoryButton.css");
const RemoveCategoryButton = ({ categoryName, onClick, className, id }) => {
    return (react_1.default.createElement("button", { className: className, id: id, onClick: onClick },
        "Remove ",
        categoryName));
};
exports.default = RemoveCategoryButton;
