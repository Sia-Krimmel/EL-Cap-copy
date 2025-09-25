export function Arrow(props) {
  return (
    <svg className={props.className} {...props} xmlns="http://www.w3.org/2000/svg" width={props.width || '24'} height={props.height || '23'} viewBox="0 0 24 23" fill="none">
      <path
        d="M16.2894 17.7179L22.5462 11.4612M16.2082 4.94839L22.6335 11.3738L22.5462 11.4612M0.800567 11.4612L22.5462 11.4612"
        stroke={props.color || 'currentColor'}
        strokeWidth="1.5"
      />
    </svg>
  );
}
