export default function MyError({ errorMessage }: { errorMessage: string }) {
  if (errorMessage) {
    return <div className="text-red-500 mt-3">Error: {errorMessage}</div>;
  }
}
