export function GlobalError({ error }: { error: Error }) {
  return (
    <div style={{ padding: 20 }}>
      <h1>Coś poszło nie tak!</h1>
      <p>{error.message}</p>
    </div>
  );
}
