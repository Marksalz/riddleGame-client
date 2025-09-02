import { Link } from "react-router";

type RiddleProps = {
  riddle: {
    taskDescription: string;
    // add other properties if needed
  };
};

export default function Riddle(props: RiddleProps) {
  return (
    <div className="container">
      <section className="riddle_info_bar">
        <Link to="/">Home</Link>
        <p>Level</p>
        <p>Time limit</p>
        <p>Timer</p>
      </section>
      <form className="riddle" action="">
        <label htmlFor="">{props.riddle.taskDescription}</label>
        <input type="text" name="answer" id="" placeholder="write answer here" />

      </form>
    </div>
  );
}
