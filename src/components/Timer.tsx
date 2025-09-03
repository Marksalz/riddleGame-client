import { useEffect, useState } from "react";

export default function Timer(props: {
  timeLimit: number;
  finalTime: number;
  setFinalTime: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [timeLeft, setTimeLeft] = useState(props.timeLimit);
  const [isOvertime, setIsOvertime] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      props.setFinalTime(props.finalTime + 1);

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
  }, [isOvertime]);

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
