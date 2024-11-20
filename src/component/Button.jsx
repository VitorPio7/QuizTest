export default function Button({ children, nameClass }) {
  return (
    /* From Uiverse.io by Custyyyy */
    <button className={`button-${nameClass}`} role="button">
      {children}
    </button>
  );
}
