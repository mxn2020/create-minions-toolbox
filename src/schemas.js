/**
 * Generates MinionType schema definitions from a JSON/TOML object.
 */

export function generateSchemas(config) {
    if (!config || !config.tables || Object.keys(config.tables).length === 0) {
        return {
            typescriptSchemas: 'export const customTypes: MinionType[] = [];\n',
            pythonSchemas: 'custom_types: list[MinionType] = []\n',
        };
    }

    let tsCode = '';
    let pyCode = '';

    const tsNames = [];
    const pyNames = [];

    for (const [key, tableDef] of Object.entries(config.tables)) {
        const slug = key;
        const name = slug.charAt(0).toUpperCase() + slug.slice(1).replace(/[-_]/g, ' ');
        const description = tableDef.description || `Schema for ${name}`;
        const icon = tableDef.icon || '📦';
        const fields = tableDef.fields || {};

        const tsVarName = `${slug.replace(/[-_]/g, '')}Type`;
        const pyVarName = `${slug.replace(/-/g, '_')}_type`;

        tsNames.push(tsVarName);
        pyNames.push(pyVarName);

        // TypeScript Schema
        tsCode += `export const ${tsVarName}: MinionType = {\n`;
        tsCode += `  id: '${config.projectSlug}-${slug}',\n`;
        tsCode += `  name: '${name}',\n`;
        tsCode += `  slug: '${slug}',\n`;
        tsCode += `  description: '${description}',\n`;
        tsCode += `  icon: '${icon}',\n`;
        tsCode += `  schema: [\n`;

        // Python Schema
        pyCode += `${pyVarName} = MinionType(\n`;
        pyCode += `    id="${config.projectSlug}-${slug}",\n`;
        pyCode += `    name="${name}",\n`;
        pyCode += `    slug="${slug}",\n`;
        pyCode += `    description="${description}",\n`;
        pyCode += `    icon="${icon}",\n`;
        pyCode += `    schema=[\n`;

        for (const [fieldName, fieldType] of Object.entries(fields)) {
            // Mapping basic types to MinionType fields
            // TOML fields: title = "string", status = "select"
            let finalType = fieldType === 'boolean' ? 'boolean' :
                fieldType === 'number' ? 'number' :
                    fieldType === 'select' ? 'select' : 'string';

            tsCode += `    { name: '${fieldName}', type: '${finalType}', label: '${fieldName}' },\n`;
            pyCode += `        FieldDefinition(name="${fieldName}", type="${finalType}", label="${fieldName}"),\n`;
        }

        tsCode += `  ],\n};\n\n`;
        pyCode += `    ],\n)\n\n`;
    }

    // TypeScript export list
    tsCode += `export const customTypes: MinionType[] = [\n`;
    for (const tsName of tsNames) {
        tsCode += `  ${tsName},\n`;
    }
    tsCode += `];\n`;

    // Python export list
    pyCode += `custom_types: list[MinionType] = [\n`;
    for (const pyName of pyNames) {
        pyCode += `    ${pyName},\n`;
    }
    pyCode += `]\n`;

    return {
        typescriptSchemas: tsCode,
        pythonSchemas: pyCode,
    };
}
