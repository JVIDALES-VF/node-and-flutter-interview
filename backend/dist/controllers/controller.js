"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const model_1 = __importDefault(require("../models/model"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    },
});
const findAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req);
    console.log(res);
    try {
        const users = yield model_1.default.find({});
        res.status(200).json({ status_code: 200,
            response: users
        });
    }
    catch (error) {
        res.status(400).send({
            status_code: 400,
            response: res.status(404).json({ message: error })
        });
    }
});
const uploadFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
        return res.status(400).send({ status_code: 400,
            response: 'No file uploaded.'
        });
    }
    try {
        const jsonString = req.file.buffer.toString('utf8');
        const records = JSON.parse(jsonString);
        for (const record of records) {
            const newRecord = new model_1.default(record);
            yield newRecord.save();
        }
        res.status(200).send({ status_code: 200,
            response: 'Data loaded successfully.'
        });
    }
    catch (error) {
        res.status(500).send({ status_code: 500,
            response: 'Error processing file.'
        });
    }
});
exports.default = {
    findAll,
    uploadFile
};
