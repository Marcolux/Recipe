"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const TabRecepies = ({ tabSwitch }) => {
    return (react_1.default.createElement("div", { className: tabSwitch === 'recepies' ? 'pageContent recepies active' : 'pageContent recepies' },
        react_1.default.createElement("div", null, "Recepies")));
};
exports.default = TabRecepies;
