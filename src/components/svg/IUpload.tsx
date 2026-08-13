
type IconProps = {
  color?: string;
  className?: string;
};

export default function IUpload({
  color = "currentColor",
  className = "",
}: IconProps) {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 20 20"
        fill="none"
        className={className}
      >
        <path
          d="M3.33398 14.166V15.8327C3.33398 16.2747 3.50958 16.6986 3.82214 17.0112C4.1347 17.3238 4.55862 17.4993 5.00065 17.4993H15.0006C15.4427 17.4993 15.8666 17.3238 16.1792 17.0112C16.4917 16.6986 16.6673 16.2747 16.6673 15.8327V14.166"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.83398 7.50065L10.0007 3.33398M10.0007 3.33398L14.1673 7.50065M10.0007 3.33398V13.334"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}