import Switch from "../components/Switch";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface HeaderProps {
  onNewActivity: () => void;
}


function Header({ onNewActivity }:HeaderProps) {
  
  const today = format(new Date(), "EEEE, d 'de' MMMM", { locale: ptBR });
  

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-primary-content bg-clip-text text-transparent">
              Momentos do Bebê
            </h1>
            <p className="text-sm text-muted-foreground capitalize">{today}</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onNewActivity}
              className="btn bg-primary shadow-lg"
            >
              <div className="w-4 h-4 mr-2" />
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
