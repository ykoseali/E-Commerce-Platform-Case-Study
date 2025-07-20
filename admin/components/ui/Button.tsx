// admin/components/ui/Button.tsx

export default function Button({
    children,
    onClick,
    type = 'button',
    className = '',
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit';
    className?: string;
  }) {
    return (
      <button
        type={type}
        onClick={onClick}
        className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md ${className}`}
      >
        {children}
      </button>
    );
  }
  