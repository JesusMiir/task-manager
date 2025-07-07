type TaskCardProps = {
  task: {
    id: string;
    title: string;
    description?: string;
  };
};

export function Card({ task }: TaskCardProps) {
  return (
    <div className="bg-white shadow p-3 rounded mb-2">
      <h3 className="font-bold">{task.title}</h3>
      {task.description && (
        <p className="text-sm text-gray-600">{task.description}</p>
      )}
    </div>
  );
}
