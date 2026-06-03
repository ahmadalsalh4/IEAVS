export default function MyError({ errorMessage }: { errorMessage: string }) {
  if (errorMessage) {
    return <div className="text-red-500">Error: {errorMessage}</div>;
  }
}
