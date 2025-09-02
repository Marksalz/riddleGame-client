import Button from "../components/Button";
import Header from "../components/Header";
import { useNavigate } from "react-router";

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <div>
      <Header headerText="Home Page" btnText="Light/Dark mode" />
      <div className="container">
        <section className="msg">
          <h1>Welcome to the Riddle game!!</h1>
        </section>
        <section className="option_btns">
          <Button
            ButtonTxt="Login/Register"
            onClick={() => navigate("/login")}
          />
          <Button
            ButtonTxt="Play game as guest"
            onClick={() => navigate("/game")}
          />
          <Button
            ButtonTxt="Leaderboard"
            onClick={() => navigate("/leaderboard")}
          />
        </section>
      </div>
    </div>
  );
}
