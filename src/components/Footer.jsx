import { FiPhone, FiMapPin, FiClock } from "react-icons/fi";
import { contact } from "../data/contact";

function Footer() {
  return (
    <footer className="bg-yamba-dark text-gray-300 py-10 mt-auto">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <p className="text-xl font-bold text-white mb-2">
            YAMBA<span className="text-yamba-blue-light">-TECH</span>
          </p>
          <p className="text-sm">Materiel informatique et services de proximite</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm mb-8 max-w-3xl mx-auto">
          <div className="flex flex-col items-center text-center gap-2">
            <FiPhone className="text-xl text-yamba-blue-light" />
            {contact.telephones.map((tel) => (
              <span key={tel}>{tel}</span>
            ))}
          </div>
          <div className="flex flex-col items-center text-center gap-2">
            <FiMapPin className="text-xl text-yamba-blue-light" />
            <span>{contact.adresse}</span>
          </div>
          <div className="flex flex-col items-center text-center gap-2">
            <FiClock className="text-xl text-yamba-blue-light" />
            <div>
              {contact.horaires.map((h) => (
                <p key={h.jours}>{h.jours} : {h.heures}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-6 text-sm border-t border-gray-700 pt-6">
          <span>A propos</span>
          <span>Contact</span>
          <span>Politique de confidentialite</span>
        </div>
        <p className="text-xs mt-4 text-gray-500 text-center">2026 YAMBA-TECH. Tous droits reserves.</p>
      </div>
    </footer>
  );
}

export default Footer;