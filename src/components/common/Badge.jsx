export function Badge({
  children,
  variant = 'yellow',
  className = '',
  size = 'sm',
}) {
  const variantStyles = {
    yellow: 'bg-yellow-500/15 border-yellow-500/30 text-yellow-400',
    amber: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400',
    rose: 'bg-rose-500/10 border-rose-500/20 text-rose-400',
    gray: 'bg-[#151515] border-[#1a1a1a] text-gray-400',
  };

  const sizeStyles = {
    xs: 'px-2 py-0.5 text-[10px]',
    sm: 'px-2.5 py-1 text-xs',
  };

  const chosenVariant = variantStyles[variant] || variantStyles.yellow;
  const chosenSize = sizeStyles[size] || sizeStyles.sm;

  return (
    <span
      className={`inline-flex items-center rounded-lg border font-semibold tracking-wide uppercase ${chosenVariant} ${chosenSize} ${className}`}
    >
      {children}
    </span>
  );
}

export default Badge;
