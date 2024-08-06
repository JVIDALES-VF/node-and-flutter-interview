import { Request, Response } from 'express';
import multer from 'multer';
import ArticleSchema from '../models/model'
import ModelUser from '../models/modelUser'

const storage = multer.diskStorage({
    destination: (req: Request, file, cb) => {
      cb(null, './uploads');
    },
    filename: (req: Request, file, cb) => {
      cb(null, Date.now() + file.originalname);
    },
  });


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
    res.status(400).send(
      {
        status_code: 400,
        response: res.status(404).json({ message: error })
       }
      )
  }
};

const uploadFile = async (req: Request, res: Response) =>{
  if (!req.file) {
    return res.status(400).send(
      {status_code: 400,
        response: 'No file uploaded.'
       }
    );
  }

  try {
    const jsonString = req.file.buffer.toString('utf8');
    const records = JSON.parse(jsonString);

    for (const record of records) {
      const newRecord = new ArticleSchema(record);
      await newRecord.save();
    }

    res.status(200).send(
      {status_code: 200,
        response: 'Data loaded successfully.'
       }
      
    );
  } catch (error) {
    res.status(500).send(
      {status_code: 500,
        response: 'Error processing file.'
       }
      
    );
  }
}

const signup = async (req: Request, res: Response) => {
  const user = ModelUser

  try {
    const data = await user.findOne({
      email: req.body.email,
    });

    if (!data) {
      const newUser = new ModelUser({
        email: req.body.email,
        password: req.body.password}
      )
      newUser.save().then((err) => {
            console.log(newUser);
            res.json({
              status_code: 200,
              response: newUser
            })
            
    })
    }else{
      res.json({
        status_code: 200,
        response: 'email no disponible'
      })
    }
  } catch (error) {
    console.log(error);
  }

}

const signin = (req: Request, res: Response) => {
  var err = Error
  const user = new ModelUser({
    email: req.body.email,
    password: req.body.password
  })

/*   if (err()) {
    console.log(err);
    res.json(err);
  }
  else{ */
  console.log(user)  
  res.json(JSON.stringify(user))

  }

/* }
 */
export default {
  findAll,
  uploadFile,
  signup,
  signin
};
