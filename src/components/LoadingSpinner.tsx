import Lottie from "lottie-react";
import animationData from "../../assets/lottie/loading-transparent.json";

interface LoadingSpinnerProps {
  className?: string;
}

const LoadingSpinner = ({ className = "w-16 h-16" }: LoadingSpinnerProps) => {
  return (
    <div className={className}>
      <Lottie animationData={animationData} loop />
    </div>
  );
};

export default LoadingSpinner;
