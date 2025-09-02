export default function Header(props: { headerText: string; btnText: string }) {
  return (
    <header className="header">
      <p>{props.headerText}</p>
      <button>{props.btnText}</button>
    </header>
  );
}
