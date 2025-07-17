#!/usr/bin/env node
/**
 * Environment Diagnostic Script
 * Automated environment checking for Docker and local development setups
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class EnvironmentDiagnostics {
  constructor() {
    this.results = {
      timestamp: new Date().toISOString(),
      docker: {},
      ports: {},
      environment: {},
      network: {}
    };
  }

  /**
   * Check if Docker is running and accessible
   */
  checkDockerStatus() {
    try {
      const dockerInfo = execSync('docker info --format json', { encoding: 'utf8', stdio: 'pipe' });
      this.results.docker = {
        running: true,
        info: JSON.parse(dockerInfo)
      };
    } catch (error) {
      this.results.docker = {
        running: false,
        error: error.message
      };
    }
  }

  /**
   * Check port availability
   */
  checkPorts() {
    const ports = [3333, 3008, 5174, 5432];
    
    ports.forEach(port => {
      try {
        const result = execSync(`netstat -ano | findstr :${port}`, { encoding: 'utf8', stdio: 'pipe' });
        this.results.ports[port] = {
          inUse: result.trim().length > 0,
          details: result.trim()
        };
      } catch (error) {
        this.results.ports[port] = {
          inUse: false,
          details: ''
        };
      }
    });
  }

  /**
   * Check environment variables
   */
  checkEnvironmentVariables() {
    const requiredVars = [
      'PLANKA_BASE_URL',
      'PLANKA_AGENT_EMAIL',
      'PLANKA_AGENT_PASSWORD',
      'PLANKA_PORT',
      'BASE_URL'
    ];

    this.results.environment = {
      variables: {},
      missing: []
    };

    requiredVars.forEach(varName => {
      const value = process.env[varName];
      this.results.environment.variables[varName] = {
        set: !!value,
        value: value ? '[REDACTED]' : undefined
      };
      
      if (!value) {
        this.results.environment.missing.push(varName);
      }
    });
  }

  /**
   * Check Docker containers
   */
  checkDockerContainers() {
    try {
      const containers = execSync('docker ps --format "table {{.Names}}\\t{{.Status}}\\t{{.Ports}}"', { 
        encoding: 'utf8', 
        stdio: 'pipe' 
      });
      
      this.results.docker.containers = containers
        .split('\n')
        .filter(line => line.trim())
        .slice(1)
        .map(line => {
          const [name, status, ports] = line.split('\t');
          return { name, status, ports };
        });
    } catch (error) {
      this.results.docker.containers = [];
    }
  }

  /**
   * Check network connectivity
   */
  checkNetworkConnectivity() {
    const urls = [
      'http://localhost:3333',
      'http://host.docker.internal:3333',
      'http://localhost:3008',
      'http://localhost:5174'
    ];

    this.results.network = {
      connectivity: {}
    };

    urls.forEach(url => {
      try {
        const response = execSync(`curl -s -o /dev/null -w "%{http_code}" "${url}"`, { 
          encoding: 'utf8', 
          stdio: 'pipe',
          timeout: 5000
        });
        
        this.results.network.connectivity[url] = {
          reachable: response === '200',
          statusCode: response
        };
      } catch (error) {
        this.results.network.connectivity[url] = {
          reachable: false,
          statusCode: 'ERROR'
        };
      }
    });
  }

  /**
   * Generate troubleshooting report
   */
  generateReport() {
    console.log('🔍 Environment Diagnostic Report');
    console.log('================================');
    console.log(`Generated: ${this.results.timestamp}`);
    console.log('');

    // Docker Status
    console.log('🐳 Docker Status:');
    if (this.results.docker.running) {
      console.log('✅ Docker is running');
      console.log(`   Server Version: ${this.results.docker.info?.ServerVersion}`);
      console.log(`   OS: ${this.results.docker.info?.OperatingSystem}`);
    } else {
      console.log('❌ Docker is not running or not accessible');
      console.log(`   Error: ${this.results.docker.error}`);
    }
    console.log('');

    // Containers
    if (this.results.docker.containers?.length > 0) {
      console.log('📦 Running Containers:');
      this.results.docker.containers.forEach(container => {
        console.log(`   ${container.name}: ${container.status} (${container.ports})`);
      });
    } else {
      console.log('📦 No containers running');
    }
    console.log('');

    // Ports
    console.log('🔌 Port Status:');
    Object.entries(this.results.ports).forEach(([port, status]) => {
      const icon = status.inUse ? '🔴' : '🟢';
      console.log(`   ${icon} Port ${port}: ${status.inUse ? 'In use' : 'Available'}`);
    });
    console.log('');

    // Environment Variables
    console.log('🔧 Environment Variables:');
    Object.entries(this.results.environment.variables).forEach(([varName, status]) => {
      const icon = status.set ? '✅' : '❌';
      console.log(`   ${icon} ${varName}: ${status.set ? 'Set' : 'Missing'}`);
    });
    
    if (this.results.environment.missing.length > 0) {
      console.log('');
      console.log('⚠️ Missing required environment variables:');
      this.results.environment.missing.forEach(varName => {
        console.log(`   - ${varName}`);
      });
    }
    console.log('');

    // Network Connectivity
    console.log('🌐 Network Connectivity:');
    Object.entries(this.results.network.connectivity).forEach(([url, status]) => {
      const icon = status.reachable ? '✅' : '❌';
      console.log(`   ${icon} ${url}: ${status.reachable ? 'Reachable' : 'Not reachable'}`);
    });
    console.log('');

    // Recommendations
    this.generateRecommendations();
  }

  /**
   * Generate specific recommendations based on findings
   */
  generateRecommendations() {
    console.log('💡 Recommendations:');
    
    if (!this.results.docker.running) {
      console.log('   • Start Docker Desktop or Docker service');
    }
    
    if (this.results.environment.missing.length > 0) {
      console.log('   • Set missing environment variables in your .env file or startup script');
    }
    
    const usedPorts = Object.entries(this.results.ports)
      .filter(([, status]) => status.inUse)
      .map(([port]) => port);
    
    if (usedPorts.includes('3333')) {
      console.log('   • Port 3333 is in use - ensure Planka is running or change port configuration');
    }
    
    const localhostReachable = this.results.network.connectivity['http://localhost:3333']?.reachable;
    const dockerInternalReachable = this.results.network.connectivity['http://host.docker.internal:3333']?.reachable;
    
    if (!localhostReachable && !dockerInternalReachable) {
      console.log('   • Neither localhost nor host.docker.internal are reachable');
      console.log('   • Check if Planka is running and accessible');
    } else if (!dockerInternalReachable && this.results.docker.running) {
      console.log('   • host.docker.internal is not reachable - this is needed for Docker containers');
      console.log('   • On Linux, use: docker run --add-host=host.docker.internal:host-gateway ...');
    }
  }

  /**
   * Run all diagnostics
   */
  async run() {
    console.log('🔍 Running environment diagnostics...\n');
    
    this.checkDockerStatus();
    this.checkDockerContainers();
    this.checkPorts();
    this.checkEnvironmentVariables();
    this.checkNetworkConnectivity();
    
    this.generateReport();
    
    // Save results to file
    const reportPath = path.join(process.cwd(), 'diagnostic-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));
    console.log(`📄 Full report saved to: ${reportPath}`);
  }
}

// CLI execution
if (require.main === module) {
  const diagnostics = new EnvironmentDiagnostics();
  diagnostics.run().catch(console.error);
}

module.exports = EnvironmentDiagnostics;
