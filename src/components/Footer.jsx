function Footer() {
  return (
    <footer className="bg-yamba-dark text-gray-300 py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-xl font-bold text-white mb-2">
          YAMBA<span className="text-yamba-blue-light">-TECH</span>
        </p>
        <p className="text-sm mb-4">Materiel informatique et services de proximite</p>
        <div className="flex justify-center gap-6 text-sm">
          <span>A propos</span>
          <span>Contact</span>
          <span>Politique de confidentialite</span>
        </div>
        <p className="text-xs mt-4 text-gray-500">2026 YAMBA-TECH. Tous droits reserves.</p>
      </div>
    </footer>
  );
}

export default Footer;