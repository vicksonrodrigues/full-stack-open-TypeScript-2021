import { CoursePart } from "../types";

const Title = ({name ,exerciseCount}:{name:string,exerciseCount:number})=> {
  return(
    <strong>
      {name} {exerciseCount}
      <br/>
    </strong>
  );
};

const Description =({description}:{description:string})=>{
  return(
    <i>
      {description}
    </i>
  );
};

const Part = ({coursePart}:{coursePart:CoursePart})=> {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  switch(coursePart.type){
    case "normal":
      return( 
        <p>
          <Title name={coursePart.name} exerciseCount={coursePart.exerciseCount}/>
          <Description description={coursePart.description} />
        </p>
      );
    case "groupProject":
      return(
        <p>
          <Title name={coursePart.name} exerciseCount={coursePart.exerciseCount}/>
          <br/>
          <span>
          project exercise : {coursePart.groupProjectCount}
          </span>
        </p>
      );
    case "submission":
      return(
        <p>
          <Title name={coursePart.name} exerciseCount={coursePart.exerciseCount}/>
          <Description description={coursePart.description}/>
          <br/>
          <span>
          submit to : {coursePart.exerciseSubmissionLink}
          </span>
          
        </p>
      );
    case "special":
      return(
        <p>
          <Title name={coursePart.name} exerciseCount={coursePart.exerciseCount}/>
          <Description description={coursePart.description}/>
          <br/>
          <span>
          required skills: {coursePart.requirements.join(',')}
          </span>
        </p>
      );
      
    default:
      return assertNever(coursePart);
  }
};

export default Part;