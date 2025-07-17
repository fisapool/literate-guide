/**
 * Health check utilities for verifying Planka connectivity
 * Provides detailed diagnostics for troubleshooting Docker networking issues
 */

import { EnvironmentConfig } from '../config/environment.js';

export interface HealthCheckResult {
  success: boolean;
  message: string;
  details?: {
    url: string;
    status?: number;
    error?: string;
    responseTime?: number;
  };
}

export interface NetworkDiagnostics {
  url: string;
  reachable: boolean;
  responseTime?: number;
  error?: string;
  dnsResolved?: boolean;
  portOpen?: boolean;
}

/**
 * Performs comprehensive health check for Planka connectivity
 */
export async function checkPlankaConnection(config: EnvironmentConfig): Promise<HealthCheckResult> {
  const startTime = Date.now();
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(`${config.plankaBaseUrl}/api/health`, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        'User-Agent': 'Kanban-MCP-Health-Check/1.0'
      }
    });
    
    clearTimeout(timeoutId);
    const responseTime = Date.now() - startTime;

    if (response.ok) {
      return {
        success: true,
        message: `Successfully connected to Planka at ${config.plankaBaseUrl}`,
        details: {
          url: config.plankaBaseUrl,
          status: response.status,
          responseTime
        }
      };
    } else {
      return {
        success: false,
        message: `Planka returned HTTP ${response.status} at ${config.plankaBaseUrl}`,
        details: {
          url: config.plankaBaseUrl,
          status: response.status,
          responseTime
        }
      };
    }
  } catch (error) {
    const responseTime = Date.now() - startTime;
    const errorMessage = error instanceof Error ? error.message : 'Unknown connection error';
    
    return {
      success: false,
      message: `Failed to connect to Planka at ${config.plankaBaseUrl}: ${errorMessage}`,
      details: {
        url: config.plankaBaseUrl,
        error: errorMessage,
        responseTime
      }
    };
  }
}

/**
 * Provides detailed troubleshooting guidance based on diagnostics
 */
export function getTroubleshootingAdvice(diagnostics: NetworkDiagnostics): string[] {
  const advice: string[] = [];
  
  if (!diagnostics.dnsResolved) {
    advice.push('• DNS resolution failed - check hostname spelling and network connectivity');
    if (diagnostics.url.includes('host.docker.internal')) {
      advice.push('• For Docker on Linux, ensure you use --add-host=host.docker.internal:host-gateway');
    }
  }
  
  if (!diagnostics.portOpen) {
    const url = new URL(diagnostics.url);
    const port = url.port || '80';
    advice.push(`• Port ${port} is not accessible - check if Planka is running and listening on this port`);
    advice.push('• Verify firewall settings are not blocking the connection');
  }
  
  return advice;
}
