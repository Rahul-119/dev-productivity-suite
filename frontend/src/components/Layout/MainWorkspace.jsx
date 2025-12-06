export default function MainWorkspace({ children, title }) {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-100 min-h-screen">
        <h1 className=" flex text-3xl font-extrabold text-indigo-700 mb-8 text-left justify-center">{title}</h1>
          {children}
    </div>
  );
}
