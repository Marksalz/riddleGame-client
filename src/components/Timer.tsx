import { useEffect } from "react";

export default function Timer(props: {
  timeLimit: number;
  finalTime: number;
  setFinalTime: React.Dispatch<React.SetStateAction<number>>;
  timeLeft: number;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
  isOvertime: boolean;
  setIsOvertime: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  useEffect(() => {
    props.setTimeLeft(props.timeLimit);
    const timer = setInterval(() => {
      props.setFinalTime((prevFinalTime) => prevFinalTime + 1);

      props.setTimeLeft((t) => {
        if (!props.isOvertime) {
          if (t > 0) {
            return t - 1;
          } else {
            props.setIsOvertime(true);
            return 1;
          }
        } else {
          return t + 1;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [props.isOvertime, props.setFinalTime, props.timeLimit]);

  return (
    <div>
      {!props.isOvertime ? (
        <span>Time left: {props.timeLeft}</span>
      ) : (
        <span>Overtime: +{props.timeLeft}</span>
      )}
    </div>
  );
}
