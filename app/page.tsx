const fetchFormNotion = async () => {
   const res = await fetch("http://localhost:3000/api/notion", {cache: "no-store"});
   const data: rowsStructured = await res.json();
   // @ts-ignore
   return JSON.parse(data);
};

export default async function Home() {
   const todos = await fetchFormNotion();
   console.log("Todos....", todos);
   return (
      <div className={"p-2 flex flex-col justify-center items-center"}>
         <h1 className={"font-bold text-7xl pb-2"}>TODOS</h1>

         <div className="relative">
            <table className="w-full text-sm teclassNameft text-gray-500 dark:text-gray-400">
               <thead className="text-xs text-grayclassNameuppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
               <tr>
                  <th scope="col" className="px-6 py-3">
                     ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                     Title
                  </th>
                  <th scope="col" className="px-6 py-3">
                     Description
                  </th>
                  <th scope="col" className="px-6 py-3">
                     Status
                  </th>
               </tr>
               </thead>
               <tbody>
               {todos.map((todo: any, i: number) => (
                  <tr key={i} className="bg-white border-bclassName:bg-gray-800">
                     <th scope="row"
                         className="px-6 py-4 font-meclassNametext-gray-900 whitespace-nowrap">
                        {i}
                     </th>
                     <td className="px-6 py-4">
                        {todo.title}
                     </td>
                     <td className="px-6 py-4">
                        {todo.description}
                     </td>
                     <td className="px-6 py-4">
                        <button type="button" className={`${todo.status === "Completed" ? "completed-btn": "inComplete-btn"}`}>
                           {todo.status}
                        </button>
                     </td>
                  </tr>
               ))}
               </tbody>
            </table>
         </div>
      </div>
   );
}
