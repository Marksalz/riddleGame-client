import { useNavigate } from "react-router";
import Button from "../components/Button";
import Header from "../components/Header";
import { useCurrentPlayer } from "../contexts/CurrentPlayerContext";

export default function MenuPage() {
  const currentPlayerContext = useCurrentPlayer();
  const navigate = useNavigate();

  return (
    <div>
      <Header
        headerText={currentPlayerContext.currentPlayer?.role.toUpperCase()}
        btnText="Light/Dark mode"
      />
      <div className="menu_container">
        <Button
          ButtonTxt="Play Game"
          onClick={() => {
            navigate("/game");
          }}
        />
        <Button
          ButtonTxt="View and edit riddles"
          onClick={() => {
            navigate("/game_data");
          }}
        />
      </div>
    </div>
  );
}
