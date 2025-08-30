import { createPerplexity } from "@ai-sdk/perplexity";

export const perplexityProvider = createPerplexity({
    apiKey: process.env.PERPLEXITY_API_KEY ?? '',
});
