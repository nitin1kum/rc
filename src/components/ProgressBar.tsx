
export const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="w-full bg-gray-300 h-2 rounded">
    <div className="bg-blue-500 h-2 rounded" style={{ width: `${progress}%` }} />
  </div>
);
