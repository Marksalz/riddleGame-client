import { useEffect, useState } from "react";

export default function Timer(props: {
  timeLimit: number;
  finalTime: number;
  setFinalTime: React.Dispatch<React.SetStateAction<number>>;
  timeLeft: number;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
  isOvertime: boolean;
  setIsOvertime: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [timeLeft, setTimeLeft] = useState(props.timeLimit);
  const [isOvertime, setIsOvertime] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      props.setFinalTime((prevFinalTime) => prevFinalTime + 1);

      setTimeLeft((t) => {
        if (!isOvertime) {
          if (t > 0) {
            return t - 1;
          } else {
            setIsOvertime(true);
            return 1;
          }
        } else {
          return t + 1;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOvertime, props.setFinalTime]);

  return (
    <div>
      {!isOvertime ? (
        <span>Time left: {timeLeft}</span>
      ) : (
        <span>Overtime: +{timeLeft}</span>
      )}
    </div>
  );
}
