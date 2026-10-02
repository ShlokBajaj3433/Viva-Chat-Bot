package com.example.admin.config;

import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.caffeine.CaffeineCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.TimeUnit;

/**
 * Cache Configuration for Performance Optimization
 * Uses Caffeine cache for high-performance in-memory caching
 */
@Configuration
@EnableCaching
public class CacheConfig {

    /**
     * Configure Caffeine cache manager with optimized settings
     * 
     * Cache Strategy:
     * - Maximum 1000 entries per cache
     * - Expire after 10 minutes of write
     * - Weak keys to allow garbage collection
     * - Record statistics for monitoring
     */
    @Bean
    public CacheManager cacheManager() {
        CaffeineCacheManager cacheManager = new CaffeineCacheManager(
            "assignments", 
            "classrooms", 
            "users", 
            "announcements",
            "teacherAssignments",
            "classroomStudents"
        );
        
        cacheManager.setCaffeine(Caffeine.newBuilder()
            .maximumSize(1000)
            .expireAfterWrite(10, TimeUnit.MINUTES)
            .weakKeys()
            .recordStats()
        );
        
        return cacheManager;
    }
}
