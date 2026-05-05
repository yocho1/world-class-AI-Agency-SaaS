const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface OpenRouterErrorResponse {
  error?: {
    code?: string;
    message?: string;
  };
}

/**
 * Stream a chat completion from OpenRouter with automatic fallback
 * @param messages - Chat message history
 * @param model - Model to use (primary or fallback)
 * @param fallbackModel - Model to use if primary fails
 * @returns ReadableStream of SSE events containing tokens
 */
export async function streamChatCompletion(
  messages: ChatMessage[],
  model: string,
  fallbackModel?: string
): Promise<ReadableStream<Uint8Array>> {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not configured");
  }

  try {
    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        "X-Title": process.env.NEXT_PUBLIC_APP_NAME || "AL Solutions AI",
      },
      body: JSON.stringify({
        model,
        messages,
        stream: true,
        temperature: 0.4,
        max_tokens: 256,
      }),
    });

    if (!response.ok) {
      const errorData = (await response.json()) as OpenRouterErrorResponse;
      const errorMsg = errorData?.error?.message || `HTTP ${response.status}`;

      // Fallback to secondary model if available
      if (fallbackModel && model !== fallbackModel) {
        console.warn(`Primary model ${model} failed: ${errorMsg}. Falling back to ${fallbackModel}`);
        return streamChatCompletion(messages, fallbackModel);
      }

      throw new Error(`OpenRouter error: ${errorMsg}`);
    }

    return response.body as ReadableStream<Uint8Array>;
  } catch (error) {
    // Fallback attempt on network or parsing errors
    if (fallbackModel && model !== fallbackModel) {
      console.warn(`Primary model ${model} error:`, error, `Falling back to ${fallbackModel}`);
      return streamChatCompletion(messages, fallbackModel);
    }
    throw error;
  }
}

/**
 * Non-streaming completion for quick operations
 */
export async function completeWithOpenRouter(
  messages: ChatMessage[],
  model: string,
  fallbackModel?: string
): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not configured");
  }

  try {
    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        "X-Title": process.env.NEXT_PUBLIC_APP_NAME || "AL Solutions AI",
      },
      body: JSON.stringify({
        model,
        messages,
        stream: false,
        temperature: 0.4,
        max_tokens: 256,
      }),
    });

    if (!response.ok) {
      const errorData = (await response.json()) as OpenRouterErrorResponse;
      const errorMsg = errorData?.error?.message || `HTTP ${response.status}`;

      if (fallbackModel && model !== fallbackModel) {
        console.warn(`Primary model ${model} failed: ${errorMsg}. Falling back to ${fallbackModel}`);
        return completeWithOpenRouter(messages, fallbackModel);
      }

      throw new Error(`OpenRouter error: ${errorMsg}`);
    }

    const data = await response.json() as { choices?: Array<{ message?: { content?: string } }> };
    return data.choices?.[0]?.message?.content ?? "";
  } catch (error) {
    if (fallbackModel && model !== fallbackModel) {
      console.warn(`Primary model ${model} error:`, error, `Falling back to ${fallbackModel}`);
      return completeWithOpenRouter(messages, fallbackModel);
    }
    throw error;
  }
}