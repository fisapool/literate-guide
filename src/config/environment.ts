/**
 * Environment configuration for Docker-aware RAG pipeline
 * Handles automatic detection of Docker vs local development environments
 */

export interface EnvironmentConfig {
  plankaBaseUrl: string;
  agentEmail: string;
  agentPassword: string;
  isDocker: boolean;
  isDevelopment: boolean;
}

export interface HealthCheckResult {
  success: boolean;
  message: string;
  details?: any;
}

/**
 * Detects if we're running in a Docker container
 */
function detectDockerEnvironment(): boolean {
  // Check for Docker environment indicators
  if (process.env.DOCKER_CONTAINER === 'true') {
    return true;
  }
  
  // Check for Docker-specific files
  try {
    const fs = require('fs');
    return fs.existsSync('/.dockerenv');
  } catch {
    return false;
  }
}

/**
 * Gets the appropriate Planka base URL based on environment
 */
function getPlankaBaseUrl(): string {
  // Allow override via environment variable
  if (process.env.PLANKA_BASE_URL) {
    return process.env.PLANKA_BASE_URL;
  }
  
  // Auto-detect for Docker environment
  if (detectDockerEnvironment()) {
    return 'http://host.docker.internal:3333';
  }
  
  // Default for local development
  return 'http://localhost:3333';
}

/**
 * Validates and returns the complete environment configuration
 */
export function getEnvironmentConfig(): EnvironmentConfig {
  const config: EnvironmentConfig = {
    plankaBaseUrl: getPlankaBaseUrl(),
    agentEmail: process.env.PLANKA_AGENT_EMAIL || '',
    agentPassword: process.env.PLANKA_AGENT_PASSWORD || '',
    isDocker: detectDockerEnvironment(),
    isDevelopment: process.env.NODE_ENV !== 'production'
  };

  // Validate required environment variables
  const missingVars: string[] = [];
  if (!config.agentEmail) missingVars.push('PLANKA_AGENT_EMAIL');
  if (!config.agentPassword) missingVars.push('PLANKA_AGENT_PASSWORD');

  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }

  return config;
}

/**
 * Gets environment information for diagnostics
 */
export function getEnvironmentInfo(): Record<string, any> {
  return {
    nodeVersion: process.version,
    platform: process.platform,
    isDocker: detectDockerEnvironment(),
    environment: process.env.NODE_ENV || 'development',
    plankaBaseUrl: getPlankaBaseUrl(),
    timestamp: new Date().toISOString()
  };
}
