# Security Policy

## 🛡️ Política de Seguridad

La seguridad es una prioridad máxima para el **Obsidian AI Assistant Plugin**. Nos comprometemos a mantener la confidencialidad, integridad y disponibilidad de los datos de nuestros usuarios.

## 📋 Versiones Soportadas

Utiliza esta sección para conocer qué versiones del proyecto están siendo soportadas actualmente con actualizaciones de seguridad.

| Versión | Soportada | Fecha de Lanzamiento | Fin de Soporte |
|---------|-----------|---------------------|----------------|
| 1.0.x   | ✅        | Q1 2024             | Q4 2025        |
| 0.9.x   | ✅        | Q4 2023             | Q3 2025        |
| 0.8.x   | ❌        | Q3 2023             | Q2 2024        |
| < 0.8   | ❌        | -                   | -              |

### 🔄 Ciclo de Vida de Versiones

- **Versiones LTS**: Las versiones 1.x.x recibirán soporte de seguridad por 18 meses
- **Versiones Estables**: Las versiones 0.9.x recibirán soporte por 12 meses
- **Versiones Legacy**: Las versiones anteriores a 0.8 no reciben actualizaciones

## 🚨 Reportar una Vulnerabilidad

### 📧 Proceso de Reporte

Si has descubierto una vulnerabilidad de seguridad, **NO** la reportes públicamente. Sigue estos pasos:

1. **Reporte Privado**: Envía un email a [security@bufigol.dev](mailto:security@bufigol.dev) o crea un issue privado
2. **Información Detallada**: Incluye toda la información relevante
3. **Responsible Disclosure**: Te responderemos dentro de 48 horas
4. **Coordinación**: Trabajaremos contigo para resolver la vulnerabilidad

### 📋 Información Requerida

Para reportar una vulnerabilidad, incluye:

- **Descripción**: Explicación clara de la vulnerabilidad
- **Impacto**: Posibles consecuencias de la vulnerabilidad
- **Reproducción**: Pasos para reproducir el problema
- **Contexto**: Versión del plugin, sistema operativo, etc.
- **Contacto**: Tu información de contacto para seguimiento

### ⏱️ Timeline de Respuesta

- **Respuesta Inicial**: 48 horas (máximo)
- **Evaluación**: 5 días hábiles
- **Plan de Acción**: 10 días hábiles
- **Resolución**: Según la severidad (1-30 días)

## 🔒 Tipos de Vulnerabilidades

### 🚨 Críticas (P0)
- **Ejecución de código remoto**
- **Acceso no autorizado a datos**
- **Elevación de privilegios**
- **Compromiso de API keys**

**Respuesta**: 24-48 horas

### ⚠️ Altas (P1)
- **Exposición de información sensible**
- **Bypass de autenticación**
- **Inyección de código**
- **Cross-site scripting (XSS)**

**Respuesta**: 3-7 días

### 🔶 Medias (P2)
- **Denegación de servicio**
- **Exposición de logs**
- **Bypass de validaciones**
- **Información de debugging**

**Respuesta**: 7-14 días

### 📝 Bajas (P3)
- **Información de versiones**
- **Headers de seguridad**
- **Logs de debug**
- **Mejoras de seguridad**

**Respuesta**: 14-30 días

## 🛠️ Medidas de Seguridad

### 🔐 Protección de Datos

- **API Keys**: Encriptación local con AES-256
- **Contenido Sensible**: Detección automática y filtrado
- **Logs**: Sin información personal identificable
- **Comunicación**: HTTPS/TLS para todas las APIs

### 🚫 Contenido Prohibido

El plugin **NO** enviará a APIs de IA:

- **Contraseñas** o credenciales
- **Información personal** (DNI, tarjetas, etc.)
- **Código fuente** de aplicaciones comerciales
- **Documentos confidenciales** del trabajo
- **Información médica** o legal

### 🔍 Auditoría de Seguridad

- **Análisis estático**: ESLint Security, SonarQube
- **Dependencias**: Auditoría automática con `npm audit`
- **Penetration Testing**: Análisis manual trimestral
- **Code Review**: Revisión obligatoria para cambios de seguridad

## 📢 Divulgación Responsable

### 🎯 Principios

