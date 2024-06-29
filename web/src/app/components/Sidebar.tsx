// components/Sidebar.tsx
import Link from 'next/link';


type SidebarProps = {
  options : {name : string, id : string}[] | null,
  onOptionSelected : (test : {name : string, id : string}) => void
}

const Sidebar: React.FC<SidebarProps> = (props) => {

  if (!props.options) {
    return (
      <div className="w-64 h-screen bg-gray-800 text-white">
        <h1 className="text-2xl font-bold p-4">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="w-64 h-screen bg-gray-800 text-white">
      <h2 className="text-2xl font-bold p-4">Testes</h2>
      <ul>
        {props.options.map(el => (
          <li className="p-4 hover:bg-gray-700">
            <Link href="/test/1">Teste 1</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
