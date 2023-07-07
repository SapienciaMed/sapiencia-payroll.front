export interface ITabsMenuTemplate {
  id: number | string;
  title: string;
  content?: React.JSX.Element | string;
  action?: () => void;
}

export interface FormStebs {
  titleSteb: string;
  contentStep: React.JSX.Element;
  position: number;
  classContainerStep?: string;
}
