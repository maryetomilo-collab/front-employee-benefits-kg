import { defineConfig } from 'orval';

export default defineConfig({
  benefits: {
    output: {
      mode: 'tags-split',
      target: 'src/api/endpoints',
      schemas: 'src/api/schemas',
      client: 'react-query',
      clean: true,
      formatter: 'prettier',
      mock: {
        indexMockFiles: true,
        generators: [
          {
            type: 'msw',
            useExamples: true,
          },
        ],
      },
    },
    input: {
      target: './openapi/api.yaml',
    },
  },
});
