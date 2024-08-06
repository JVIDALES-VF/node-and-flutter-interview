"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const Routes_1 = __importDefault(require("./routes/Routes"));
const PORT = process.env.PORT || 8000;
app_1.default.use('/', Routes_1.default);
app_1.default.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
