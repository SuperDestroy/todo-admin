export interface MenuModel {
  id: string;
  name: string;
  title?: string;
  component: string;
  to: string;
  iconStr: string;
  default: boolean;
  children?: MenuModel[];

  [key: string]: unknown;
}

export interface TagModel {
  id: string;
  label: string;
  to: string;
  checked: boolean;
  closeable: boolean,
  default: boolean,
  icon: string;

  [key: string]: any;

}
