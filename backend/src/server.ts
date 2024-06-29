import app from './app';
import Routes from './routes/Routes';

const PORT = process.env.PORT || 8000;


app.use('/',Routes)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
