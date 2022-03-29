interface Result {
  periodLength:number
  trainingDays:number
  target:number
  average:number
  success:boolean
  rating:number
  ratingDescription:string
}

const parseArguments2 = (args: Array<string>):Array<number> => {
  const days: Array<string> = args.slice(2);
  days.forEach(number => {
    if(isNaN(Number(number))) throw new Error('values were not numbers');
  });
  return days.map(n => Number(n));
};

export const calculateExercises = (data:Array<number>):Result => {
  const dailyExerciseHours= data.slice(1);
  const trainingDayHours = dailyExerciseHours.filter(h => h>0);
  
  const periodLength:number = dailyExerciseHours.length;

  const trainingDays:number = trainingDayHours.length;
  
  const target:number = data[0];
  
  const average:number = (trainingDayHours.reduce((p,c)=>p+c,0))/periodLength;
  
  const success:boolean = average>=target?true:false;
  
  let rating = 1;
  if(average/target >0.5)
    rating = 2;
  if(average/target >1)
    rating= 3;
  
  let ratingDescription = '';
  if (rating === 1) ratingDescription = 'bad';
  if (rating === 2) ratingDescription = 'not too bad but could be better';
  if (rating === 3) ratingDescription = 'excellent';

  return{
  periodLength,
  trainingDays,
  target,
  average,
  success,
  rating,
  ratingDescription

  };
  
  
};

try {
  const args = parseArguments2(process.argv);
  console.log(calculateExercises(args));
} catch(e) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log('Error:', e.message);
}
