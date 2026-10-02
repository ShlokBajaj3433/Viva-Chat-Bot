package com.example.admin.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.util.concurrent.Executor;

/**
 * Async Configuration for Non-Blocking Operations
 * Improves response time by offloading heavy tasks to background threads
 */
@Configuration
@EnableAsync
public class AsyncConfig {

    /**
     * Configure thread pool for async operations
     * 
     * Optimization Strategy:
     * - Core pool: 4 threads (for light tasks)
     * - Max pool: 16 threads (scales up under load)
     * - Queue: 100 tasks (buffer for spikes)
     * - Keep alive: 60s (release idle threads)
     */
    @Bean(name = "taskExecutor")
    public Executor taskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        
        // Core threads always available
        executor.setCorePoolSize(4);
        
        // Maximum threads under high load
        executor.setMaxPoolSize(16);
        
        // Queue capacity for task buffering
        executor.setQueueCapacity(100);
        
        // Thread naming for debugging
        executor.setThreadNamePrefix("Viva-Async-");
        
        // Wait for tasks to complete on shutdown
        executor.setWaitForTasksToCompleteOnShutdown(true);
        executor.setAwaitTerminationSeconds(60);
        
        executor.initialize();
        return executor;
    }
}
