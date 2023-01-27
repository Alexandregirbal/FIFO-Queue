export default interface ActionButtonProps {
    action: string;
    creditsLeft: number;
    onClick: (action: string) => void;
  }