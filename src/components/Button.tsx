export default function Button(props: {
  ButtonTxt: string;
  onClick?: () => void;
}) {
  return <button onClick={props.onClick}>{props.ButtonTxt}</button>;
}
