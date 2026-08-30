/**
 * ORM & Database Error Code Normalizer
 * Translates PostgreSQL, Prisma, and MongoDB database errors into friendly user messages.
 */

export interface NormalizedError {
  title: string;
  message: string;
  field?: string;
}

export function normalizeDatabaseError(error: any): NormalizedError {
  if (!error) {
    return {
      title: 'Unknown Error',
      message: 'An unexpected error occurred while processing your request.',
    };
  }

  // Prisma Unique Constraint (P2002)
  if (error.code === 'P2002' || error.message?.includes('P2002') || error.message?.includes('Unique constraint')) {
    const target = error.meta?.target || (Array.isArray(error.meta?.target) ? error.meta.target.join(', ') : 'field');
    return {
      title: 'Duplicate Entry',
      message: `A record with this ${target} already exists in Nexus Scholar database.`,
      field: Array.isArray(target) ? target[0] : target,
    };
  }

  // Prisma Record Not Found (P2025)
  if (error.code === 'P2025' || error.message?.includes('P2025') || error.message?.includes('Record to update not found')) {
    return {
      title: 'Record Not Found',
      message: 'The requested paper, author, or research problem could not be found.',
    };
  }

  // Prisma Foreign Key Constraint (P2003)
  if (error.code === 'P2003' || error.message?.includes('P2003') || error.message?.includes('Foreign key constraint')) {
    return {
      title: 'Reference Missing',
      message: 'The operation references an associated item (author, problem, or citation) that does not exist.',
    };
  }

  // PostgreSQL Connection Errors
  if (error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT' || error.message?.includes('Can\'t reach database server')) {
    return {
      title: 'Database Unavailable',
      message: 'Unable to reach the database server. Operating in offline/cached mode.',
    };
  }

  return {
    title: 'Database Operation Failed',
    message: typeof error.message === 'string' ? error.message : 'An error occurred during database access.',
  };
}
