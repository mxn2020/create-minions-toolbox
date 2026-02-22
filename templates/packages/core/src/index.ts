/**
 * {{projectCapitalized}} SDK
 *
 * {{projectDescription}}
 *
 * @module {{sdkName}}
 */

export const VERSION = '0.1.0';

/**
 * Example: Create a client instance for {{projectCapitalized}}.
 * Replace this with your actual SDK entry point.
 */
export function createClient(options = {}) {
    return {
        version: VERSION,
        ...options,
    };
}
