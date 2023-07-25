import express, {Express, Request, Response} from 'express'
import cors from 'cors';
import routes from './src/routes/routes';


const app = express()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);


app.listen(3000, () =>{
    console.log('porta 3000')
})

