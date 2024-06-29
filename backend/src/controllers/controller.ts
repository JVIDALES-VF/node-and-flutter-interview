import { Request, Response } from 'express';
import multer from 'multer';
import ArticleSchema from '../models/model'

const storage = multer.diskStorage({
    destination: (req: Request, file, cb) => {
      cb(null, './uploads');
    },
    filename: (req: Request, file, cb) => {
      cb(null, Date.now() + file.originalname);
    },
  });

const upload = multer({ storage }).single('jsonFile');


 const saveArticles =  (req: Request, res: Response) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).send('Error al subir el archivo.');
    }
    // Procesa el archivo JSON y guárdalo en MongoDB
    try {
      const data = require('C:/Users/OmarVidales/Prueba_flutter_node/node-and-flutter-interview\data.json'); // Reemplaza con la ruta correcta
      const ArticleModel = ArticleSchema
      await ArticleModel.insertMany(data);
      return res.status(200).send(
        {
          status_code: 200,
          message: 'Datos guardados correctamente.'
        });
    } catch (error) {
      return res.status(500).send('Error al guardar los datos en MongoDB.');
    }
  });
};

const findAll = async (req: Request, res: Response): Promise<void> => {
  console.log(req)
  console.log(res)
  try {
      const users = await ArticleSchema.find({});
      res.status(200).json(
        {status_code: 200,
         response: users
        }
      );
  } catch (error) {
      //res.status(404).json({ message: error.message });
  }
};

const uploadFile = async (req: Request, res: Response) =>{
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    const jsonString = req.file.buffer.toString('utf8');
    const records = JSON.parse(jsonString);

    for (const record of records) {
      const newRecord = new ArticleSchema(record);
      await newRecord.save();
    }

    res.status(200).send('Data loaded successfully.');
  } catch (error) {
    res.status(500).send('Error processing file.');
  }
}

export default {
  saveArticles,
  findAll,
  uploadFile
};