- **No Shaming**: No avergonzamos a reportadores
- **Colaboración**: Trabajamos juntos para resolver problemas
- **Reconocimiento**: Crédito público para reportes válidos
- **Transparencia**: Comunicación clara sobre el estado

### 📅 Proceso de Divulgación

1. **Reporte Privado**: Evaluación inicial
2. **Desarrollo de Fix**: Implementación de la solución
3. **Testing**: Verificación de la corrección
4. **Release**: Publicación de la versión corregida
5. **Divulgación Pública**: CVE y changelog (si aplica)

### 🏆 Programa de Recompensas

Actualmente **NO** ofrecemos recompensas monetarias, pero:

- **Reconocimiento público** en README y releases
- **Badge de contribuidor** en tu perfil de GitHub
- **Menciones especiales** en documentación
- **Acceso anticipado** a nuevas funcionalidades

## 🔄 Actualizaciones de Seguridad

### 📦 Distribución

- **Hotfixes**: Para vulnerabilidades críticas
- **Patches**: Para vulnerabilidades altas y medias
- **Releases Regulares**: Incluyen todas las correcciones

### 📢 Comunicación

- **GitHub Security Advisories**: Para vulnerabilidades confirmadas
- **Changelog**: Detalles de todas las correcciones
- **Release Notes**: Información específica de seguridad
- **Email**: Notificaciones para usuarios registrados

## 🛡️ Mejores Prácticas para Usuarios

### 🔑 Gestión de API Keys

- **Rotación Regular**: Cambia las keys cada 3-6 meses
- **Acceso Limitado**: Usa keys con permisos mínimos
- **Almacenamiento Seguro**: No compartas keys en código público
- **Monitoreo**: Revisa el uso regular de tus keys

### 🔒 Configuración de Privacidad

- **Filtros de Contenido**: Configura qué notas puede leer la IA
- **Auditoría**: Revisa regularmente el acceso de la IA
- **Backup**: Mantén copias de seguridad de tu bóveda
- **Actualizaciones**: Mantén el plugin actualizado

### 🚨 Señales de Alerta

Contacta inmediatamente si notas:

- **Actividad inusual** en tus APIs
- **Contenido extraño** en tus notas
- **Errores de autenticación** persistentes
- **Comportamiento inesperado** del plugin

## 📞 Contacto de Seguridad

### 🚨 Emergencias

- **Email**: [security@bufigol.dev](mailto:security@bufigol.dev)
- **GitHub**: [Security Advisory](https://github.com/Bufigol/obsidian-ai-assistant/security/advisories)
- **Respuesta**: 24 horas para casos críticos

### 📋 Reportes No Críticos

- **Issues**: [GitHub Issues](https://github.com/Bufigol/obsidian-ai-assistant/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Bufigol/obsidian-ai-assistant/discussions)
- **Documentación**: [Wiki del proyecto](https://github.com/Bufigol/obsidian-ai-assistant/wiki)

### 👥 Equipo de Seguridad

- **Security Lead**: [@Bufigol](https://github.com/Bufigol)
- **Code Review**: Equipo de maintainers
- **External Audit**: Consultores de seguridad independientes

## 📚 Recursos Adicionales

### 🔗 Enlaces Útiles

- [GitHub Security Best Practices](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-on-github/about-security-policy)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [CVE Database](https://cve.mitre.org/)
- [Security Headers](https://securityheaders.com/)

### 📖 Documentación

- [Guía de Seguridad del Usuario](docs/security-guide.md)
- [Configuración de Privacidad](docs/privacy-config.md)
- [Auditoría de Dependencias](docs/dependency-audit.md)
- [Procedimientos de Emergencia](docs/emergency-procedures.md)

---

## 🎯 Compromiso de Seguridad

La seguridad del **Obsidian AI Assistant Plugin** es responsabilidad de todos. Nos comprometemos a:

- **Responder rápidamente** a reportes de seguridad
- **Mantener transparencia** en nuestro proceso
- **Colaborar activamente** con la comunidad
- **Mejorar continuamente** nuestras prácticas

**¡Juntos construimos un plugin más seguro!** 🛡️

---

*Esta política de seguridad está basada en las mejores prácticas de la industria y se actualiza regularmente. Última actualización: Enero 2024*
