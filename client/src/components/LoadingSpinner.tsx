interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
}

export default function LoadingSpinner({
  size = 'medium',
}: LoadingSpinnerProps) {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-10 h-10',
    large: 'w-16 h-16',
  };

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div
        className={`animate-spin rounded-full border-t-4 border-blue-500 border-opacity-50 ${sizeClasses[size]}`}
      >
        <div className='rounded-full border-4 border-blue-500 h-full'></div>
      </div>
    </div>
  );
}
