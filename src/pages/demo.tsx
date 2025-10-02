import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Row, Col, Button, Form, Tab, Tabs, OverlayTrigger, Popover } from 'react-bootstrap';
import { VentanaLienzo } from 'react-ecosistema-unp/shared';
import { Encabezado } from 'react-ecosistema-unp/ui';
import { FaCog } from 'react-icons/fa';
import Swal from 'sweetalert2';

// Importar componentes del microfrontend remoto
const Calendario = React.lazy(() => import('delegados/Calendario'));
const Votaciones = React.lazy(() => import('delegados/Votaciones'));
const VistaSesion = React.lazy(() => import('delegados/VistaSesion'));
// SesionDelegados se usa en las rutas, no directamente aquí

const Demo: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedModule, setSelectedModule] = useState<'premesa' | 'subcomisiones' | 'mesa_tecnica'>('premesa');
  const [activeTab, setActiveTab] = useState('calendario');
  const [showPopover, setShowPopover] = useState(false);
  const [sessionCode, setSessionCode] = useState('');
  const [isInSession, setIsInSession] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [showVotaciones, setShowVotaciones] = useState(false);

  // Obtener módulo de la URL
  useEffect(() => {
    const moduleFromUrl = searchParams.get('module') as 'premesa' | 'subcomisiones' | 'mesa_tecnica';
    if (moduleFromUrl && ['premesa', 'subcomisiones', 'mesa_tecnica'].includes(moduleFromUrl)) {
      setSelectedModule(moduleFromUrl);
    }
  }, [searchParams]);

  // Manejar cambio de módulo
  const handleModuleChange = (module: 'premesa' | 'subcomisiones' | 'mesa_tecnica') => {
    setSelectedModule(module);
    // Salir de sesión si cambia de módulo
    if (isInSession) {
      setIsInSession(false);
      setCurrentSessionId(null);
    }
  };

  const handleEventSelect = (event: any) => {
    console.log('Evento seleccionado:', event);
  };

  const handleVote = (vote: any) => {
    console.log('Voto registrado:', vote);
  };

  const handleSessionJoin = (sessionId: string) => {
    console.log('Unido a sesión:', sessionId);
    setCurrentSessionId(sessionId);
    setIsInSession(true);
  };

  const handleSessionLeave = (sessionId: string) => {
    console.log('Salido de sesión:', sessionId);
    setIsInSession(false);
    setCurrentSessionId(null);
  };

  // Manejar unirse a sesión desde código
  const handleJoinSession = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    const sessionCodes = ['SES001', 'SES002', 'SES003'];
    
    if (trimmed && sessionCodes.includes(trimmed)) {
      setCurrentSessionId(trimmed);
      setIsInSession(true);
      setShowPopover(false);
      setSessionCode('');

      // Redirigir a la vista de sesión
      navigate(`/sesp/gps/delegados/sesion/${trimmed}`, {
        state: {
          reunion: { codigo: trimmed },
          module: selectedModule
        }
      });

      Swal.fire({
        icon: 'success',
        title: '¡Sesión iniciada!',
        text: `Te has unido a la sesión ${trimmed}`,
        timer: 2000,
        showConfirmButton: false
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Código inválido',
        text: 'El código de sesión no es válido. Usa: SES001, SES002 o SES003',
        confirmButtonText: 'Entendido'
      });
    }
  };

  // Toggle de votaciones
  const toggleVotaciones = () => {
    setShowVotaciones(v => !v);
  };

  // Obtener título del encabezado según el módulo
  const getHeaderTitle = () => {
    switch (selectedModule) {
      case 'premesa':
        return 'Pre Mesa GRAERR - Delegados';
      case 'subcomisiones':
        return 'Subcomisiones GPS - Delegados';
      case 'mesa_tecnica':
        return 'Mesa Técnica GPS - Delegados';
      default:
        return 'Sistema de Delegados';
    }
  };

  // Crear botones para VentanaLienzo
  const botones = [
    {
      icon: FaCog,
      action: () => {
        // Aquí se podría abrir un modal de configuración
        Swal.fire({
          title: 'Configuración',
          text: 'Funcionalidad de configuración disponible',
          icon: 'info'
        });
      },
      label: "Configurar módulo",
    },
  ];

  return (
    <VentanaLienzo
      items={[
        { label: 'Sistema de Delegados' }
      ]}
      extraInput={botones}
    >
      {/* Encabezado con logo UNP */}
      <Encabezado subtitle={getHeaderTitle()} />

      {/* Selector de módulo */}
      <Row className="d-flex justify-content-between align-items-center my-3 mx-0">
        <Col xs="auto">
          <Form.Group className="mb-0">
            <Form.Label className="me-2">Módulo:</Form.Label>
            <Form.Select
              value={selectedModule}
              onChange={(e) => handleModuleChange(e.target.value as any)}
              style={{ width: 'auto', display: 'inline-block' }}
            >
              <option value="premesa">Pre-Mesa GRAERR</option>
              <option value="subcomisiones">Subcomisiones GPS</option>
              <option value="mesa_tecnica">Mesa Técnica GPS</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col xs="auto">
          <div className="d-flex gap-3">
            {/* Botón de unirse a sesión */}
            <OverlayTrigger
              trigger="click"
              placement="bottom"
              show={showPopover}
              rootClose
              onToggle={next => setShowPopover(next)}
              overlay={
                <Popover id="popover-unirse">
                  <Popover.Body>
                    <Form className="p-3 d-flex flex-column">
                      <Form.Group controlId="sessionCode" className="mb-3">
                        <Form.Label>Código de sesión</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="SES001, SES002, SES003"
                          value={sessionCode}
                          onChange={e => setSessionCode(e.target.value)}
                          required
                        />
                      </Form.Group>
                      <Button
                        className="w-100"
                        variant="primary"
                        onClick={() => handleJoinSession(sessionCode)}
                        disabled={!sessionCode.trim()}
                      >
                        Unirse a sesión
                      </Button>
                    </Form>
                  </Popover.Body>
                </Popover>
              }
            >
              <Button variant="primary">
                {isInSession ? 'En sesión' : 'Unirse a sesión'}
              </Button>
            </OverlayTrigger>

            {/* Botón para salir de sesión si está en una */}
            {isInSession && (
              <Button
                variant="outline-danger"
                onClick={() => handleSessionLeave(currentSessionId || '')}
              >
                Salir de sesión
              </Button>
            )}
          </div>
        </Col>
      </Row>

      {/* Contenido principal */}
      <div className="p-3">
        {isInSession && selectedModule !== 'premesa' ? (
          // Vista de sesión activa para votaciones
          <React.Suspense fallback={<div>Cargando vista de sesión...</div>}>
            <VistaSesion
              module={selectedModule}
              delegadoId="demo_delegado_123"
              sessionId={currentSessionId || "demo_session_123"}
              showVotaciones={showVotaciones}
              onToggleVotaciones={toggleVotaciones}
            />
          </React.Suspense>
        ) : (
          // Vista de calendario (siempre visible cuando no está en sesión)
          <React.Suspense fallback={<div>Cargando calendario...</div>}>
            <Calendario
              module={selectedModule}
              delegadoId="demo_delegado_123"
              onEventSelect={handleEventSelect}
              onJoinSession={handleSessionJoin}
              readOnly={true}
            />
          </React.Suspense>
        )}

        {/* Tabs adicionales para funcionalidades extra */}
        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k || 'calendario')}
          className="mb-3 mt-4"
        >
          <Tab eventKey="calendario" title="Calendario">
            <React.Suspense fallback={<div>Cargando calendario...</div>}>
              <Calendario
                module={selectedModule}
                delegadoId="demo_delegado_123"
                onEventSelect={handleEventSelect}
                readOnly={true}
              />
            </React.Suspense>
          </Tab>
          <Tab eventKey="votaciones" title="Votaciones">
            <React.Suspense fallback={<div>Cargando votaciones...</div>}>
              <Votaciones
                module={selectedModule}
                delegadoId="demo_delegado_123"
                sessionId="demo_session_123"
                onVote={handleVote}
                onSessionJoin={handleSessionJoin}
                onSessionLeave={handleSessionLeave}
                readOnly={false}
              />
            </React.Suspense>
          </Tab>
        </Tabs>
      </div>
    </VentanaLienzo>
  );
};

export default Demo;
