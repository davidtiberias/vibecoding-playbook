
# Vibecoding Workflow Hub v2.1

An interactive documentation platform for the Vibecoding Workflow.

## Local Development

1. **Clone the repository**
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Set your API Key**:
   Create a `.env` file in the root and add:
   ```env
   VITE_GEMINI_API_KEY=your_api_key_here
   ```
4. **Run the development server**:
   ```bash
   npm run dev
   ```

## Deployment to GitHub Pages

1. Update the `base` property in `vite.config.ts` to match your repository name:
   `base: '/your-repo-name/'`
2. Run the deploy script:
   ```bash
   npm run deploy
   ```

## Folder Structure
- `/components`: UI building blocks.
- `App.tsx`: Main application container.
- `constants.tsx`: Workflow data and invariants.
- `types.ts`: TypeScript interface definitions.
- `index.html`: Entry HTML file.
- `index.tsx`: React mounting point.
