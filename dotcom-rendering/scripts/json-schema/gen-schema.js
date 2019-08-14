const TJS = require('typescript-json-schema');
const { resolve } = require('path');
const root = resolve(__dirname, '..', '..');
const fs = require('fs');

const program = TJS.getProgramFromFiles([
    resolve(root + '/packages/frontend/lib/content.d.ts'),
    resolve(root + '/packages/frontend/index.d.ts'),
]);

const settings = { rejectDateType: true, required: true };
const schema = TJS.generateSchema(program, 'CAPIType', settings);

fs.writeFile(
    root + '/packages/frontend/model/json-schema.json',
    JSON.stringify(schema, null, 4),
    'utf8',
    function(err) {
        if (err) {
            // eslint-disable-next-line @typescript-eslint/tslint/config
            console.log(err);
        }
    },
);