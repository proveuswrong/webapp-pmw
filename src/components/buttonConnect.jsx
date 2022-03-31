export default function ButtonConnect({ className }) {
  return (
    <button
      className={className}
      onClick={() => {
        navigate("/claims" + location.search);
      }}
    >
      Connect
    </button>
  );
}
