/**
 * Health check utilities for verifying Planka connectivity
 * Provides detailed diagnostics for troubleshooting Docker networking issues
 */

import { EnvironmentConfig } from '../config/environment';

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
    const response = await fetch(`${config.plankaBaseUrl}/api/health`, {
      method: 'GET',
      timeout: 5000,
      headers: {
        'User-Agent': 'Kanban-MCP-Health-Check/1.0'
      }
    });

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
 * Performs network diagnostics to identify connection issues
 */
export async function performNetworkDiagnostics(config: EnvironmentConfig): Promise<NetworkDiagnostics> {
  const url = new URL(config.plankaBaseUrl);
  const hostname = url.hostname;
  const port = url.port || (url.protocol === 'https:' ? '443' : '80');
  
  const diagnostics: NetworkDiagnostics = {
    url: config.plankaBaseUrl,
    reachable: false,
    dnsResolved: false,
    portOpen: false
  };

  try {
    // Test DNS resolution
    const dns = require('dns').promises;
    await dns.lookup(hostname);
    diagnostics.dnsResolved = true;
  } catch (error) {
    diagnostics.error = `DNS resolution failed for ${hostname}`;
    return diagnostics;
  }

  try {
    // Test port connectivity
    const net = require('net');
    const socket = new net.Socket();
    
    await new Promise<void>((resolve, reject) => {
      socket.setTimeout(3000);
      socket.on('connect', () => {
        diagnostics.portOpen = true;
        socket.destroy();
        resolve();
      });
      socket.on('error', (err) => {
        reject(err);
      });
      socket.on('timeout', () => {
        reject(new Error('Connection timeout'));
      });
      socket.connect(parseInt(port), hostname);
    });
  } catch (error) {
    diagnostics.error = `Port ${port} is not accessible on ${hostname}`;
    return diagnostics;
  }

  // Final connectivity test
  try {
    const response = await fetch(config.plankaBaseUrl, { method: 'HEAD', timeout: 5000 });
    diagnostics.reachable = response.ok;
    diagnostics.responseTime = Date.now();
  } catch (error) {
    diagnostics.error = `Final connectivity test failed: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }

  return diagnostics;
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
    advice.push('• Check if another service is using the same port');
  }
  
  if (diagnostics.dnsResolved && diagnostics.portOpen && !diagnostics.reachable) {
    advice.push('• Service is reachable but not responding correctly - check Planka logs');
    advice.push('• Verify Planka is fully started and not in an error state');
  }
  
  return advice;
}
