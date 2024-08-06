"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("../controllers/controller"));
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
router.get('/articles', controller_1.default.findAll);
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
router.post('/upload', upload.single('file'), controller_1.default.uploadFile);
exports.default = router;
