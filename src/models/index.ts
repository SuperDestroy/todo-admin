interface TagModel {
  key: string;
  label: string;
  to: string;
  checked: boolean;
  closeable: boolean,
  default: boolean,

  [key: string]: any;

}
