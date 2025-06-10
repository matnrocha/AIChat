export class CustomError extends Error {
    constructor(
      public code: string,
      public message: string,
      public statusCode: number = 400,
      public details?: any  // Adicionando a propriedade details como opcional
    ) {
      super(message);
      this.name = new.target.name;

      this.stack = new Error(message).stack || '';
    }
  }
  