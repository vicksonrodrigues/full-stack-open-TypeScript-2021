import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const val1= req.query.height;
  const val2 =req.query.weight;
  if (isNaN(Number(val1)) || isNaN(Number(val2))) {
    res.send({error: 'malformatted parameters'});
  }
  const height = Number(val1);
  const weight = Number(val2);
  const bmi = calculateBmi(height,weight);
  const result = {
    weight,
    height,
    bmi
  };
  res.send(result);
});

app.post('/exercises', (req,res) =>{
  const body:any = req.body;
  console.log('Body',body)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access

  if(!body.daily_exercises || !body.target)
  {
    res.status(400).json({error:'parameter missing'})
    res.send({error:'parameter missing'});
  }
  
  const dailyExercises:[number] = body.daily_exercises;

  const target:number = body.target;

  if(!Array.isArray(dailyExercises)|| isNaN(Number(target)))
  {
    res.status(400).json({error:'malformatted parameters'})
    res.send({error:'malformatted parameters'})
  }
  

  const actualinput =[target,...dailyExercises]

  const exerciseCalc=calculateExercises(actualinput)

  res.send(exerciseCalc)


});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});