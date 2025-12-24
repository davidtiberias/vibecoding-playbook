// pages/articles/@articleId/+config.ts

export default {
  prerender: true,
  // This tells Vike to send the result of the `data` hook to the client.
  passToClient: ['data'] 
}