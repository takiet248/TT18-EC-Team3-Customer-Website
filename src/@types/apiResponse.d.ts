interface IResLogin {
  access: string;
  session: string;
}

interface IResGetListAllTutor {
  result: Array<IResTutor>;
}
interface IResTutor {
  _id?: string;
  name?: string;
  email?: string;
  phone?: number;
  avatar?: string;
  address: string;
  gender?: number;
  degree?: Array<IResDegree>;
  DOB?: IResDate;
  major?: Array<IResMajor>;
  course?: Array<IResCourse>;
  accent?: string;
  quote?: string;
  education?: Array<IResEducation>;
  exp?: string;
  rating: number;
  personality?: string;
  noLike: number;
  noOngoingCourse?: number;
  available?: Array<IResAvailable>;
  level?: string;
}
interface IResDegree {
  item: string;
}
interface IResMajor {
  item: string;
}
interface IResCourse {
  id: string;
}
interface IResEducation {
  item: string;
}
interface IResDate {
  day: number;
  month: number;
  year: number;
}
interface IResAvailable {
  day: string;
  time: Array<IResAvailableTime>;
}
interface IResAvailableTime {
  start: string;
  time: string;
}
interface IResOneTutor {
  _id?: string;
  name?: string;
  email?: string;
  phone?: number;
  avatar?: string;
  address?: string;
  gender?: number;
  degree?: Array<IResDegree>;
  DOB?: string;
  major?: Array<IResMajor>;
  course?: Array<IResCourse>;
  accent?: string;
  quote?: string;
  education?: Array<IResEducation>;
  exp?: string;
  rating?: number;
  personality?: string;
  noLike?: number;
  noOngoingCourse?: number;
  available?: Array<IResAvailable>;
  level?: string;
}
interface IResGetOneTutor {
  tutor: IResOneTutor;
}

interface IResGetCourse {
  _id?: string;
  name?: string;
  duration?: string;
  subject?: Array<{ item: string }>;
  syllabus?: Array<{ item: string }>;
  noLike?: number;
  rating?: number;
  overview?: string;
  level?: string;
  avatar?: string;
  price?: number;
}
interface IResGetOneCourse {
  course: IResGetCourse;
}
interface IResGetListAllCourse {
  result: Array<IResGetCourse>;
}

interface IResUserInfo {
  DOB?: string;
  address?: string;
  email?: string;
  like_course?: Array<{ cid?: string }>;
  like_tutor?: Array<{ tid?: string }>;
}
