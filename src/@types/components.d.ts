interface IStyle {
  className?: string;
  width?: number;
  marginBottom?: number;
  margin?: number;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  padding?: number;
  paddingBottom?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingLeft?: number;
}

interface IHeader {}

interface ISearchBar extends IStyle {
  name?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  type?: "text" | "password";
  error?: any;
  id?: string;
  isFocus?: boolean;
  valueOnChange?: any;
  onClick?: any;
}

interface IInput extends IStyle {
  name?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  type?: "text" | "password" | "email";
  error?: any;
  id?: string;
  isFocus?: boolean;
  valueOnChange?: any;
  onClick?: any;
  required?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined;
}

interface IAvatar {
  image?: ?string;
  className?: string;
  height?: number | string;
  width?: number | string;
  borderRadius?: number;
  marginRight?: number;
  borderWidth?: number;
  borderColor?: BorderColor | undefined;
  marginBottom?: number;
  flex?: Property.Flex<string | number>;
}

interface IButton extends IStyle {
  className?: string;
  color?: string;
  height?: number;
  borderRadius?: number;
  width?: number | string;
  backgroundColor?: string;
  onClick?:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
  type?: "submit" | "button";
  fontSize?: number;
  fontWeight?: Property.FontWeight;
  background?: string;
  border?: Property.Border<string | number>;
  disabled?: boolean;
  isWhite?: boolean;
}

interface ICalendar extends IStyle {
  onSelect?: (time: Date) => void;
  value: Date;
  onChangePreAndNext: (month: any, year: any) => void;
  // values: Array<{ countcandidate: number; datemeeting: string }>;
}

interface ILabel extends IStyle {
  icon?: any;
  title?: any;
}
interface ICourse {
  name: string;
  durations: string;
  level: string;
  subject: string;
  rating: number;
}

interface ITutor {
  _id?: string;
  name?: string;
  avatar?: string;
  address: string;
  major?: Array<IResMajor>;
  course?: Array<IResCourse>;
  rating?: number;
  education?: Array<{ item: string }>;
  isLiked?: number;
  handleGotoDetail?: React.MouseEventHandler<HTMLDivElement>;
}

interface ICourseItem {
  id?: number;
  name?: string;
  durations?: string;
  level?: string;
  subject?: string;
  rating?: number;
  onClick?: any;
}

interface IHeartIcon {
  isLiked?: number;
  position?: Property.Position;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  className?: string;
  typecvviewid?: number;
}
