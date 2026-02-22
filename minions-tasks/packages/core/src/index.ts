/**
 * Minions Tasks SDK
 *
 * Task management for AI agents
 *
 * @module @minions-tasks/sdk
 */

export const VERSION = '0.1.0';

/**
 * Example: Create a client instance for Minions Tasks.
 * Replace this with your actual SDK entry point.
 */
export function createClient(options = {}) {
    return {
        version: VERSION,
        ...options,
    };
}

export * from './schemas/index.js';
