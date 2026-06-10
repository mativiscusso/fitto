"use client";

import "../globals.css";

export default function InstallPage() {
  return (
    <main className="container install-page">
      <button className="btn-back" onClick={() => window.history.back()}>
        <i className="bx bx-chevron-left bx-lg"></i>
      </button>

      <h1 className="install-title">Instalar Fitto</h1>
      <p className="install-subtitle">
        Agregá Fitto a tu pantalla de inicio para acceso rápido
      </p>

      <div className="install-section">
        <div className="install-header">
          <i className="bx bxl-apple install-icon"></i>
          <h2>iOS (iPhone)</h2>
        </div>
        <ol className="install-steps">
          <li>Abrí Fitto en Safari</li>
          <li>Toque el botón <strong>Compartir</strong> <i className="bx bx-share-alt"></i> abajo</li>
          <li>Desplazá y tocá <strong>"Agregar a pantalla de inicio"</strong></li>
          <li>Toque <strong>"Agregar"</strong> arriba a la derecha</li>
        </ol>
      </div>

      <div className="install-section">
        <div className="install-header">
          <i className="bx bxl-android install-icon"></i>
          <h2>Android</h2>
        </div>
        <ol className="install-steps">
          <li>Abrí Fitto en Chrome</li>
          <li>Toque el menú de tres puntos <i className="bx bx-dots-vertical-rounded"></i> arriba</li>
          <li>Toque <strong>"Instalar app"</strong> o <strong>"Agregar a pantalla de inicio"</strong></li>
          <li>Confirme tocando <strong>"Agregar"</strong></li>
        </ol>
      </div>

      <div className="install-tips">
        <h3>
          <i className="bx bx-lightbulb"></i>
          Beneficios de instalar
        </h3>
        <ul>
          <li>Acceso rápido desde tu pantalla de inicio</li>
          <li>Se comporta como una app nativa</li>
          <li>Menú uso de datos que navegando</li>
          <li>Notificaciones cuando hay nuevas recetas</li>
        </ul>
      </div>
    </main>
  );
}