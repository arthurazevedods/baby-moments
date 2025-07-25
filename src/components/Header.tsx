import Switch from "../components/Switch";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Plus } from "lucide-react";
import { useThemeStore } from '../store/theme';

interface HeaderProps {
  onNewActivity: () => void;
}


function Header({ onNewActivity }:HeaderProps) {
  
  const today = format(new Date(), "EEEE, d 'de' MMMM", { locale: ptBR });
  const { theme } = useThemeStore();

  return (
    <header className="bg-base-100 max-w-full backdrop-blur-sm  sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-2xl font-bold  bg-clip-text text-neutral `}>
              Momentos do Bebê
            </h1>
            <p className={`text-sm  capitalize text-neutral`}>{today}</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onNewActivity}
              className={`btn shadow-lg rounded-xl text-md ${
                theme ==="cupcake"
                ? "bg-secondary text-secondary-content"
                : "bg-secondary text-base-100"
              }`}
            >
              <div className="w-4 h-4 mr-2 flex items-center"><Plus /></div>
              Nova Atividade
            </button>
            <Switch />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
