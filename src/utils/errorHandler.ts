
export const errorHandler = (error: unknown): { status: number; message: string } => {
    if (error instanceof Error) {
        return { status: 500, message: error.message };
    }
    return { status: 500, message: "Unknown error occurred" };
};
