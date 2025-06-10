// src/types/api-response.ts

// Interface base que será herdada por todas as respostas
export interface ApiResponseBase {
    success: boolean;
    timestamp: string;
    path: string;
  }
  
  // Interface para respostas de sucesso
  export interface ApiSuccessResponse<T = any> extends ApiResponseBase {
    success: true;
    data: T;
    error?: never;  // Nunca deve ter a propriedade error
  }
  
  // Interface para respostas de erro
  export interface ApiErrorResponse extends ApiResponseBase {
    success: false;
    data?: never;  // Nunca deve ter a propriedade data
    error: {
      code: string;
      message: string;
      details?: any;
    };
  }
  
  // Tipo união que representa qualquer resposta da API
  export type ApiResponse<T = any> = ApiSuccessResponse<T> | ApiErrorResponse;