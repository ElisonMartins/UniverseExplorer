import React from 'react';

const Header = () => {
  return (
    <header className="absolute top-0 left-0 right-0 bg-transparent py-4 px-6 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">UniverseExplorer</h2>
        {/* Aqui você pode adicionar outros elementos do header, como menus ou ícones */}
      </div>
    </header>
  );
};

export default Header;
