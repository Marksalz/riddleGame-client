import Button from "../components/Button";
import Header from "../components/Header";

export default function HomePage() {
  return (
    <div>
      <Header headerText="Home Page" btnText="Light/Dark mode" />
      <div className="container">
        <section className="msg">
          <h1>Welcome to the Riddle game!!</h1>
        </section>
        <section className="option_btns">
          <Button ButtonTxt="Login/Register" />
          <Button ButtonTxt="Play game as guest" />
          <Button ButtonTxt="Leaderboard" />
        </section>
      </div>
    </div>
  );
}
