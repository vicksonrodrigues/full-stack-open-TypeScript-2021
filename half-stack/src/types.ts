interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CoursePartExtended extends CoursePartBase{
  description:string;
}

interface CourseNormalPart extends CoursePartExtended {
  type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartExtended {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartExtended{
  type:"special"
  requirements:string[];
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;
