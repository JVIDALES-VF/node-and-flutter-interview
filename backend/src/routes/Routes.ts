import express, { Router } from 'express';
import exampleController from '../controllers/controller';
import multer from 'multer';



const router: Router = express.Router();



router.get('/articles', exampleController.findAll); 
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.post('/upload', upload.single('file'), exampleController.uploadFile)



export default router;
