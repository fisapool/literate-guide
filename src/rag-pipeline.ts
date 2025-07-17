#!/usr/bin/env node
/**
 * RAG (Retrieval-Augmented Generation) Pipeline Script
 * Docker-aware implementation with automatic environment detection and health checks
 */

import { getEnvironmentConfig, getEnvironmentInfo } from './config/environment.js';
import { checkPlankaConnection } from './utils/health-check-fixed.js';

export interface RAGPipelineConfig {
  enableHealthChecks: boolean;
  maxRetries: number;
  retryDelay: number;
}

export interface RAGContext {
  environment: ReturnType<typeof getEnvironmentInfo>;
  plankaConnection: any;
  timestamp: string;
}

/**
 * Main RAG Pipeline class with Docker-aware configuration
 */
export class RAGPipeline {
  private config: RAGPipelineConfig;
  private environment: ReturnType<typeof getEnvironmentConfig>;

  constructor(pipelineConfig: Partial<RAGPipelineConfig> = {}) {
    this.config = {
      enableHealthChecks: true,
      maxRetries: 3,
      retryDelay: 2000,
      ...pipelineConfig
    };
    
    this.environment = getEnvironmentConfig();
  }

  /**
   * Initialize the RAG pipeline with health checks
   */
  async initialize(): Promise<void> {
    console.log('🔍 Initializing RAG Pipeline...');
    console.log('📊 Environment:', getEnvironmentInfo());
    
    if (this.config.enableHealthChecks) {
      await this.performHealthChecks();
    }
    
    console.log('✅ RAG Pipeline initialized successfully');
  }

  /**
   * Perform comprehensive health checks before operations
   */
  async performHealthChecks(): Promise<void> {
    console.log('🏥 Performing health checks...');
    
    const healthResult = await checkPlankaConnection(this.environment);
    
    if (healthResult.success) {
      console.log('✅ Health check passed:', healthResult.message);
    } else {
      console.error('❌ Health check failed:', healthResult.message);
      console.error('🔧 Troubleshooting:', healthResult.details);
      
      // Provide Docker-specific troubleshooting
      if (this.environment.isDocker) {
        console.error('🐳 Docker-specific troubleshooting:');
        console.error('• Ensure PLANKA_BASE_URL uses http://host.docker.internal:3333');
        console.error('• Check if Planka container is running on port 3333');
        console.error('• Verify Docker network configuration');
      }
      
      throw new Error(`Health check failed: ${healthResult.message}`);
    }
  }

  /**
   * Execute RAG pipeline with retry logic
   */
  async executeRAGPipeline(): Promise<RAGContext> {
    const context: RAGContext = {
      environment: getEnvironmentInfo(),
      plankaConnection: null,
      timestamp: new Date().toISOString()
    };

    for (let attempt = 1; attempt <= this.config.maxRetries; attempt++) {
      try {
        await this.performHealthChecks();
        
        // Simulate RAG operations
        context.plankaConnection = {
          status: 'connected',
          url: this.environment.plankaBaseUrl,
          authenticated: true
        };
        
        return context;
      } catch (error) {
        if (attempt === this.config.maxRetries) {
          throw error;
        }
        
        console.warn(`⚠️ Attempt ${attempt} failed, retrying in ${this.config.retryDelay}ms...`);
        await new Promise(resolve => setTimeout(resolve, this.config.retryDelay));
      }
    }
    
    throw new Error('RAG pipeline execution failed after all retries');
  }

  /**
   * Get diagnostic information for troubleshooting
   */
  getDiagnosticInfo(): Record<string, any> {
    return {
      environment: getEnvironmentInfo(),
      config: this.config,
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * CLI entry point for the RAG pipeline script
 */
async function main() {
  console.log('🚀 Starting RAG Pipeline Script...');
  
  try {
    const pipeline = new RAGPipeline({
      enableHealthChecks: true,
      maxRetries: 3,
      retryDelay: 2000
    });
    
    await pipeline.initialize();
    const result = await pipeline.executeRAGPipeline();
    
    console.log('✅ RAG Pipeline completed successfully');
    console.log('📊 Result:', JSON.stringify(result, null, 2));
    
  } catch (error) {
    console.error('❌ RAG Pipeline failed:', error);
    process.exit(1);
  }
}

// CLI execution
if (require.main === module) {
  main().catch(console.error);
}

export { RAGPipeline };
